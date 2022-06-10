import { Box, Image } from "@chakra-ui/react"

export const ContentImage = ({ src }) => {
  return (
    <Box 
      maxW={{base: "", md: "55.15625vw"}}
      minW={{ base: "89vw", md: "45vw", "2xl": "55.156625vw" }}
      maxH={{ base: "60.2564vw", md: "37.0833vw" }}
    >
      <Image 
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="left"
        className="image"
        src={src} 
      />
    </Box>
  )
}