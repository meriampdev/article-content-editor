import { Heading1 as Heading } from "components/ElementTemplate/H1"
import { Box } from "@chakra-ui/react"

export const Heading1 = ({ data, mode }) => {

  return (
    <Box pos="relative">
      <Heading data={data} editable={mode === "edit"} />
    </Box>
  )
}