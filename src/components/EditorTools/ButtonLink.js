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

export const ButtonTool = ({ tool_id, collapse, data, setData }) => {
  const [colorPicker, setColorPicker] = useState({
    display: false,
    color: data?.styles?.color ?? "#FFF"
  })
  const [bgColorPicker, setBGColorPicker] = useState({
    display: false,
    color: data?.styles?.bg ?? "#1CBF73"
  })

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
                <Text fontSize="xs">Width SP</Text>
                <Input 
                  value={data?.styles?.width?.base} 
                  onChange={(e) => handleResponsiveStyle('width', 'base', e?.target?.value)}
                  placeholder="sp" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">Width PC</Text>
                <Input 
                  value={data?.styles?.width?.md} 
                  onChange={(e) => handleResponsiveStyle('width', 'md', e?.target?.value)}
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
                <Text fontSize="xs">Height SP</Text>
                <Input 
                  value={data?.styles?.height?.base} 
                  onChange={(e) => handleResponsiveStyle('height', 'base', e?.target?.value)}
                  placeholder="sp" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">Height PC</Text>
                <Input 
                  value={data?.styles?.height?.md} 
                  onChange={(e) => handleResponsiveStyle('height', 'md', e?.target?.value)}
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
          <HStack spacing={5}>
            <Popover>
              <PopoverTrigger>
                <HStack align="center" spacing={2} >
                  <Text>Background: </Text>
                  <Box border="1px solid" cursor="pointer" boxSize={3} bg={bgColorPicker?.color}  />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <SketchPicker 
                    color={bgColorPicker?.color}  
                    onChange={(color) => {
                      setData(prev => ({ ...prev, styles: { ...prev?.styles, bg: color.hex } }))
                      setBGColorPicker(prev => ({ ...prev, color: color.hex }))
                    }}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <HStack align="center" spacing={2} >
                  <Text>Text Color: </Text>
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