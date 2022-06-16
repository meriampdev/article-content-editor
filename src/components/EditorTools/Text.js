import { useState, useEffect } from "react"
import { 
  Collapse,
  Button,
  Box, 
  Flex, 
  Input,
  HStack,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { SketchPicker } from 'react-color';
import { AddLinkModal } from "components/AddLinkModal"
import { IconButton } from "components/IconButton"
import { ELEMENT_DEFAULT_DATA } from "constants/tools"
import { toggleStyle } from "utils/styleHelper"

export const TextStyles = ({ item_id, tool_id, collapse, data, setData }) => {
  const elementID = `section-${item_id}`
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [colorPicker, setColorPicker] = useState({
    display: false,
    color: data?.styles?.color ?? "#151515"
  })
  const [selection, setSelection] = useState(null)
  const [appendTarget, setAppendTarget] = useState(null)

  useEffect(() => {
    const divArea = document.getElementById(elementID)
    if(!!divArea) {
      divArea.addEventListener('mousedown', (event) => {
        addSelfDestructiveEventListener(document, 'mouseup', function() {
          highlighted(event)
        })
      })
    }
  // eslint-disable-next-line
  }, [])
  
  const highlighted = (event) => {
    var selected = '';
    if (window.getSelection) {
      selected = window.getSelection();
    }
    else if (document.getSelection) {
      selected = document.getSelection();
    }
    else if (document.selection) {
      selected = document.selection.createRange()
    } else return;

    const range = selected.getRangeAt(0);
    setAppendTarget(range)

    if (!selected.rangeCount) return;
    setSelection(range)
  }

  const addSelfDestructiveEventListener = (element, eventType, callback) => {
    let handler = () => {
        callback();
        element.removeEventListener(eventType, handler);
    };
    element.addEventListener(eventType, handler);
  };

  const setStyle = (styleKey, styleValue) => {
    if(!selection) {
      handleSetStyle(styleKey, styleValue)
      return
    }
    if(selection?.startContainer?.data !== selection?.endContainer?.data) {
      var selectionContents = selection.extractContents();
      const fragment = document.createDocumentFragment()
      selectionContents?.childNodes?.forEach((item) => {
        item.style.fontSize = 'inherit'
        let currentValue = item?.style ? item?.style[styleKey] : ''
        if(styleKey !== "color") {
          item.style[styleKey] = toggleStyle(styleKey, currentValue)
        } else {
          item.style["color"] = styleValue 
        }
      })
      
      fragment.appendChild(selectionContents);
      selection.insertNode(fragment);
    } else {
     
      let selectedText = selection?.toString()
      if(selectedText === selection?.endContainer?.wholeText) {
        let selectionContents = selection.extractContents();
        const fragment = document.createDocumentFragment()
        let currentValue = selection.endContainer.parentNode.style[styleKey]
        if(styleKey !== "color") {
          selection.endContainer.parentNode.style[styleKey] = toggleStyle(styleKey, currentValue)
        } else {
          selection.endContainer.parentNode.style["color"] = styleValue 
        }

        fragment.appendChild(selectionContents);
        selection.insertNode(fragment);
      } else {
        selection.extractContents();
        let span = document.createElement('span')
        if(styleKey !== "color") {
          span.style[styleKey] = toggleStyle(styleKey, '')
        } else {
          span.style["color"] = styleValue 
        }
        span.textContent = selectedText

        selection.insertNode(span);
      }
    }
  }

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
    <Box boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" minW={collapse ? "20vw" : "unset"}>
      <Collapse mt={4} in={collapse} >
        <Box p={2}>
          <Button size="xs" onClick={() => setData(ELEMENT_DEFAULT_DATA[tool_id])}>Reset</Button>
          <Flex flexWrap="wrap" justifyContent="space-evenly">
            <IconButton
              active={data?.styles?.fontStyle === "italic"}
              onClick={() => setStyle('fontStyle', 'italic')}
            ><i className="fa-solid fa-italic"></i></IconButton>
            <IconButton
              active={data?.styles?.fontWeight === "bold"}
              onClick={() => setStyle('fontWeight', 'bold')}
            ><i className="fa-solid fa-bold"></i></IconButton>
            <IconButton
              active={data?.styles?.textDecoration === "underline"}
              onClick={() => setStyle('textDecoration', 'underline')}
            ><i className="fa-solid fa-underline"></i></IconButton>
            <AddLinkModal 
              appendTarget={appendTarget}
              setAppendTarget={setAppendTarget}
            />
            <Flex justifyContent="space-evenly">
              <IconButton 
                active={data?.styles?.textAlign === "left"}
                onClick={() => handleSetStyle('textAlign', 'left')}
              ><i className="fa-solid fa-align-left"></i></IconButton>
              <IconButton
                active={data?.styles?.textAlign === "center"}
                onClick={() => handleSetStyle('textAlign', 'center')}
              ><i className="fa-solid fa-align-center"></i></IconButton>
              <IconButton
                active={data?.styles?.textAlign === "right"}
                onClick={() => handleSetStyle('textAlign', 'right')}
              ><i className="fa-solid fa-align-right"></i></IconButton>
            </Flex>
          </Flex>
          <Flex>
            <Popover
              isOpen={isOpen}
              onClose={onClose}
              placement='right'
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <HStack align="center" spacing={2} >
                  <Text>Color: </Text>
                  <Box onClick={onToggle} cursor="pointer" boxSize={3} bg={colorPicker?.color}  />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <SketchPicker 
                    color={colorPicker?.color}  
                    onChange={(color) => {
                      setColorPicker(prev => ({ ...prev, color: color.hex }))
                      if(selection) {
                        setStyle('color', color.hex)
                      } else {
                        setData(prev => ({ ...prev, styles: { ...prev?.styles, color: color.hex } }))
                      }
                    }}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
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
                <Text fontSize="xs">pt SP</Text>
                <Input 
                  value={data?.styles?.paddingTop?.base} 
                  onChange={(e) => handleResponsiveStyle('paddingTop', 'base', e?.target?.value)}
                  placeholder="sp" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">pt PC</Text>
                <Input 
                  value={data?.styles?.paddingTop?.md} 
                  onChange={(e) => handleResponsiveStyle('paddingTop', 'md', e?.target?.value)}
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
                  value={data?.styles?.paddingBottom?.base} 
                  onChange={(e) => handleResponsiveStyle('paddingBottom', 'base', e?.target?.value)}
                  placeholder="sp" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
              <VStack alignItems="flex-start">
                <Text fontSize="xs">pb PC</Text>
                <Input 
                  value={data?.styles?.paddingBottom?.md} 
                  onChange={(e) => handleResponsiveStyle('paddingBottom', 'md', e?.target?.value)}
                  placeholder="pc" 
                  size="xs" 
                  mt="0.2rem !important" 
                />
              </VStack>
            </HStack>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  )
}