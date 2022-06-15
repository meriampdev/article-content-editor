import { Box, Flex, Image } from "@chakra-ui/react"

export const ContentImage = ({ data }) => {
  const { align, width, src } = data
  return (
    <Flex w="100%" justifyContent={align || "flex-start"}>
      <Box 
        maxW={{base: "89vw", md: "55.15625vw"}}
        maxH={{ base: "60.2564vw", md: "37.0833vw" }}
        width={(width?.base && width?.md) ? { base: `${width?.base}`, md: `${width?.md}` } : "auto"}
        {...data?.styles}
      >
        <Image 
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="left"
          className="image"
          src={src} 
          data-align={align}
          data-width_sp={width?.base}
          data-width_pc={width?.md}
          data-styles={!!data?.styles ? JSON.stringify(data?.styles) : "{}"}
        />
      </Box>
    </Flex>
  )
}