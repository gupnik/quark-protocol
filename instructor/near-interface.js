/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class HelloNEAR {
    constructor({ contractId, walletToUse }) {
        this.contractId = contractId;
        this.wallet = walletToUse;
    }

    async getCourseCount() {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: 'get_course_count',
        });
    }

    async createCourse(title) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: 'create_course',
            args: { title: 'Hello', price: 0 },
        });
    }

    async getQuestionCount() {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: 'get_question_count',
            args: { forum_id: 1 },
        });
    }

    async getQuestion(questionId) {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: 'get_question',
            args: { forum_id: 1, question_id: questionId },
        });
    }

    async ask(question) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: 'ask',
            args: { forum_id: 1, text: question },
        });
    }

    async answer(questionId, answer) {
        return await this.wallet.callMethod({
            contractId: this.contractId,
            method: 'answer',
            args: { forum_id: 1, question_id: questionId, text: answer },
        });
    }

    async getAnswers(questionId) {
        return await this.wallet.viewMethod({
            contractId: this.contractId,
            method: 'get_answers',
            args: { forum_id: 1, question_id: questionId },
        });
    }
}
