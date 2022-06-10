import { Box } from "@chakra-ui/react"
import { TOOLCOMPONENT } from "constants/tools"

export const RenderContent = ({ 
  data, 
  tool_id, 
  mode, 
  handleRemove, 
  handleReorder,
  index,
  contents
}) => {
  const Component = TOOLCOMPONENT[tool_id]

  return (
    <Box my={2}>
      <Component 
        data={data} 
        mode={mode} 
        handleRemove={handleRemove} 
        handleReorder={handleReorder}
        index={index}
        contents={contents}
      />
    </Box>
  )
}