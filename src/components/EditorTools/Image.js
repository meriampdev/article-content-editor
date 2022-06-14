import { Box, Flex, Input, Collapse } from "@chakra-ui/react"
import { IconButton } from "components/IconButton"

export const ImageTool = ({ collapse, data, setData }) => {
  return (
    <Box boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" minW={collapse ? "25vw" : "unset"}>
      <Collapse mt={4} in={collapse} >
        <Flex flexDir="column" gridGap={2} width="30vw" p={2}>
          <Input 
            placeholder="Image source" 
            value={data?.src}
            onChange={(e) => setData(prev => ({ ...prev, src: e?.target?.value }))}
          />
          <Flex gridGap={2}>
            <Input 
              placeholder="Width SP" 
              value={data?.width?.base}
              onChange={(e) => setData(prev => ({ ...prev, width: { ...prev?.width, base: e?.target?.value } }))}
            />
            <Input 
              placeholder="Width PC" 
              value={data?.width?.md}
              onChange={(e) => setData(prev => ({ ...prev, width: { ...prev?.width, md: e?.target?.value } }))}
            />
          </Flex>
          <Flex justifyContent="space-evenly">
            <IconButton 
              active={data?.align === "flex-start"}
              onClick={() => setData(prev => ({ ...prev, align: "flex-start" }))}
            ><i className="fa-solid fa-align-left"></i></IconButton>
            <IconButton
              active={data?.align === "center"}
              onClick={() => setData(prev => ({ ...prev, align: "center" }))}
            ><i className="fa-solid fa-align-center"></i></IconButton>
            <IconButton
              active={data?.align === "flex-end"}
              onClick={() => setData(prev => ({ ...prev, align: "flex-end" }))}
            ><i className="fa-solid fa-align-right"></i></IconButton>
          </Flex>
        </Flex>
      </Collapse>
    </Box>
  )
}