import { gql } from "@apollo/client";

export const GET_ANIME_DETAILS = gql`
query GetAnimeDetails($id: Int) {
  Media(id: $id) {
    id
    title {
      english
      romaji
    }
    description
    episodes
    duration
    status
    format
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    genres
    averageScore
    coverImage {
      large
    }
    bannerImage
  }
}
`;