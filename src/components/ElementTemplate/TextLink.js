import {
  Flex,
  Box
} from "@chakra-ui/react"

export const TextLink = ({ data }) => {
  const { text, link, align, target } = data
  return (
    <Flex w="100%" justifyContent={align}>
      <Box
        className="text-link"
        cursor="pointer"
        onClick={() => window.open(link, target)}
        color="#151515"
        data-url={link}
        data-align={align}
        data-text={text}
        data-target={target}
        _hover={{ 
          opacity: "0.8", 
          textDecoration: 'underline',
          textDecorationColor: data?.styles?.color
        }}
        borderRadius="none"
        fontSize={{ base: "3.07vw", md: "0.83vw"}}
        data-styles={!!data?.styles ? JSON.stringify(data?.styles) : "{}"}
        {...data?.styles}
      >{text}</Box>
    </Flex>
  )
}