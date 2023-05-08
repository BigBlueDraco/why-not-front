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
        grades {
          id
        }
        matches {
          id
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
export const GET_OFFERS_FOR_USER = gql`
  query offers($page: Float!, $limit: Float!) {
    getOffersForUser(page: $page, limit: $limit) {
      items {
        id
        title
        description
        user {
          id
        }
        grades {
          id
        }
        matches {
          id
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

export const UPLOAD_FILE = gql`
  mutation Upload($file: Upload!) {
    uploadFile(file: $file)
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
      matches {
        id
      }
    }
  }
`;

export const CREATE_OFFER_MUTATION = gql`
  mutation CreateOffer($data: CreateOfferInput!, $file: Upload!) {
    createOffer(createOfferInput: $data, file: $file) {
      title
      description
      updatedAt
      createdAt
      user {
        id
        email
        last_name
      }
    }
  }
`;
