import { Box } from "@chakra-ui/react"

export const Heading1 = ({ data, editable }) => {
  return (
    <Box
      key="heading1"
      fontSize={{base: "5.6410vw", md: "2.0833vw"}}
      contentEditable={editable}
      className="editable-div h1"
      lineHeight="normal"
      dangerouslySetInnerHTML={{ __html: data ?? "H1" }}
    />
  )
}