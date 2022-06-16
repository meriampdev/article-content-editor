import { Box, Grid } from "@chakra-ui/react"

export const Heading4 = ({ data, mode }) => {
  return (
    <Box
      key="heading2"
      width="100%"
      minHeight={{ base: "14.615vw", md: "3.6354vw", "2xl": "4.6354vw" }}
      height="auto"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Grid width="100%" gridTemplateColumns="1% 95%" gridGap={1}>
        <Box 
          height="100%"
          width={{base: "0.8vw", md: "0.2vw"}}
          bg="#000"
        />
        <Box 
          w="100%"
          flex="1"
          fontSize={{base: "4.1025vw", md: "1.25vw"}}
          contentEditable={ mode === "edit" }
          className="editable-div h4"
          lineHeight="normal"
          dangerouslySetInnerHTML={{ __html: data?.text ?? "H4" }}
          data-styles={!!data?.styles ? JSON.stringify(data?.styles) : "{}"}
          {...data?.styles}
        />
      </Grid>
      
    </Box>
  )
}