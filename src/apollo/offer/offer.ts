import { gql } from "@apollo/client";

export const GET_ALL_OFFERS = gql`
  query offers {
    getAllOffers {
      title
      description
      liked {
        id
      }
      matches {
        id
      }
      user {
        id
      }
    }
  }
`;
