import { Box, Grid } from "@chakra-ui/react"

export const Heading4 = ({ data, mode }) => {
  return (
    <Box
      key="heading2"
      width="100%"
      height={{ base: "14.615vw", md: "3.6354vw", "2xl": "4.6354vw" }}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Grid gridTemplateColumns="1% 99%" gridGap={2}>
        <Box 
          height="100%"
          width={{base: "0.8vw", md: "0.2vw"}}
          bg="#000"
        />
        <Box 
          fontSize={{base: "4.1025vw", md: "1.25vw"}}
          contentEditable={ mode === "edit" }
          className="editable-div h4"
          lineHeight="normal"
          dangerouslySetInnerHTML={{ __html: data ?? "H4" }}
        />
      </Grid>
      
    </Box>
  )
}