import { Heading2 as Heading } from "components/ElementTemplate/H2"
import { Box } from "@chakra-ui/react"

export const Heading2 = ({ data, mode }) => {

  return (
    <Box pos="relative">
      <Heading data={data} editable={mode === "edit"} />
    </Box>
  )
}