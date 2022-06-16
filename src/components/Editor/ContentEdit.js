import { Box } from "@chakra-ui/react"
import { RenderContent } from "components/RenderContent"

export const ContentEdit = ({ nested, contents, setContent }) => {
  return (
    <Box py={5} pl={1}>
      <Box 
        id="content-display" 
        bg="#FFF" 
        maxW={{base: "90vw", md: "55.15625vw"}} 
        fontFamily="DIN2014-Regular" 
      >
        {contents.map((item, index) => {
          return (
            <Box 
              key={item.item_id}
              pos="relative" 
              id={item.item_id}
              className="content-row"
            >
              <Box 
                className="content-line"
                pos="absolute"
                top="0"
                left="-1vw"
                height="100%"
                pr={1}
                borderRight="1px solid #1CBF73"
              />
              <RenderContent 
                contents={contents}
                setContent={setContent}
                index={index}
                nested={nested}

                item_id={item.item_id}
                contentData={item?.data}
                tool_id={item?.tool_id} 
                mode="edit" 
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}