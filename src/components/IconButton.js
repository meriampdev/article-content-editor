import { Box } from "@chakra-ui/react"

export const IconButton = ({ active, children, ...rest }) => {
  return (
    <Box
      cursor="pointer"
      bg={active ? "#edf2f7" : ""}
      boxSize={10}
      borderRadius="100%"
      _hover={{ bg: "#edf2f7" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Box>
  )
}