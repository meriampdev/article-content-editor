import { Box } from "@chakra-ui/react"
import { Heading4 as Heading } from "components/ElementTemplate/H4"

export const Heading4 = ({ data, mode }) => {

  return (
    <Box pos="relative">
      <Heading data={data} editable={mode === "edit"} />
    </Box>
  )
}