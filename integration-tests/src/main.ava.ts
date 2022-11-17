import { Worker, NearAccount, NEAR } from 'near-workspaces';
import anyTest, { TestFn } from 'ava';

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  const alice = await root.createSubAccount("alice", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });
  const bob = await root.createSubAccount("bob", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });
  const charlie = await root.createSubAccount("charlie", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract, alice, bob, charlie };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('creates a course', async (t) => {
  const { contract, alice, bob, charlie } = t.context.accounts;
  await alice.call(contract, 'create_course', { title: 'Course I', image: 'Image I', price: 0 });
  let courseCount: Number = await contract.view('get_course_count');
  t.is(courseCount, 1);

  await alice.call(contract, 'add_section', { course_id: 1, section_title: 'A - Section I' });

  await alice.call(contract, 'add_chapter', { course_id: 1, section_id: 1, chapter_title: 'A - Chapter I' });

  await bob.call(contract, 'create_course', { title: 'Course 2', image: 'Image II', price: 0 });
  courseCount = await contract.view('get_course_count');
  t.is(courseCount, 2);

  await bob.call(contract, 'add_section', { course_id: 2, section_title: 'B - Section I' });

  await bob.call(contract, 'add_chapter', { course_id: 2, section_id: 1, chapter_title: 'B - Chapter I' });

  await bob.call(contract, 'subscribe_course', { course_id: 1 });
})

test('asks a question', async (t) => {
  const { contract, alice, bob, charlie } = t.context.accounts;
  await alice.call(contract, 'ask', { forum_id: 1, text: 'Hey, can you help?' });
  const question: string = await contract.view('get_question', { forum_id: 1, question_id: 1 });
  t.is(question, 'Hey, can you help?');

  await bob.call(contract, 'ask', { forum_id: 1, text: 'Hey, another question?' });
  const second_question: string = await contract.view('get_question', { forum_id: 1, question_id: 2 });
  t.is(second_question, 'Hey, another question?');

  await charlie.call(contract, 'answer', { text: "Sure, will do!", forum_id: 1, question_id: 1 });

  const answers: string[] = await contract.view('get_answers', { forum_id: 1, question_id: 1 });
  t.deepEqual(answers, [ "Sure, will do!" ]);
}); 