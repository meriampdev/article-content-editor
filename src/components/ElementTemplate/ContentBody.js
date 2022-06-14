import { Box } from "@chakra-ui/react"

export const ContentBody = ({ data, mode, ...rest }) => {
  return (
    <Box
      contentEditable={mode === "edit"}
      fontSize={{base: "3.5897vw", md: "0.9375vw"}}
      lineHeight={{base: "11.5vw", md: "1.875vw"}}
      className="editable-div content-text section"
      dangerouslySetInnerHTML={{ __html: data?.text ?? "Text" }}
      height="auto"
      data-styles={!!data?.styles ? JSON.stringify(data?.styles) : "{}"}
      {...rest}
      {...data?.styles}
    />
  )
}