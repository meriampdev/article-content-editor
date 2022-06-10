import { gql } from "@apollo/client";

export const PaginatorFragment = gql`
  fragment PaginatorFragment on PaginatorInfo {
    count 
    currentPage
    firstItem
    hasMorePages
    lastItem
    lastPage
    perPage
    total
  }
`

export const ImageFragment = gql`
  fragment ImageFragment on Image {
    title
    full_url
    description 
    file_name
    file_path
    type
    file_type
  }
`

export const TopicDataFragment = gql`
  fragment TopicDataFragment on Topic {
    id
    title 
    published_at
    status
    type
    desc1
    desc2
    date 
    image_src
    show_top
  }
`

export const ProductionDataFragment = gql`
  fragment ProductionDataFragment on Production {
    username 
    name 
    logo {
      ...ImageFragment
    }
  }
  ${ImageFragment}
`

export const TalentMediaFragment = gql`
  fragment TalentMediaFragment on TalentMedia {
    profile_image {
      ...ImageFragment
    }
    banner_pc {
      ...ImageFragment
    }
    banner_sp {
      ...ImageFragment
    }
    app_form_image {
      ...ImageFragment
    }
    profile_images {
      ...ImageFragment
    }
  }
  ${ImageFragment}
`

export const PlanDataFragment = gql`
  fragment PlanDataFragment on Plan {
    title 
    description
    period
    price 
    enabled 
    inclusions {
      key 
      text 
      enabled
    }
  }
`

export const OptionDataFragment = gql`
  fragment OptionDataFragment on Option {
    title 
    subtitle 
    description 
    price 
    enabled
  }
`
export const CoreTalentDataFragment = gql`
  fragment CoreTalentDataFragment on Talent {
    username
    name
    name_en
    name_jp
    detail_intro_pc
    detail_intro_sp
    is_ready
    show_mode
    show_mosaic
    production {
      ...ProductionDataFragment
    }
    media {
      ...TalentMediaFragment
    }
    terms
  }
  ${ProductionDataFragment}
  ${TalentMediaFragment}
`

export const TalentDataFragment = gql`
  fragment TalentDataFragment on Talent {
    username
    name
    name_en
    name_jp
    detail_intro_pc
    detail_intro_sp
    is_ready
    show_mode
    show_mosaic
    production {
      ...ProductionDataFragment
    }
    media {
      ...TalentMediaFragment
    }
    plans {
      ...PlanDataFragment 
    }
    options {
      ...OptionDataFragment
    }
    terms 
    news {
      data {
        ...TopicDataFragment
      }
    }
  }
  ${ProductionDataFragment}
  ${TalentMediaFragment}
  ${PlanDataFragment}
  ${OptionDataFragment}
  ${TopicDataFragment}
`

export const TalentTagsFragment = gql`
  fragment TalentTagsFragment on TalentTag {
    slug
    name
    name_en
    category {
      slug
      name
      name_en
    }
  }
`;

export const MaterialTagFragment = gql`
  fragment MaterialTagFragment on MaterialTag {
    slug 
    name
    name_en
  }
`

export const MaterialDataFragment = gql`
  fragment MaterialDataFragment on Material {
    title 
    number
    order
    talent_username
    material_tags_string
    material_tags {
      data {
        slug 
        name 
        name_en
      }
    }
    media {
      compressed {
        ...ImageFragment
      }
      watermarked {
        ...ImageFragment
      }
    }
  }
  ${ImageFragment}
`