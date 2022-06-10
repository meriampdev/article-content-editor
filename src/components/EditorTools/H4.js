import { Box } from "@chakra-ui/react"
import { Heading4 as Heading } from "components/ElementTemplate/H4"
import { RemoveElement } from "components/RemoveElement"

export const Heading4 = ({ data, mode, handleRemove }) => {

  return (
    <Box pos="relative">
      <Heading data={data} editable={mode === "edit"} />
      <RemoveElement mode={mode} handleRemove={handleRemove} />
    </Box>
  )
}