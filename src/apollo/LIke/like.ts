import { gql } from "@apollo/client";

export const CREATE_GRADE_MUTATION = gql`
  mutation Create($data: CreateGradeInput!) {
    CreateGrade(createGradeInput: $data) {
      id
      grade
    }
  }
`;
