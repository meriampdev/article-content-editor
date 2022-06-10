import { Heading1 as Heading } from "components/ElementTemplate/H1"
import { Box } from "@chakra-ui/react"
import { RemoveElement } from "components/RemoveElement"

export const Heading1 = ({ data, mode, handleRemove }) => {

  return (
    <Box pos="relative">
      <Heading data={data} editable={mode === "edit"} />
      <RemoveElement mode={mode} handleRemove={handleRemove} />
    </Box>
  )
}