import gql from "graphql-tag";

export const ADD_PIN = gql`
  mutation AddPin($pin: PinInput!) {
    addPin(pin: $pin) {
      title
      image
    }
  }
`;

export const LIST_PINS = gql`
  {
    pins {
      id
      title
      image
      user_id
    }
  }
`;

export const GET_PIN = gql`
  query PinId($id: String!) {
    pinById(id: $id) {
      id
      title
      image
      user_id
    }
  }
`;

export const POST_COMMENT = gql`
  mutation PostComent($comment: String!, $pin: String!, user: String!) {
    postComment(comment: $comment, pin_id: $pin, user_id: $user)
  }
`;

export const CREATE_LONG_LIVED_TOKEN = gql`
  mutation CreateLongLivedToken($short_token: String!) {
    createLongLivedToken(short_token: $short_token)
  }
`;

export const CREATE_SHORT_LIVED_TOKEN = gql`
  mutation CreateShortLivedToken($email: String!) {
    sendShortLivedToken(email: $email)
  }
`;

export const ME = gql`
  {
    me {
      email
    }
  }
`;
