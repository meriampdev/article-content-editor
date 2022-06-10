import { gql } from "@apollo/client";
import { 
  MaterialDataFragment,
  PaginatorFragment,
  CoreTalentDataFragment,
} from "./fragments"

export const GET_MATERIAL_DATA_ONLY = gql`
  ${MaterialDataFragment}
  ${CoreTalentDataFragment}
  query materials($filters: MaterialFilters) {
    materials(filters: $filters) {
      data {
        ...MaterialDataFragment
        talent {
          ...CoreTalentDataFragment
        }
      }
    }
  }
`

export const GET_MATERIAL_DETAIL = gql`
  ${MaterialDataFragment}
  ${PaginatorFragment}
  ${CoreTalentDataFragment}
  query materials($filters: MaterialFilters $page: Int) {
    materials(filters: $filters) {
      data {
        ...MaterialDataFragment
        talent {
          ...CoreTalentDataFragment
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
  }
`

export const GET_MATERIALS_PER_TAG = gql` 
  ${MaterialDataFragment}
  ${PaginatorFragment}
  query material_tags($filters: MaterialTagFilters $page: Int) {
    material_tags(filters: $filters, first: 300) {
      data {
        slug 
        name
        name_en
        materials(page: $page first: 24) {
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
`

export const GET_ALL_MATERIAL_TAGS = gql`
  query material_tags($filters: MaterialTagFilters) {
    material_tags(filters: $filters, first: 300) {
      data {
        slug 
        name
        name_en
      }
    }
  }
`

export const GET_MATERIAL_TAG = gql`
  ${MaterialDataFragment}
  ${CoreTalentDataFragment}
  query materials($filters: MaterialFilters) {
    materials(filters: $filters) {
      data {
        ...MaterialDataFragment
        talent {
          ...CoreTalentDataFragment
        }
      }
    }
  }
`