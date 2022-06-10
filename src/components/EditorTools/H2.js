import { Heading2 as Heading } from "components/ElementTemplate/H2"
import { Box } from "@chakra-ui/react"
import { RemoveElement } from "components/RemoveElement"

export const Heading2 = ({ data, mode, handleRemove }) => {

  return (
    <Box pos="relative">
      <Heading data={data} editable={mode === "edit"} />
      <RemoveElement mode={mode} handleRemove={handleRemove} />
    </Box>
  )
}