import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { 
  Box, 
  Collapse, 
  VStack, 
  Input,
} from "@chakra-ui/react"
import { IconButton } from "components/IconButton"
import { TOOLIDS, TOOL_ICONS } from "constants/tools"

export const Editor = ({ count, setContent, dragHandleClass, fontSize, boxSize }) => {
  const [collapse, setCollapse] = useState(false)
  const [atIndex, setAtIndex] = useState("")

  const handleAddElement = (id) => {
    let item_id = uuidv4()
    let newItem = { tool_id: id, item_id: item_id }
    if(atIndex) {
      let index = parseInt(atIndex)
      setContent((pre) => {
        let elBefore = pre.slice(0, index)
        let elAfter = pre.slice(index, count)
        let newArr = [
          ...elBefore,
          newItem,
          ...elAfter
        ]
        return newArr;
      })
    } else {
      setContent(prev => [...prev, newItem])
    }
    setTimeout(() => {
      var element = document.getElementById(item_id);
      if(element) {
        element.scrollIntoView({behavior: "smooth"})
      } 
    }, 100)
  }

  const handleSetIndex = (value) => {
    if(isNaN(value) || value > count || value < 0) {
      return 
    } else {
      setAtIndex(value)
    }
  }

  return (
    <Box bg={collapse ? "#FFF" : ""} boxShadow={collapse ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : ''}>
      <Box
        className={ dragHandleClass ?? "drag-handle"}
        bg="#FFF"
        boxShadow={!collapse ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : ""}
        cursor="pointer"
        borderRadius="100%"
        boxSize={boxSize ?? "5vw"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={fontSize ?? 50}
        onClick={(e) => {
          e?.stopPropagation()
          setCollapse(!collapse)
        }}
      ><i className="fa-solid fa-screwdriver-wrench"></i></Box>
      <Collapse mt={4} in={collapse} >
        <Box 
          p={1}
          bg="#FFF"
        >
          <VStack spacing={2}>
            <Input 
              size="sm"
              placeholder="insert at"
              _placeholder={{ fontSize: "11px" }}
              maxW="5vw"
              value={atIndex}
              onChange={(e) => handleSetIndex(e?.target?.value)}
            />
            {TOOLIDS.map((tool_id) => {
              return (
                <IconButton minW="3vw" minH="3vw" py={2} onClick={() => handleAddElement(tool_id)} key={tool_id}>
                  {TOOL_ICONS[tool_id]}
                </IconButton>
              )
            })}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  )
}