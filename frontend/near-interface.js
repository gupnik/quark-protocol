/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class HelloNEAR {
    constructor({ contractId, walletToUse }) {
        this.contractId = contractId;
        this.wallet = walletToUse;
    }

    async getQuestionCount() {
        return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_question_count' });
    }

    async getQuestion(questionId) {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: 'get_question',
            args: { question_id: questionId },
        });
    }

    async ask(question) {
        return await this.wallet.callMethod({ contractId: this.contractId, method: 'ask', args: { text: question } });
    }

    async answer(questionId, answer) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: 'answer',
            args: { question_id: questionId, text: answer },
        });
    }

    async getAnswers(questionId) {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: 'get_answers',
            args: { question_id: questionId },
        });
    }
}
