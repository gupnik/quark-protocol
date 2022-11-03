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