import { useState, useEffect } from "react"
import { 
  Box, 
  HStack, 
  Image,
  VStack,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom";
import { GET_TOPIC_DETAIL } from "graphql/topics"
import { useQuery } from "@apollo/client"
import { FullPageCoveredLoader } from "components/PageLoader"
import { ELEMENT_TEMPLATE } from "constants/tools"

const Dash = ({ ...rest }) => (
  <>
  <Box className="sp" marginInlineEnd="0.5rem !important" {...rest}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="2" viewBox="0 0 20 2">
      <line id="Line_32" data-name="Line 32" x2="20" transform="translate(0 1)" fill="none" stroke="#000" strokeWidth="2"/>
    </svg>
  </Box>
  <Box mt="-1%" className="pc" marginInlineStart="0 !important" marginInlineEnd="0.5rem !important" {...rest}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="2" viewBox="0 0 28 2">
      <line id="Line_24" data-name="Line 24" x2="28" transform="translate(0 1)" fill="none" stroke="#000" strokeWidth="2"/>
    </svg>
  </Box>
  </>
)

export const Preview = (props) => {
  let params = useParams();
  let id = params?.topicId
  const [data, setData] = useState({})
  const { loading, data: response } = useQuery(GET_TOPIC_DETAIL, {
    variables: { filters: { id: parseInt(id) } },
    skip: !id
  });
  const loadingDetails = false

  useEffect(() => {
    return () => {
      if(!loading) {
        localStorage.removeItem(`preview-content-${id}`)
      }
    }
  }, [loading, id])

  useEffect(() => {
    if(!loading && response?.topics?.data?.length > 0) {
      setData(response?.topics?.data[0])
    }
  }, [loading, response])

  const stored = localStorage.getItem(`preview-content-${id}`)
  const contentArray = !!stored ? JSON.parse(stored) : []

  return (
    <Box padding={{ base: "5.12vw", md: "5vw", xl: "7.8vw"}}>
      {loading && <FullPageCoveredLoader />}
      <Box minH="100vh">
        <Box>
          <HStack>
            <Dash />
            <Text
              fontFamily="DIN2014-Regular" 
              fontSize={{ base: "3.0769vw", md: "1.2vw", xl: "1.14vw"}}
            >{data?.date}</Text>
          </HStack>
          <HStack
            flexDirection={{base: 'column', md: 'row'}} 
            mt={{base: '6vw', md: '1.56vw'}} 
            mb={{base: "2vw", md: "unset"}}
            alignItems="flex-start" 
            maxW="100%"
          >
            <VStack 
              maxW={{base: "", md: "55.15625vw"}} 
              mr={{base: '0', md: '5.31vw'}}
              mb={{base: "7vw", md: ""}}
              w={{base: '100%', md: 'unset'}}
            >
              <Box fontFamily="DIN2014-Regular" w={{base: '100%', md: 'unset'}}>
                {loadingDetails && 
                  <SkeletonText 
                    skeletonHeight={{base: "5.6410vw", md: "2vw"}}
                    mb={{base: '3vw', md: '1.8vw'}}
                    noOfLines={2}
                    spacing={4}
                  />
                }
                <Text
                  mb={{base: '3vw', md: '1.8vw'}}
                  fontSize={{base: "5.6410vw", md: "2vw"}}
                  fontFamily="DIN2014-Regular" fontWeight="bold"
                >{data?.title}</Text>
                {loadingDetails && 
                  <Skeleton 
                    isLoaded={!loadingDetails} 
                    w="10vw" 
                    h={{base: "3.0769vw", md: "1.04vw"}}
                    mb={{base: '7vw', md: '1vw'}}
                  />
                }
                <Text 
                  mb={{base: '7vw', md: '1vw'}}
                  fontSize={{base: "3.0769vw", md: "1.04vw"}}
                  textTransform="uppercase"
                >{data?.desc2}</Text>
                <Box
                  minW={{base: "", md: "55.15625vw"}}
                  maxW={{base: "", md: "55.15625vw"}}
                  minH={{base: "60.2564vw", md: "unset"}}
                  h={{base: "60.2564vw", md: "unset"}}
                > 
                  {loadingDetails && <Skeleton w="100%" h={{base: "60.2564vw", md: "25vw"}} />}
                  {data?.image_src && 
                    <Image 
                      src={data?.image_src} 
                      h="100%"
                      w="100%"
                      objectFit="cover"
                    />
                  }
                </Box>
                <Box 
                  maxW={{base: "90vw", md: "unset"}}
                  mt={{base: '5vw', md: '3.17vw'}}
                >
                  {contentArray.map((item) => {
                    const Component = ELEMENT_TEMPLATE[item?.tool_id]
                    let styles = item?.data?.styles ? JSON.parse(item?.data?.styles) : {}
                    return (
                      <Box my={2}>
                        <Component mode="display" data={{ ...item?.data, styles }} />
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}