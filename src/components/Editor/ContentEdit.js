import { Box } from "@chakra-ui/react"
import { RenderContent } from "components/RenderContent"
import { ElementActions } from "components/ElementActions"

export const ContentEdit = ({ nested, contents, setContent }) => {
  return (
    <Box py={5} pl={10}>
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
              <ElementActions 
                contents={contents}
                setContent={setContent}
                index={index}
                nested={nested}
              />
              <RenderContent 
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