import { useState } from "react"
import { Box, HStack } from "@chakra-ui/react"
import { Rnd } from "react-rnd";
import { ELEMENT_TEMPLATE, ELEMENT_TOOL, ELEMENT_DEFAULT_DATA } from "constants/tools"
import { IconButton } from "components/IconButton"

export const RenderContent = ({ contentData, tool_id, mode, item_id }) => {
  let styles = (contentData && !!contentData?.styles) ? JSON.parse(contentData?.styles) : null
  const [data, setData] = useState( (styles) ? { ...contentData, styles } : ELEMENT_DEFAULT_DATA[tool_id])
  const [collapse, setCollapse] = useState(false)
  const Component = ELEMENT_TEMPLATE[tool_id]
  const ElementTool = ELEMENT_TOOL[tool_id]

  return (
    <Box my={2}>
      <Box 
        pos="relative" 
        boxShadow={collapse ? "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px" : "unset"}
     >
        {data && <Component item_id={item_id} mode={mode} data={data} />}
        {mode === "edit" && 
          <Box 
            pos="absolute"
            top="0"
            right="-1vw"
            height="100%"
            bg="#FFF"
          >
            <Rnd 
              dragHandleClassName="drag-handle" 
              enableResizing={false}
              bounds="parent"
            >
              <HStack 
                alignItems="flex-start"
                bg={collapse ? "#FFF" : ""}
              >
                <IconButton 
                  onClick={() => setCollapse(!collapse)} 
                  className="drag-handle"
                  color={collapse ? "green" : ""}
                  minW={10}
                >
                  <i className="fa-solid fa-pen"></i>
                </IconButton>
                <ElementTool 
                  item_id={item_id}
                  tool_id={tool_id}
                  data={data} 
                  setData={setData} 
                  collapse={collapse}
                  setCollapse={setCollapse}
                />
              </HStack>
            </Rnd>
          </Box>
        }
      </Box>
    </Box>
  )
}