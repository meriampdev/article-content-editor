import { Box } from "@chakra-ui/react"

export const Heading3 = ({ data, mode }) => {
  return (
    <Box
      key="heading3"
      bg="#F3F3F3"
      width="100%"
      height={{ base: "14.615vw", md: "4.6354vw" }}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      px={(mode === "edit") ? 5 : 3}
      contentEditable={ mode === "edit" }
      fontSize={{base: "4.6153vw", md: "1.2vw", "2xl": "1.4583vw"}}
      className="editable-div h3"
      lineHeight="normal"
      dangerouslySetInnerHTML={{ __html: data ?? "H3" }}
    />
  )
}