import { HStack, Button } from "@chakra-ui/react"
import { ReorderElement } from "./ReorderElement"
import { ELEMENT_DEFAULT_DATA } from "constants/tools"

export const ElementActions = ({ setData, tool_id, index, contents, setContent, collapse }) => {
  
  const handleRemove = () => {
    let arr = [...contents]
    let newarr = arr.filter((f, i) => i !== index)
    setContent(newarr)
  }

  return (
    <HStack width="100%" display={collapse ? 'flex' : 'none'} justifyContent="flex-start">
      <Button size="xs" onClick={() => setData(ELEMENT_DEFAULT_DATA[tool_id])}>Reset</Button>
      <ReorderElement currIndex={index} contents={contents} setContent={setContent} />
      <Button color="red" size="xs" onClick={handleRemove}>Delete</Button>
    </HStack>
  )
}