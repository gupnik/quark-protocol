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

test('asks a question', async (t) => {
  const { contract, alice, bob, charlie } = t.context.accounts;
  await alice.call(contract, 'ask', { text: 'Hey, can you help?' });
  const question: string = await contract.view('get_question', { question_id: 0 });
  t.is(question, 'Hey, can you help?');

  await bob.call(contract, 'ask', { text: 'Hey, another question?' });
  const second_question: string = await contract.view('get_question', { question_id: 1 });
  t.is(second_question, 'Hey, another question?');

  await charlie.call(contract, 'answer', { text: "Sure, will do!", question_id: 0 });

  const answers: string[] = await contract.view('get_answers', { question_id: 0 });
  t.deepEqual(answers, [ "Sure, will do!" ]);
}); 