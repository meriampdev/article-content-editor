import {
  Flex,
  Button
} from "@chakra-ui/react"

export const ButtonLink = ({ data }) => {
  const { text, link, align, target } = data
  return (
    <Flex w="100%" justifyContent={align}>
      <Button
        className="button-link"
        onClick={() => window.open(link, target)}
        color="#FFF"
        bg="#1CBF73"
        data-url={link}
        data-align={align}
        data-text={text}
        data-target={target}
        _hover={{ opacity: "0.8" }}
        w={{ base: "100%", md: "19.32vw"}}
        borderRadius="none"
        fontSize={{ base: "3.07vw", md: "0.83vw"}}
        h={{ base: "54px", md: "3.33vw" }}
        data-styles={!!data?.styles ? JSON.stringify(data?.styles) : "{}"}
        {...data?.styles}
      >{text}</Button>
    </Flex>
  )
}