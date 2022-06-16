import { useState } from "react"
import { 
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure
} from "@chakra-ui/react"

export const ReorderElement = ({ contents, setContent, currIndex }) => {
  const { onOpen, onClose, isOpen, onToggle } = useDisclosure()
  const [toIndex, setToIndex] = useState("")
  
  const handleReorder = (toIndex) => {
    let moveElement = contents[currIndex]
    let arr = [...contents]
    let cleanarr = arr.filter((f, i) => i !== currIndex)

    // eslint-disable-next-line
    Array.prototype.insert = function ( index, item ) {
      this.splice( index, 0, item );
    }

    let to = toIndex - 1
    cleanarr.insert(to, moveElement)
    setContent(cleanarr)
    onClose()
    setTimeout(() => {
      var element = document.getElementById(moveElement?.item_id);
      if(element) {
        element.scrollIntoView({behavior: "smooth"})
      } 
    }, 100)
  }

  const handleInputChange = (str, num) => {
    if(isNaN(str) || (num > contents?.length)) return 
    setToIndex(str)
  }

  return (  
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      maxW="15vw"
    >
      <PopoverTrigger>
        <Button onClick={onToggle} size="xs">Move To</Button>
      </PopoverTrigger>
      <PopoverContent maxW="12vw">
        <PopoverArrow />
        <PopoverBody>
          <NumberInput 
            allowMouseWheel={true} 
            min={0}
            max={contents?.length}
            value={toIndex}
            onChange={handleInputChange}
            size="sm"
            maxW="10vw"
          >
            <NumberInputField 
              size="xs"
              placeholder="move to position" 
              onKeyDown={(e) => {
                if(e?.key === "Enter") {
                  handleReorder(toIndex)
                }
              }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}