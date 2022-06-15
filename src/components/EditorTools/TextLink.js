import { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Input,
  Collapse,
  Select,
  HStack,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
import { SketchPicker } from 'react-color';
import { IconButton } from "components/IconButton"
import { ELEMENT_DEFAULT_DATA } from "constants/tools"

export const TextLinkTool = ({ tool_id, collapse, data, setData }) => {
  const [colorPicker, setColorPicker] = useState({
    display: false,
    color: data?.styles?.color ?? "#151515"
  })

  const handleSetStyle = (styleKey, styleValue) => {
    let value = data?.styles ? data?.styles[styleKey] !== styleValue ? styleValue : '' : styleValue
    setData(prev => ({ ...prev, styles: { ...prev?.styles, [styleKey]: value } }))
  }

  const handleResponsiveStyle = (styleKey, breakpoint, value) => {
    setData(prev => {
      let prevStyle = prev?.styles[styleKey]
      return { 
        ...prev, 
        styles: { 
          ...prev?.styles, 
          [styleKey]: { ...prevStyle, [breakpoint]: value }
        }
      }
    })
  }

  return (
    <Box boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" minW={collapse ? "25vw" : "unset"}>
      <Collapse mt={4} in={collapse} >
        <Flex padding={2} flexDir="column" alignItems="flex-start" gridGap={2} minW="30vw">
          <Button size="xs" onClick={() => setData(ELEMENT_DEFAULT_DATA[tool_id])}>Reset</Button>
          <Input 
            size="xs"
            placeholder="Button Text" 
            value={data?.text}
            onChange={(e) => setData(prev => ({ ...prev, text: e?.target?.value }))}
          />
          <Input 
            size="xs"
            placeholder="Button Link" 
            value={data?.link}
            onChange={(e) => setData(prev => ({ ...prev, link: e?.target?.value }))}
          />
          <Select 
            size="xs"
            placeholder='Select target'
            value={data?.target}
            onChange={(e) => setData(prev => ({ ...prev, target: e?.target?.value }))}
          >
            <option value='_blank'>_blank</option>
            <option value='_parent'>_parent</option>
            <option value='_self'>_self</option>
            <option value='_top'>_top</option>
          </Select>
          <Flex>
            <HStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">Line Height SP</Text>
                <Input 
                  value={data?.styles?.lineHeight?.base} 
                  onChange={(e) => handleResponsiveStyle('lineHeight', 'base', e?.target?.value)}
                  placeholder="sp" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">Line Height PC</Text>
                <Input 
                  value={data?.styles?.lineHeight?.md} 
                  onChange={(e) => handleResponsiveStyle('lineHeight', 'md', e?.target?.value)}
                  placeholder="pc" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
            </HStack>
          </Flex>
          <Flex>
            <HStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">Font Size SP</Text>
                <Input 
                  value={data?.styles?.fontSize?.base} 
                  onChange={(e) => handleResponsiveStyle('fontSize', 'base', e?.target?.value)}
                  placeholder="sp" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">Font Size PC</Text>
                <Input 
                  value={data?.styles?.fontSize?.md} 
                  onChange={(e) => handleResponsiveStyle('fontSize', 'md', e?.target?.value)}
                  placeholder="pc" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
            </HStack>
          </Flex>
          <Flex>
            <HStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">pt SP</Text>
                <Input 
                  value={data?.styles?.marginTop?.base} 
                  onChange={(e) => handleResponsiveStyle('marginTop', 'base', e?.target?.value)}
                  placeholder="sp" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">pt PC</Text>
                <Input 
                  value={data?.styles?.marginTop?.md} 
                  onChange={(e) => handleResponsiveStyle('marginTop', 'md', e?.target?.value)}
                  placeholder="pc" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
            </HStack>
          </Flex>
          <Flex>
            <HStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">pb SP</Text>
                <Input 
                  value={data?.styles?.marginBottom?.base} 
                  onChange={(e) => handleResponsiveStyle('marginBottom', 'base', e?.target?.value)}
                  placeholder="sp" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">pb PC</Text>
                <Input 
                  value={data?.styles?.marginBottom?.md} 
                  onChange={(e) => handleResponsiveStyle('marginBottom', 'md', e?.target?.value)}
                  placeholder="pc" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
            </HStack>
          </Flex>
          <HStack spacing={5}>
            <Popover>
              <PopoverTrigger>
                <HStack align="center" spacing={2} >
                  <Text>Color: </Text>
                  <Box border="1px solid" cursor="pointer" boxSize={3} bg={colorPicker?.color}  />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <SketchPicker 
                    color={colorPicker?.color}  
                    onChange={(color) => {
                      setData(prev => ({ ...prev, styles: { ...prev?.styles, color: color.hex } }))
                      setColorPicker(prev => ({ ...prev, color: color.hex }))
                    }}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <IconButton
              active={data?.styles?.fontStyle === "italic"}
              onClick={() => handleSetStyle('fontStyle', 'italic')}
            ><i className="fa-solid fa-italic"></i></IconButton>
            <IconButton
              active={data?.styles?.fontWeight === "bold"}
              onClick={() => handleSetStyle('fontWeight', 'bold')}
            ><i className="fa-solid fa-bold"></i></IconButton>
            <IconButton
              active={data?.styles?.textDecoration === "underline"}
              onClick={() => handleSetStyle('textDecoration', 'underline')}
            ><i className="fa-solid fa-underline"></i></IconButton>
            <IconButton 
              active={data?.align === "flex-start"}
              onClick={() => setData(prev => ({ ...prev, align: 'flex-start' }))}
            ><i className="fa-solid fa-align-left"></i></IconButton>
            <IconButton
              active={data?.align === "center"}
              onClick={() => setData(prev => ({ ...prev, align: 'center' }))}
            ><i className="fa-solid fa-align-center"></i></IconButton>
            <IconButton
              active={data?.align === "flex-end"}
              onClick={() => setData(prev => ({ ...prev, align: 'flex-end' }))}
            ><i className="fa-solid fa-align-right"></i></IconButton>
          </HStack>
        </Flex>
      </Collapse>
    </Box>
  )
}