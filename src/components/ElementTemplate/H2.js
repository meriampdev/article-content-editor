import { Box } from "@chakra-ui/react"

export const Heading2 = ({ data, mode }) => {
  return (
    <Box key="heading2">
      <Box
        fontSize={{base: "5.1282vw", md: "1.7708vw"}}
        contentEditable={ mode === "edit" }
        className="editable-div h2"
        lineHeight="normal"
        dangerouslySetInnerHTML={{ __html: data?.text ?? "H2" }}
        data-styles={!!data?.styles ? JSON.stringify(data?.styles) : "{}"}
        {...data?.styles}
      />
      <Box 
        bg="#000"
        height={{base: "0.8vw", md: "0.2vw"}}
        width="100%"
      />
    </Box>
  )
}