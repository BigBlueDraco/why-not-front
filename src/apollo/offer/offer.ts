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

export const GET_OFFER_BY_ID = gql`
  query GetOfferById($id: Int!) {
    getOfferById(id: $id) {
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
      }
    }
  }
`;
