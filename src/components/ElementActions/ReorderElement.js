import { useState } from "react"
import { 
  Box,
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
    >
      <PopoverTrigger>
        <Box onClick={onToggle} cursor="pointer" color="#1CBF73" _hover={{ opacity: 0.8 }}>
          <i className="fa-solid fa-arrow-down-9-1"></i>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <NumberInput 
            allowMouseWheel={true} 
            min={0}
            max={contents?.length}
            value={toIndex}
            onChange={handleInputChange}
          >
            <NumberInputField 
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