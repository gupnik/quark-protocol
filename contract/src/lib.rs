/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, Vector};
use near_sdk::{env, log, near_bindgen, AccountId};

// Define the default message
const DEFAULT_MESSAGE: &str = "Hello";

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Answer {
    pub account_id: AccountId,
    pub text: String,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Question {
    pub id: u64,
    pub text: String,
    pub bounty: u8,
    pub is_active: bool,
    pub answers: Vector<Answer>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    count: u64,
    questions: LookupMap<u64, Question>,
    questions_asked: LookupMap<AccountId, Vector<u64>>,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            count: 0,
            questions: LookupMap::new(b"q".to_vec()),
            questions_asked: LookupMap::new(b"a".to_vec()),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn ask(&mut self, text: String) -> u64 {
        let account_id = env::signer_account_id();
        let question = Question {
            id: self.count,
            text,
            bounty: 0,
            is_active: true,
            answers: Vector::new(b"c"),
        };
        self.questions.insert(&self.count, &question);

        let mut account_questions = match self.questions_asked.get(&account_id) {
            Some(questions) => questions,
            None => Vector::new(b"d"),
        };
        account_questions.push(&self.count);
        self.questions_asked.insert(&account_id, &account_questions);
        self.count += 1;
        return self.count - 1;
    }

    pub fn get_question(&self, question_id: u64) -> Option<String> {
        return match self.questions.get(&question_id) {
            Some(question) => Some(question.text),
            None => None,
        };
    }

    pub fn answer(&mut self, question_id: u64, text: String) {
        let account_id = env::signer_account_id();
        let mut question = match self.questions.get(&question_id) {
            Some(question) => question,
            None => panic!("No Question Found"),
        };
        question.answers.push(&Answer { account_id, text });
        self.questions.insert(&question_id, &question);
    }

    pub fn get_answers(&self, question_id: u64) -> Option<Vec<String>> {
        return match self.questions.get(&question_id) {
            Some(question) => Some(
                question
                    .answers
                    .to_vec()
                    .iter()
                    .map(|a| a.text.clone())
                    .collect(),
            ),
            None => None,
        };
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use super::*;
}
