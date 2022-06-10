import { gql } from "@apollo/client";
import { 
  PaginatorFragment, 
  TalentTagsFragment, 
  TalentDataFragment,
  MaterialDataFragment,
  CoreTalentDataFragment,
  TopicDataFragment
} from "./fragments"

export const LOGIN = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      access_token
      token_type
      expires_in
      company {
        email
      }
    }
  }
`

export const GET_COMPANY_DATA = gql`
  query me {
    me {
      ... on Company {
        address
        company_name
        company_name_phonetic
        company_website
        contact_person
        contact_person_phonetic
        contact_phone_number
        division_name
        email
        establishment_date
        industry
        position
        purpose
        referer
        zip
      }
    }
  }
`

export const GET_TALENTS = gql`
  ${TalentTagsFragment}
  ${TalentDataFragment}
  query talents($filters: TalentFilters) {
    talents(filters: $filters) {
      data {
        ...TalentDataFragment
        talent_tags {
          data {
            ...TalentTagsFragment
          }
        }
      }
    }
  }
`;

export const GET_TALENTS_WITH_MATERIALS = gql`
  ${TalentTagsFragment}
  ${CoreTalentDataFragment}
  ${PaginatorFragment}
  ${MaterialDataFragment}
  ${TopicDataFragment}
  query talents($filters: TalentFilters, $page: Int) {
    talents(filters: $filters) {
      data {
        ...CoreTalentDataFragment
        news {
          data {
            ...TopicDataFragment
          }
        }
        talent_tags {
          data {
            ...TalentTagsFragment
          }
        }
        materials(page: $page, first: 24) {
          paginatorInfo {
            ...PaginatorFragment
          }
          data {
            ...MaterialDataFragment
          }
        }
      }
    }
  }
`;

export const GET_TALENT_TAG_DATA = gql`
  ${TalentTagsFragment}
  query talent_tags($filters: TalentTagFilters, $page: Int) {
    talent_tags(filters: $filters) {
      data {
        ...TalentTagsFragment
      }
    }
  }
`

export const GET_TALENT_TAGS = gql`
  ${TalentTagsFragment}
  ${PaginatorFragment}
  ${CoreTalentDataFragment}
  query talent_tags($filters: TalentTagFilters, $page: Int) {
    talent_tags(filters: $filters) {
      data {
        ...TalentTagsFragment
        talents(page: $page, first: 24) {
          paginatorInfo {
            ...PaginatorFragment
          }
          data {
            ...CoreTalentDataFragment
          }
        }
      }
    }
  }
`

export const GET_TALENT_TAGS_MODE_TEST = gql`
  ${TalentTagsFragment}
  ${PaginatorFragment}
  ${CoreTalentDataFragment}
  query talent_tags($filters: TalentTagFilters, $page: Int) {
    talent_tags(filters: $filters) {
      data {
        ...TalentTagsFragment
        talents(filters: { mode: "test" }, page: $page, first: 24) {
          paginatorInfo {
            ...PaginatorFragment
          }
          data {
            ...CoreTalentDataFragment
          }
        }
      }
    }
  }
`

export const GET_TALENT_TAG_CATEGORIES = gql`
  ${PaginatorFragment}
  ${TalentTagsFragment}
  query talent_tag_categories($filters: TalentTagCategoryFilters) {
    talent_tag_categories(filters: $filters) {
      paginatorInfo {
        ...PaginatorFragment
      }
      data {
        slug 
        name 
        name_en
        talent_tags {
          data {
            ...TalentTagsFragment
          }
        }
      }
    }
  }
`

export const GET_PRODUCER_DATA = gql`
  ${CoreTalentDataFragment}
  ${PaginatorFragment}
  query productions($filters: ProductionFilters, $page: Int) {
    productions(filters: $filters) {
     paginatorInfo {
        ...PaginatorFragment
      }
      data {
        username
        name
        logo {
          full_url
        }
        talents(page: $page, first: 24) {
          paginatorInfo {
            ...PaginatorFragment
          }
          data {
            ...CoreTalentDataFragment
          }
        }
      }
    }
  }
`
