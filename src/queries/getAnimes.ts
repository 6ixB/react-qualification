import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
query GetAnimes($page: Int, $perPage: Int, $search: String) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: POPULARITY_DESC, search: $search) {
      id
      title {
        english
      }
      description
      coverImage {
        medium
      }
    }
  }
}
`;