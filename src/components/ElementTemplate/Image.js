import { Box, Flex, Image } from "@chakra-ui/react"

export const ContentImage = ({ data }) => {
  const { align, width, src } = data
  return (
    <Flex w="100%" justifyContent={align || "flex-start"}>
      <Box 
        maxW={{base: "89vw", md: "55.15625vw"}}
        maxH={{ base: "60.2564vw", md: "37.0833vw" }}
        width={(width.sp && width.pc) ? { base: `${width?.sp}%`, md: `${width?.pc}%` } : "auto"}
      >
        <Image 
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="left"
          className="image"
          src={src} 
          data-align={align}
          data-width_sp={width?.sp}
          data-width_pc={width?.pc}
        />
      </Box>
    </Flex>
  )
}