use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, Vector};
use near_sdk::{env, log, near_bindgen, AccountId};

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Chapter {
    pub chapter_id: u64,
    pub chapter_title: String,
    pub chapter_text_content: Option<String>,
    pub chapter_video_content: Option<String>,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Section {
    pub section_id: u64,
    pub section_title: String,
    pub chapters: Vector<Chapter>,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Course {
    pub course_id: u64,
    pub creator: AccountId,
    pub title: String,
    pub image: String,
    pub price: u64,
    pub sections: Vector<Section>,
    pub quiz: Option<String>,
    pub subscriber_count: u64,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Forum {
    pub forum_id: u64,
    pub title: String,
    pub course_id: Option<u64>,
    pub question_count: u64,
    pub questions: LookupMap<u64, Question>,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Question {
    pub id: u64,
    pub questioner: AccountId,
    pub text: String,
    pub bounty: u8,
    pub is_active: bool,
    pub answers: Vector<Answer>,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Answer {
    pub answerer: AccountId,
    pub text: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    course_count: u64,
    courses: LookupMap<u64, Course>,
    forum_count: u64,
    forums: LookupMap<u64, Forum>,
}

impl Default for Contract {
    fn default() -> Self {
        let mut contract = Self {
            course_count: 0,
            courses: LookupMap::new(b"c".to_vec()),
            forum_count: 0,
            forums: LookupMap::new(b"f".to_vec()),
        };
        contract.create_forum(String::from("Default Forum"), None);
        return contract;
    }
}

#[near_bindgen]
impl Contract {
    pub fn get_course_count(&self) -> u64 {
        self.course_count
    }

    pub fn create_course(&mut self, course_id: u64, title: String, image: String, price: u64) -> u64 {
        let account_id = env::signer_account_id();
        self.course_count += 1;
        if course_id != self.course_count {
            panic!("Invalid course_id");
        }
        let course = Course {
            course_id: self.course_count,
            creator: account_id,
            title,
            image,
            price,
            sections: Vector::new(b"s"),
            quiz: None,
            subscriber_count: 0,
        };
        self.courses.insert(&self.course_count, &course);
        return self.course_count;
    }

    fn assert_course_exists(&self, course_id: u64) -> Course {
        let mut course = match self.courses.get(&course_id) {
            Some(question) => question,
            None => panic!("No Course Found"),
        };
        return course;
    }

    fn assert_course_creator(&self, course_id: u64) -> Course {
        let account_id = env::signer_account_id();
        let mut course = self.assert_course_exists(course_id);
        if !course.creator.eq(&account_id) {
            panic!("Only creator can add lessons");
        }
        return course;
    }

    pub fn add_section(&mut self, course_id: u64, section_id: u64, section_title: String) -> u64 {
        let mut course = self.assert_course_creator(course_id);
        let section_count = course.sections.len()+1;
        if section_id != section_count {
            panic!("Invalid section_id");
        }
        course.sections.push(&Section { section_id: section_count, section_title, chapters: Vector::new(b"c") });
        self.courses.insert(&course_id, &course);
        section_count
    }

    pub fn add_chapter(&mut self, course_id: u64, section_id: u64, chapter_id: u64, chapter_title: String, chapter_text_content: Option<String>, chapter_video_content: Option<String>) -> u64 {
        let mut course = self.assert_course_creator(course_id);
        let mut section = course.sections.get(section_id-1).unwrap();
        let chapter_count = section.chapters.len()+1;
        if chapter_id != chapter_count {
            panic!("Invalid section_id");
        }
        section.chapters.push(&Chapter {
            chapter_id: chapter_count,
            chapter_title,
            chapter_text_content,
            chapter_video_content
        });
        course.sections.replace(section_id-1, &section);
        self.courses.insert(&course_id, &course);
        chapter_count
    }

    pub fn subscribe_course(&mut self, course_id: u64) {
        let mut course = self.assert_course_exists(course_id);
        course.subscriber_count += 1;
        self.courses.insert(&course_id, &course);
    }

    pub fn create_forum(&mut self, title: String, course_id: Option<u64>) -> u64 {
        let account_id = env::signer_account_id();
        if let Some(course_id) = course_id {
            self.assert_course_creator(course_id);
        }
        self.forum_count += 1;
        let forum = Forum {
            forum_id: self.forum_count,
            title,
            course_id,
            question_count: 0,
            questions: LookupMap::new(b"q".to_vec()),
        };
        self.forums.insert(&self.forum_count, &forum);
        return self.forum_count;
    }

    fn assert_forum_exists(&self, forum_id: u64) -> Forum {
        let mut forum = match self.forums.get(&forum_id) {
            Some(forum) => forum,
            None => panic!("No Forum Found"),
        };
        return forum;
    }

    pub fn ask(&mut self, forum_id: u64, text: String) -> u64 {
        let account_id = env::signer_account_id();
        let mut forum = self.assert_forum_exists(forum_id);
        forum.question_count += 1;
        let question = Question {
            id: forum.question_count,
            questioner: account_id,
            text,
            bounty: 0,
            is_active: true,
            answers: Vector::new(b"c"),
        };
        forum.questions.insert(&forum.question_count, &question);
        self.forums.insert(&forum_id, &forum);
        return forum.question_count;
    }

    pub fn get_question(&self, forum_id: u64, question_id: u64) -> Option<String> {
        let forum = self.assert_forum_exists(forum_id);
        return match forum.questions.get(&question_id) {
            Some(question) => Some(question.text),
            None => None,
        };
    }

    pub fn answer(&mut self, forum_id: u64, question_id: u64, text: String) {
        let account_id = env::signer_account_id();
        let mut forum = self.assert_forum_exists(forum_id);
        let mut question = match forum.questions.get(&question_id) {
            Some(question) => question,
            None => panic!("No Question Found"),
        };
        question.answers.push(&Answer {
            answerer: account_id,
            text,
        });
        forum.questions.insert(&question_id, &question);
        self.forums.insert(&forum_id, &forum);
    }

    pub fn get_answers(&self, forum_id: u64, question_id: u64) -> Option<Vec<String>> {
        let forum = self.assert_forum_exists(forum_id);
        return match forum.questions.get(&question_id) {
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

    pub fn accept_answer(&mut self, forum_id: u64, question_id: u64) {
        let account_id = env::signer_account_id();
        let mut forum = self.assert_forum_exists(forum_id);
        let mut question = match forum.questions.get(&question_id) {
            Some(question) => question,
            None => panic!("No Question Found"),
        };
        if !question.questioner.eq(&account_id) {
            panic!("Only questioner can accept an answer");
        }
        question.is_active = false;
        forum.questions.insert(&question_id, &question);
        self.forums.insert(&forum_id, &forum);
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
