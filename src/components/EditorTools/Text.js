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
    divArea.addEventListener('input', (e) => {
      let childNodes = e?.target?.childNodes
      childNodes.forEach((node, i) => {
        node.addEventListener('mousedown', function(event) {
          // This will only run the event once and then remove itself
          addSelfDestructiveEventListener(document, 'mouseup', function() {
            mySelection(i, event)
          })
        });
      })
    })
  }, [])

  const addSelfDestructiveEventListener = (element, eventType, callback) => {
    let handler = () => {
        callback();
        element.removeEventListener(eventType, handler);
    };
    element.addEventListener(eventType, handler);
  };

  const mySelection = (nodeIndex, event) => {
    var sel = document.getSelection();
    let startPos = sel?.anchorOffset;
    let endPos = sel?.extentOffset;
    let wholeString = sel?.focusNode?.wholeText
    let selectedText = sel?.focusNode?.wholeText?.substring(startPos, endPos);
  
    // if highlighted backwards
    if(startPos > endPos) {
      startPos = sel?.extentOffset 
      endPos = sel?.anchorOffset
    }

    if(sel?.type === "Caret") {
      setAppendTarget(event?.target)
    }

    if(selectedText?.length <= 0) {
      setSelection(null)
      return; // stop here if selection length is <= 0
    }

    const parentNodeName = sel?.focusNode?.parentNode?.localName
    const selData = { 
      startPos, 
      endPos, 
      selectedText, 
      wholeString, 
      nodeIndex, 
      parentNodeName,
      focusNode: sel?.focusNode,
      target: event?.target
    }
    
    if(selectedText) {
      setSelection(selData)
    } 
  };

  const handleSetStyle = (styleKey, styleValue) => {
    if(selection) {
      let s1 = selection?.wholeString?.substring(0, selection?.startPos)
      let s2 = selection?.wholeString?.substring(selection?.endPos, selection?.wholeString?.length)
      const divArea = document.getElementById(elementID)
      if(divArea?.childNodes) {
        let insert = ''
        let fontweight = selection?.target?.parentNode?.dataset?.fontweight
        let fontstyle = selection?.target?.parentNode?.dataset?.fontstyle
        let decoration = selection?.target?.parentNode?.dataset?.decoration
        let color = styleValue
        let customized = selection?.target?.parentNode?.dataset?.customized
        if(styleKey !== "color") {
          if(styleValue === "bold") {
            if(fontweight === "bold") {
              fontweight = "normal"
            } else {
              fontweight = "bold"
            }
          } else if(styleValue === "italic") {
            if(fontstyle === "italic") {
              fontstyle = "normal"
            } else {
              fontstyle = "italic"
            }
          } else if(styleValue === "underline") {
            if(decoration === "underline") {
              decoration = "none"
            } else {
              decoration = "underline"
            }
          } 
        } 

        let style = `color: ${color}; font-weight: ${fontweight}; font-style: ${fontstyle}; text-decoration: ${decoration};`
        if(customized) {
          selection.target.parentNode.dataset.fontweight = fontweight
          selection.target.parentNode.dataset.fontstyle = fontstyle
          selection.target.parentNode.dataset.decoration = decoration
          selection.target.parentNode.style.fontWeight = fontweight
          selection.target.parentNode.style.fontStyle = fontstyle
          selection.target.parentNode.style.color = color
          selection.target.parentNode.style.textDecoration = decoration
          setSelection(null)
          return
        } else {
          let text = selection?.parentNodeName === "a" ? selection?.target?.innerHTML : selection?.selectedText
          insert = `<span style="${style}" data-color=${color} data-customized=true data-fontweight=${fontweight} data-fontstyle=${fontstyle} data-decoration=${decoration}><span>${text}</span></span>`
        }

        let newHTML = `<span>${s1}${insert}${s2}</span>`
        if(selection?.parentNodeName === "a") {
          newHTML = insert
        } 
        
        selection.focusNode.nodeValue = ""
        if(!!selection?.focusNode?.previousSibling || !!selection?.focusNode?.nextSibling) {
          if(!selection?.focusNode?.previousSibling) {
            selection.focusNode.nextSibling.insertAdjacentHTML("beforebegin", newHTML)
          } else {
            selection.focusNode.previousSibling.insertAdjacentHTML("afterend", newHTML)
          }
        } else {
          selection.target.innerHTML = newHTML
        }
      }
      setSelection(null)
    } else {
      let value = data?.styles ? data?.styles[styleKey] !== styleValue ? styleValue : '' : styleValue
      setData(prev => ({ ...prev, styles: { ...prev?.styles, [styleKey]: value } }))
    }
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
                        handleSetStyle('color', color.hex)
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