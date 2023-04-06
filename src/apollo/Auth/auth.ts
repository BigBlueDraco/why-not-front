import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($loginData: LoginUserInput!) {
    login(loginUserInput: $loginData) {
      access_token
      user {
        id
      }
    }
  }
`;
export const SIGNUP_MUTATION = gql`
  mutation Signup($signupData: SignupUserInput!) {
    signup(signupUserInput: $signupData) {
      access_token
    }
  }
`;
