import { Box } from "@chakra-ui/react"
import { RemoveElement } from "components/RemoveElement"
import { ContentBody as Content } from "components/ElementTemplate/ContentBody"

export const ContentBody = ({ data, mode, handleRemove }) => {
  return (
    <Box pos="relative">
      <Content 
        data={data}
        mode={mode}
        className="editable-div content-text"
      />
      <RemoveElement mode={mode} handleRemove={handleRemove} />
    </Box>
  )
}