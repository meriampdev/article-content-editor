import { useState } from "react"
import { Box, HStack, VStack } from "@chakra-ui/react"
import { range } from "utils/arrayHelpers"
import { ContentEdit } from "components/Editor/ContentEdit"
import { Rnd } from "react-rnd";
import { Editor } from "components/Editor"

export const Flexbox = (props) => {
  const {
    count,
    align,
    justify,
    direction,
    wrap,
    spacing,
    itemProps
  } = props.data
  const [contents, setContent] = useState([])

  const Wrapper = direction === "row" ? HStack : VStack
  const arr = range(0, count)

  return (
    <Box>
      <Wrapper 
        align={align} 
        justify={justify}
        spacing={spacing}
        wrap={wrap}
      >
        {arr.map((i) => {
          return (
            <Box {...itemProps}>
              Flex {i}
              <ContentEdit nested={true} contents={contents} setContent={setContent} />
              <Rnd 
                dragHandleClassName={`nested-${i}`}
                bounds="parent"
              >
                <Editor 
                  count={contents.length} 
                  setContent={setContent} 
                  dragHandleClass={`nested-${i}`}
                  fontSize={15}
                  boxSize="2vw"
                />
              </Rnd>
            </Box>
          )
        })}
      </Wrapper>
    </Box>
  )
}