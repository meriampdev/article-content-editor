import { Box } from "@chakra-ui/react"

export const Heading1 = ({ data, mode }) => {
  return (
    <Box
      key="heading1"
      contentEditable={mode === "edit"}
      className="editable-div h1"
      lineHeight="normal"
      fontSize={{base: "5.6410vw", md: "2.0833vw"}}
      dangerouslySetInnerHTML={{ __html: data?.text ?? "H1" }}
      data-styles={!!data?.styles ? JSON.stringify(data?.styles) : "{}"}
      {...data?.styles}
    />
  )
}