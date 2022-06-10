import { useState } from "react"
import { Box, Flex, Input, Collapse } from "@chakra-ui/react"
import { ContentImage } from "components/ElementTemplate/Image"
import { Rnd } from "react-rnd";
import { IconButton } from "components/IconButton"
import { RemoveElement } from "components/RemoveElement"

export const ImageTool = ({ data, mode, handleRemove }) => {
  const [imageSrc, setImageSrc] = useState(data.src ?? "https://img.stg.skettt.com/images/watanabe/topics/3/image.png")
  const [collapse, setCollapse] = useState(true)
  const [width, setWidth] = useState({ sp: data?.width?.sp, pc: data?.width?.pc })
  const [align, setAlign] = useState(data?.align)

  return (
    <Box pos="relative">
      <ContentImage data={{ align, width, src: imageSrc }} />
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
                <Flex flexDir="column" gridGap={2} width="30vw" p={2}>
                  <Input 
                    placeholder="Image source" 
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e?.target?.value)}
                  />
                  <Flex gridGap={2}>
                    <Input 
                      placeholder="Width SP" 
                      value={width?.sp}
                      onChange={(e) => setWidth(prev => ({ ...prev, sp: e?.target?.value }))}
                    />
                    <Input 
                      placeholder="Width PC" 
                      value={width?.pc}
                      onChange={(e) => setWidth(prev => ({ ...prev, pc: e?.target?.value }))}
                    />
                  </Flex>
                  <Flex justifyContent="space-evenly">
                    <IconButton 
                      active={align === "flex-start"}
                      onClick={() => setAlign("flex-start")}
                    ><i className="fa-solid fa-align-left"></i></IconButton>
                    <IconButton
                      active={align === "center"}
                      onClick={() => setAlign("center")}
                    ><i className="fa-solid fa-align-center"></i></IconButton>
                    <IconButton
                      active={align === "flex-end"}
                      onClick={() => setAlign("flex-end")}
                    ><i className="fa-solid fa-align-right"></i></IconButton>
                  </Flex>
                </Flex>
              </Collapse>
            </Flex>
          </Rnd>
        </Box>
      }
    </Box>
  )
}