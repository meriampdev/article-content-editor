import { Box, Center, Image } from "@chakra-ui/react"

export const FullPageCoveredLoader = () => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="100vw"
      bg="#FFF"
      zIndex="100000"
    >
      <Center h="100%">
        <Box 
          pos="relative"
          boxSize={{base: "20vw", md: "6vw"}}
          padding={{base: "1vw", md: "0.5vw"}}
        >
          <Box boxSize={{base: "20vw", md: "6vw"}} className="animatedBorder" />
          <Box pos="absolute" top="0" left="0" h="100%" w="100%" zIndex="1">
            <Center h="100%">
              <Image boxSize={{base: "18vw", md: "5.4vw"}} src={`https://img.stg.skettt.com/assets/common/circle-logo.png`} />
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}