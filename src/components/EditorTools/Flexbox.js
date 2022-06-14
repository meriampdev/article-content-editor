import { useState, useEffect } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { Flexbox } from "components/ElementTemplate/Flexbox"

export const FlexboxTool = () => {
  const [state, setState] = useState({
    count: 2,
    align: 'center',
    justify: 'center',
    direction: 'row',
    wrap: 'wrap',
    spacing: 2
  })
  const [itemProps, setItemProps] = useState({
    width: { base: '100%', md: '100%' },
    height: { base: '100%', md: '40%' },
    flex: 1
  })


  return (
    <Box>
      <Flexbox data={{ ...state, itemProps }} />
    </Box>
  )
}