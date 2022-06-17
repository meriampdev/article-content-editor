import { 
  Box, 
  HStack, 
  VStack,
  ChakraProvider
} from "@chakra-ui/react"
import { ELEMENT_TEMPLATE } from "constants/tools"


export const MobileView = () => {
  const stored = localStorage.getItem(`mobile-content`)
  const contentArray = !!stored ? JSON.parse(stored) : []
  return (
    <ChakraProvider>
      <Box bg="#FFF" padding={{ base: "5.12vw", md: "5vw", xl: "7.8vw"}}>
        <Box minH="100vh">
          <Box>
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
                  <Box 
                    maxW={{base: "90vw", md: "unset"}}
                    mt={{base: '5vw', md: '3.17vw'}}
                  >
                    {contentArray.map((item) => {
                      const Component = ELEMENT_TEMPLATE[item?.tool_id]
                      let styles = item?.data?.styles ? JSON.parse(item?.data?.styles) : {}
                      return (
                        <Box my={2} key={item?.item_id}>
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
    </ChakraProvider>
  )
}