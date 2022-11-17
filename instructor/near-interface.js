/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

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

    async createCourse(course) {
        const courseCount = await this.getCourseCount();

        // console.log([
        //     {
        //         type: 'FunctionCall',
        //         params: {
        //             methodName: 'create_course',
        //             args: { course_id: courseCount+1, title: course.title, image: course.image, price: 0 },
        //             gas: THIRTY_TGAS,
        //             deposit: NO_DEPOSIT,
        //         },
        //     },
        //     ...course.sections.map((s, indx) => {
        //         return {
        //             type: 'FunctionCall',
        //             params: {
        //                 methodName: 'add_section',
        //                 args: { course_id: courseCount+1, section_id: indx+1, section_title: s.section_title},
        //                 gas: THIRTY_TGAS,
        //                 deposit: NO_DEPOSIT,
        //             },
        //         }
        //     }),
        //     ...course.sections.map((s, indx) => [
        //         ...s.chapters.map((c, cindx) => {
        //             return {
        //                 type: 'FunctionCall',
        //                 params: {
        //                     methodName: 'add_chapter',
        //                     args: { course_id: courseCount+1, section_id: indx+1, chapter_id: cindx+1, chapter_title: c.chapter_title,  
        //                         chapter_text_content: c.chapter_text_content,
        //                         chapter_video_content: c.chapter_video_content,
        //                     },
        //                     gas: THIRTY_TGAS,
        //                     deposit: NO_DEPOSIT,
        //                 },
        //             }
        //         })
        //     ]),
        // ]);

        // return await this.wallet.wallet.signAndSendTransaction({
        //     signerId: this.accountId,
        //     receiverId: this.contractId,
        //     actions: [
        //         {
        //             type: 'FunctionCall',
        //             params: {
        //                 methodName: 'create_course',
        //                 args: { course_id: courseCount+1, title: course.title, image: course.image, price: 0 },
        //                 gas: THIRTY_TGAS,
        //                 deposit: NO_DEPOSIT,
        //             },
        //         },
        //         ...course.sections.map((s, indx) => {
        //             return {
        //                 type: 'FunctionCall',
        //                 params: {
        //                     methodName: 'add_section',
        //                     args: { course_id: courseCount+1, section_id: indx+1, section_title: s.section_title},
        //                     gas: THIRTY_TGAS,
        //                     deposit: NO_DEPOSIT,
        //                 },
        //             }
        //         }),
        //         ...course.sections.map((s, indx) => [
        //             ...s.chapters.map((c, cindx) => {
        //                 return {
        //                     type: 'FunctionCall',
        //                     params: {
        //                         methodName: 'add_chapter',
        //                         args: { course_id: courseCount+1, section_id: indx+1, chapter_id: cindx+1, chapter_title: c.chapter_title,  
        //                             chapter_text_content: c.chapter_text_content,
        //                             chapter_video_content: c.chapter_video_content,
        //                         },
        //                         gas: THIRTY_TGAS,
        //                         deposit: NO_DEPOSIT,
        //                     },
        //                 }
        //             })
        //         ]),
        //     ],
        // });
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
