import { gql } from "@apollo/client";
import { 
  PaginatorFragment,
  ProductionDataFragment,
  TopicDataFragment
} from "./fragments"

export const GET_TOPIC_TYPES = gql`
  query topic_types {
    topic_types {
      data {
        slug
        name
        name_en
      }
    }
  }
`

export const GET_TOPICS = gql`
  ${PaginatorFragment}
  ${TopicDataFragment}
  ${ProductionDataFragment}
  query topics($filters: TopicFilters $page: Int $first: Int) {
    topics(filters: $filters page: $page first: $first) {
      paginatorInfo {
        ...PaginatorFragment
      }
      data {
        ...TopicDataFragment
        production {
          ...ProductionDataFragment
        }
      }
    }
  }
`

export const GET_TOPIC_DETAIL = gql`
  ${PaginatorFragment}
  ${TopicDataFragment}
  ${ProductionDataFragment}
  query topics($filters: TopicFilters $page: Int $first: Int) {
    topics(filters: $filters page: $page first: $first) {
      paginatorInfo {
        ...PaginatorFragment
      }
      data {
        ...TopicDataFragment
        content
        production {
          ...ProductionDataFragment
        }
      }
    }
  }
`