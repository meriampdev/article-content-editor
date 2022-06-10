import { Box } from "@chakra-ui/react"
import { ContentBody as Content } from "components/ElementTemplate/ContentBody"

export const ContentBody = ({ 
  data, 
  mode
}) => {
  return (
    <Box pos="relative">
      <Content 
        data={data}
        mode={mode}
        className="editable-div content-text"
      />
    </Box>
  )
}