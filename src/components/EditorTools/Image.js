import { useState } from "react"
import { Box, Flex, Input, Collapse } from "@chakra-ui/react"
import { ContentImage } from "components/ElementTemplate/Image"
import { Rnd } from "react-rnd";
import { IconButton } from "components/IconButton"
import { RemoveElement } from "components/RemoveElement"

export const ImageTool = ({ data, mode, handleRemove }) => {
  const [imageSrc, setImageSrc] = useState(data ?? "https://img.stg.skettt.com/images/watanabe/topics/3/image.png")
  const [collapse, setCollapse] = useState(true)

  return (
    <Box pos="relative">
      <ContentImage src={imageSrc} />
      <RemoveElement mode={mode} handleRemove={handleRemove} />
      {mode === "edit" && 
        <Box 
          pos="absolute" 
          right={0}
          top="0"
          height="100%"
        >
          <Rnd bounds="parent" dragHandleClassName="drag-handle">
            <Flex flexDir="column" bg="#FFF">
              <Flex>
                <IconButton onClick={() => {
                  if(!imageSrc) {
                    setCollapse(true)
                    return
                  } 
                  setCollapse(!collapse)
                }} className="drag-handle">
                  <i className="fa-solid fa-pen"></i>
                </IconButton>
              </Flex>
              <Collapse mt={4} in={collapse} >
                <Flex alignItems="center" gridGap={2} width="100%">
                  <Input 
                    placeholder="Image source" 
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e?.target?.value)}
                    minW="30vw"
                  />
                </Flex>
              </Collapse>
            </Flex>
          </Rnd>
        </Box>
      }
    </Box>
  )
}