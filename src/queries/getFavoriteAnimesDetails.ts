import { gql } from "@apollo/client";

export const GET_FAVORITE_ANIMES_DETAILS = gql`
query GetFavoriteAnimesDetails($perPage: Int, $ids: [Int!]) {
  Page(perPage: $perPage) {
    media(type: ANIME, id_in: $ids) {
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