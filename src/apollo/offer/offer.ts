import { gql } from "@apollo/client";

export const GET_ALL_OFFERS = gql`
  query offers($page: Float!, $limit: Float!) {
    getAllOffers(page: $page, limit: $limit) {
      items {
        id
        title
        description
        user {
          id
        }
        liked {
          id
        }
        matches {
          id
          user {
            id
          }
        }
      }
      pagination {
        totalPages
        currentPage
        itemsPerPage
      }
    }
  }
`;
