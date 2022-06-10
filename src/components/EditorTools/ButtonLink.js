import { useState } from "react"
import {
  Flex,
  Input,
  Box,
  Collapse,
  Select
} from "@chakra-ui/react"
import { Rnd } from "react-rnd";
import { IconButton } from "components/IconButton"
import { ButtonLink } from "components/ElementTemplate/ButtonLink"

export const ButtonTool = ({ data, mode }) => {
  const [collapse, setCollapse] = useState(true && mode === "edit" && !data)
  const [buttonLink, setButtonLink] = useState( data ?? { 
    text: "Button Link", 
    link: "https://example.com/", 
    align: 'flex-start',
    target: "_blank"
  })

  return (
    <Box 
      pos="relative" 
      background={(collapse) ? "yellow" : "unset"}
    >
      <ButtonLink data={buttonLink} />
      {mode === "edit" && 
        <Box 
          pos="absolute"
          top="0"
          right="-1vw"
          height="100%"
          zIndex="100"
          bg="#FFF"
        >
          <Rnd dragHandleClassName="drag-handle" enableResizing={false}>
            <Flex 
              bg={collapse ? "#FFF" : ""}
              boxShadow={ collapse ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : ""}
              alignItems="flex-start" 
              flexDir="column"
              minW="50vw"
            >
              <Flex>
                <IconButton onClick={() => {
                  setCollapse(!collapse)
                }} className="drag-handle">
                  <i className="fa-solid fa-pen"></i>
                </IconButton>
              </Flex>
              <Collapse mt={4} in={collapse} >
                <Flex padding={2} flexDir="column" alignItems="flex-start" gridGap={2} minW="30vw">
                  <Input 
                    minH="3vw"
                    placeholder="Button Text" 
                    value={buttonLink?.text}
                    onChange={(e) => setButtonLink(prev => ({ ...prev, text: e?.target?.value }))}
                  />
                  <Input 
                    minH="3vw"
                    placeholder="Button Link" 
                    value={buttonLink?.link}
                    onChange={(e) => setButtonLink(prev => ({ ...prev, link: e?.target?.value }))}
                  />
                  <Select 
                    placeholder='Select target'
                    value={buttonLink?.target}
                    onChange={(e) => setButtonLink(prev => ({ ...prev, target: e?.target?.value }))}
                  >
                    <option value='_blank'>_blank</option>
                    <option value='_parent'>_parent</option>
                    <option value='_self'>_self</option>
                    <option value='_top'>_top</option>
                  </Select>
                  <Flex flex="5%" justifyContent="space-evenly">
                    <IconButton 
                      active={buttonLink.align === "flex-start"}
                      onClick={() => setButtonLink(prev => ({ ...prev, align: 'flex-start' }))}
                    ><i className="fa-solid fa-align-left"></i></IconButton>
                    <IconButton
                      active={buttonLink.align === "center"}
                      onClick={() => setButtonLink(prev => ({ ...prev, align: 'center' }))}
                    ><i className="fa-solid fa-align-center"></i></IconButton>
                    <IconButton
                      active={buttonLink.align === "flex-end"}
                      onClick={() => setButtonLink(prev => ({ ...prev, align: 'flex-end' }))}
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