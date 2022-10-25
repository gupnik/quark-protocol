import { near, BigInt, log, json } from "@graphprotocol/graph-ts";
import { Question, Answer, User } from "./generated/schema";

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
  if (functionCall.methodName == "ask") {
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