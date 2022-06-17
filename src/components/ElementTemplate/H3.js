import { Box } from "@chakra-ui/react"

export const Heading3 = ({ data, mode }) => {
  return (
    <Box
      key="heading3"
      bg="#F3F3F3"
      width="100%"
      minHeight={{ base: "14.615vw", md: "4.6354vw" }}
      height="auto"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      px={{base: "5vw", md: "1.875vw"}}
    >
      <Box 
        flex="1"
        width="100%"
        minW={{base: "", md: "5vw"}}
        className="editable-div h3"
        lineHeight="normal"
        contentEditable={ mode === "edit" }
        dangerouslySetInnerHTML={{ __html: data?.text ?? "H3" }}
        fontSize={{base: "4.6153vw", md: "1.4583vw"}}
        data-styles={!!data?.styles ? JSON.stringify(data?.styles) : "{}"}
        {...data?.styles}
      />
    </Box>
  )
}