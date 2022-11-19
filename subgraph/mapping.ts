import { near, BigInt, log, json } from "@graphprotocol/graph-ts";
import { Question, Answer, User, Course, Section, Chapter } from "./generated/schema";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  for (let i = 0; i < actions.length; i++) {
    handleAction(actions[i], receipt.receipt, receipt.outcome.status, receipt.block.header);
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  status: near.SuccessStatus,
  blockHeader: near.BlockHeader
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }

  const functionCall = action.toFunctionCall();
  const functionArgs = json.fromString(functionCall.args.toString()).toObject();
  if (functionCall.methodName == "create_course") {
    let user = User.load(receipt.signerId);
    if (user == null) {
        user = new User(receipt.signerId);
        user.save();
    }

    log.info("Create: {}", [functionArgs.get("course_id")!.toBigInt().toString()]);
    const course = new Course(functionArgs.get("course_id")!.toBigInt().toString());
    course.creator = user.id;
    course.title = functionArgs.get("title")!.toString();
    course.image = functionArgs.get("image")!.toString();
    course.price = BigInt.fromU64(functionArgs.get("price")!.toU64());
    course.subscribers = [];
    course.subscriber_count = BigInt.zero();
    course.save();
  } else if (functionCall.methodName == "add_section") {
    let user = User.load(receipt.signerId);
    if (user == null) {
        user = new User(receipt.signerId);
        user.save();
    }

    log.info("Add Section: {}", [functionArgs.get("course_id")!.toBigInt().toString()]);
    const course = Course.load(functionArgs.get("course_id")!.toBigInt().toString());
    const section = new Section(course!.id + functionArgs.get("section_id")!.toBigInt().toString());
    section.course = course!.id;
    section.section_title = functionArgs.get("section_title")!.toString();
    section.save();
  } else if (functionCall.methodName == "add_chapter") {
    let user = User.load(receipt.signerId);
    if (user == null) {
        user = new User(receipt.signerId);
        user.save();
    }

    log.info("Add Chapter: {}", [functionArgs.get("course_id")!.toBigInt().toString(), functionArgs.get("section_id")!.toBigInt().toString()]);
    const course = Course.load(functionArgs.get("course_id")!.toBigInt().toString());
    const section = Section.load(course!.id + functionArgs.get("section_id")!.toBigInt().toString());
    const chapter = new Chapter(course!.id + section!.id + functionArgs.get("chapter_id")!.toBigInt().toString());
    chapter.section = section!.id;
    chapter.chapter_title = functionArgs.get("chapter_title")!.toString();
    chapter.chapter_text_content = functionArgs.get("chapter_text_content")!.toString();
    chapter.save();
  } else if (functionCall.methodName == "subscribe_course") {
    let user = User.load(receipt.signerId);
    if (user == null) {
        user = new User(receipt.signerId);
        user.save();
    }

    log.info("Subscribe course: {}", [functionArgs.get("course_id")!.toBigInt().toString()]);
    const course = Course.load(functionArgs.get("course_id")!.toBigInt().toString());
    if (!course!.subscribers!.includes(user.id)) {
      course!.subscribers = course!.subscribers!.concat([user.id]);
      course!.subscriber_count = course!.subscriber_count.plus(BigInt.fromU64(1));
    }
    course!.save();
  } else if (functionCall.methodName == "ask") {
    let user = User.load(receipt.signerId);
    if (user == null) {
        user = new User(receipt.signerId);
        user.save();
    }

    const question = new Question(status.toValue().toString());
    question.questioner = user.id;
    question.text = functionArgs.get("text")!.toString();
    question.timestamp = BigInt.fromU64(blockHeader.timestampNanosec);
    question.save();
  } else if (functionCall.methodName == "answer") {
    let user = User.load(receipt.signerId);
    if (user == null) {
        user = new User(receipt.signerId);
        user.save();
    }

    const question = Question.load(functionArgs.get("question_id")!.toBigInt().toString());
    const answer = new Answer(receipt.id.toBase58());
    answer.answerer = user.id;
    answer.question = question!.id;
    answer.text = functionArgs.get("text")!.toString();
    answer.timestamp = BigInt.fromU64(blockHeader.timestampNanosec);
    answer.save();
  } 
  else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }
}