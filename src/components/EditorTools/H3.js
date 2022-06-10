import { Heading3 as Heading } from "components/ElementTemplate/H3"
import { Box } from "@chakra-ui/react"
import { RemoveElement } from "components/RemoveElement"

export const Heading3 = ({ data, mode, handleRemove }) => {

  return (
    <Box pos="relative">
      <Heading data={data} editable={mode === "edit"} />
      <RemoveElement mode={mode} handleRemove={handleRemove} />
    </Box>
  )
}