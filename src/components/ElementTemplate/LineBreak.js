import { Box } from "@chakra-ui/react"
import { RemoveElement } from "components/RemoveElement"

export const LineBreak = ({ mode, handleRemove }) => {
  return (
    <Box pos="relative">
      <br />
      <RemoveElement mode={mode} handleRemove={handleRemove} />
    </Box>
  )
}