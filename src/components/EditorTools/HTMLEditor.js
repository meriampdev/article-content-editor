import { useState } from "react"
import AceEditor from "react-ace";
import { Flex, Box, Collapse } from "@chakra-ui/react"
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"
import { Rnd } from "react-rnd";
import { IconButton } from "components/IconButton"
import { ContentBody } from "components/ElementTemplate/ContentBody"
import { RemoveElement } from "components/RemoveElement"

export const HTMLEditor = ({ data, mode, handleRemove }) => {
  const [value, setValue] = useState(data ?? "Edit This")
  const [collapse, setCollapse] = useState(true && !data)

  return (
    <Box pos="relative" background={collapse ? "yellow" : "unset"}>
      <ContentBody
        data={value}
        mode={mode}
        className="section"
      />
      <RemoveElement mode={mode} handleRemove={handleRemove} />
      <Box 
        pos="absolute"
        top="0"
        right="-1vw"
        height="100%"
        zIndex="100"
        bg="#FFF"
      >
        <Rnd dragHandleClassName="drag-handle" enableResizing={false}>
          <Flex alignItems="flex-start" flexDir="column" minW="50vw">
            <Flex>
              <IconButton onClick={() => {
                if(!value) {
                  setCollapse(true)
                  return
                } 
                setCollapse(!collapse)
              }} className="drag-handle">
                <i className="fa-solid fa-pen"></i>
              </IconButton>
            </Flex>
            <Collapse mt={4} in={collapse} >
              <Box>
                <AceEditor
                  width="45vw"
                  placeholder="Placeholder Text"
                  mode="javascript"
                  theme="monokai"
                  name="blah2"
                  onChange={(newValue) => setValue(newValue)}
                  fontSize={14}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={value}
                  setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}/>
              </Box>
            </Collapse>
          </Flex>
        </Rnd>
      </Box>
    </Box>
  )
}