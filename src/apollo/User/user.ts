import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      first_name
      last_name
      offers {
        id
        title
        description
        img
      }
    }
  }
`;
