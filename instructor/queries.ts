import { gql } from "@apollo/client";

export const questionsQuery = gql`
{
    questions(first: 5) {
      id
      text
      questioner {
        id
      }
      answers {
        id
        text
        answerer {
            id
        }
      }
    }
}
`

export const coursesQuery = gql`
{
  courses(first: 5) {
    id
    title
    image
    price
    sections {
      id
      section_title
      chapters {
        id
        chapter_title
        chapter_text_content
      }
    }
  }
}
`