import { Box } from "@chakra-ui/react"
import { ReorderElement } from "./ReorderElement"

export const ElementActions = ({ index, contents, setContent }) => {
  
  const handleRemove = () => {
    let arr = [...contents]
    let newarr = arr.filter((f, i) => i !== index)
    setContent(newarr)
  }
  
  return (  
    <Box 
      pos="absolute"
      top="0"
      left="-5.3vw"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pr={1}
      borderRight="1px solid #1CBF73"
      className="element-actions"
    >
      <Box cursor="pointer" color="red" _hover={{ color: "red" }}>
        <i onClick={handleRemove} className="fa-solid fa-circle-minus"></i>
      </Box>
      <Box ml={3} mr={5}>
        <ReorderElement currIndex={index} contents={contents} setContent={setContent} />
      </Box>
    </Box>
  )
}