import { Box } from "@chakra-ui/react"

export const ContentBody = ({ data, mode, ...rest }) => {
  return (
    <Box
      contentEditable={mode === "edit"}
      fontSize={{base: "3.5897vw", md: "1.1vw", "2xl": "0.9375vw"}}
      className="editable-div content-text"
      dangerouslySetInnerHTML={{ __html: data ?? "Text" }}
      {...rest}
    />
  )
}