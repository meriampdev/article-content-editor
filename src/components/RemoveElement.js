import { Box } from "@chakra-ui/react"

export const RemoveElement = ({ mode, handleRemove }) => {
  if(mode !== "edit") return null 

  return (  
    <Box 
      pos="absolute"
      top="0"
      left="-4vw"
      height="100%"
      zIndex="100"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pr={1}
      borderRight="1px solid #1CBF73"
      className="remove-btn"
    >
      <Box cursor="pointer" color="#1CBF73" _hover={{ color: "red" }} mr={5}>
        <i onClick={handleRemove} className="fa-solid fa-circle-minus"></i>
      </Box>
    </Box>
  )
}