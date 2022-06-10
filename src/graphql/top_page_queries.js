import { gql } from "@apollo/client";
import { CoreTalentDataFragment } from "./fragments"

export const GET_TOP_VISUALS = gql`
  query top_visuals {
    top_visuals {
      colors
      name
      pc_url
      sp_url
    }
  }
`

export const GET_TOP_SEARCH_LINKS = gql`
  query top_search {
    top_search {
      title
      links {
        title
        url
      }
    }
  }
`

export const GET_TOP_TOPICS = gql`
  query top_topics {
    top_topics {
      data {
        id
        title
        date
        desc1
        desc2
        image_src
      }
    }
  }
`

export const GET_TOP_ARTICLES = gql`
  query top_articles {
    top_articles {
      featured_articles {
        id
        title
        date
        desc1
        desc2
        image_src
      }
      
      entertainment_articles {
        id
        title
        date
        desc1
        desc2
        image_src
      }
    }
  }
`

export const GET_TOP_TALENTS = gql`
  ${CoreTalentDataFragment}
  query top_talents {
    top_talents {
      ...CoreTalentDataFragment
    }
  }
`