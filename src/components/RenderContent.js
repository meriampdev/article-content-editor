import { useState } from "react"
import { Box, HStack, VStack, Text } from "@chakra-ui/react"
import { Rnd } from "react-rnd";
import { ELEMENT_TEMPLATE, ELEMENT_TOOL, ELEMENT_DEFAULT_DATA } from "constants/tools"
import { IconButton } from "components/IconButton"
import { ElementActions } from "components/ElementActions"

export const RenderContent = ({ index, contents, setContent, contentData, tool_id, mode, item_id }) => {
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
                justifyContent="center"
                bg={collapse ? "#FFF" : ""}
              >
                <IconButton 
                  onClick={() => setCollapse(!collapse)} 
                  className="drag-handle"
                  color={collapse ? "green" : ""}
                  minW={10}
                  size="xs"
                >
                  <Text as="i" className="fa-solid fa-pen" fontSize="xs" />
                  {/* <i className="fa-solid fa-pen"></i> */}
                </IconButton>
                <VStack>
                  <ElementActions 
                    setData={setData}
                    tool_id={tool_id}
                    index={index}
                    contents={contents}
                    setContent={setContent}
                    collapse={collapse}
                  />
                  <ElementTool 
                    item_id={item_id}
                    tool_id={tool_id}
                    data={data} 
                    setData={setData} 
                    collapse={collapse}
                    setCollapse={setCollapse}
                  />
                </VStack>
              </HStack>
            </Rnd>
          </Box>
        }
      </Box>
    </Box>
  )
}