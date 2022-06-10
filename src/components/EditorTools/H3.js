import { Heading3 as Heading } from "components/ElementTemplate/H3"
import { Box } from "@chakra-ui/react"

export const Heading3 = ({ data, mode }) => {

  return (
    <Box pos="relative">
      <Heading data={data} editable={mode === "edit"} />
    </Box>
  )
}