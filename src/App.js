import React, { useEffect, useState } from "react";
import { 
  Box,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react"
import { Rnd } from "react-rnd";
import { Editor } from "components/Editor"
import { ContentEdit } from "components/Editor/ContentEdit"
import { ELEMENT_TYPE } from "constants/tools"

function App() {
  const [content, setContent] = useState([])
  const [showTopicIdInput, setShow] = useState(false)
  const [topicId, setTopicId] = useState("")
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [cleared, setCleared] = useState(false)
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [dataInput, setDataInput] = useState("")

  useEffect(() => {
    let stored = localStorage.getItem("topic-content")
    let saved = !!stored ? JSON.parse(stored) : []
    setContent(saved)
  }, [])

  const getArray = () => {
    let arr = []
    content.forEach((item) => {
      let el = document.getElementById(item?.item_id)
      let elementType = ELEMENT_TYPE[item?.tool_id]
      if(elementType === "text") {
        let find = el.getElementsByClassName(item.tool_id)[0]
        let styles = find.dataset['styles']
        arr.push({ ...item, data: { text: find.innerHTML, styles } })
      } else if(elementType === "image") {
        let find = el.getElementsByClassName(item.tool_id)[0]
        let src = find?.src 
        let styles = find.dataset['styles']
        let data = {
          align: find.dataset['align'],
          width: {
            base: find.dataset['width_sp'],
            md: find.dataset['width_pc']
          },
          src,
          styles
        }
        arr.push({ ...item, data: data })
      } else if(elementType === "button") {
        let findButton = el.getElementsByClassName(item.tool_id)[0]
        let styles = findButton.dataset['styles']
        let data = {
          link: findButton.dataset['url'],
          align: findButton.dataset['align'],
          text: findButton.dataset['text'],
          target: findButton.dataset['target'],
          styles
        }
        arr.push({ ...item, data: data })
      } else {
        arr.push(item)
      }
    })

    console.log('arr', arr)
    return arr
  }

  const handleGetJsonObject = () => {
    const arr = getArray()

    let arrString = JSON.stringify(arr)
    navigator.clipboard.writeText(arrString)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const handleSave = () => {
    const arr = getArray()
    let arrString = JSON.stringify(arr)
    localStorage.setItem('topic-content', arrString)

    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 1000)
  }

  const clearSaved = () => {
    localStorage.removeItem("topic-content")
    setCleared(true)
    setTimeout(() => {
      setCleared(false)
    }, 1000)
  }

  const handlePreview = () => {
    const arr = getArray()
    let arrString = JSON.stringify(arr)
    localStorage.setItem(`preview-content-${topicId}`, arrString)
    setLoadingPreview(true)
    setTimeout(() => {
      setLoadingPreview(false)
      window.open(`${window.location.origin}/preview/${topicId}`, "_blank")
    }, 1000)
  }

  const handleLoadData = () => {
    let data = !!dataInput ? JSON.parse(dataInput) : []
    setContent(data)
    setDataInput("")
  }

  return (
    <Box minH="100vh" p="0 3vw" pb="25vw">
      <HStack spacing={3} py="0.8vw" mb="1vw" boxShadow="rgba(0, 0, 0, 0.45) 0px 14px 20px -20px">
        <Button 
          size="sm"
          onClick={handleGetJsonObject}
          data-tooltip-show={copied}
          data-tooltip="Copied!"
          data-tooltip-location="bottom"
          data-tooltip-type="success"
        >Get Content</Button>
        <Button 
          size="sm"
          onClick={handleSave}
          disabled={content?.length <= 0}
          pointerEvents={content?.length <= 0 ? "none" : "all"}
          opacity={content?.length <= 0 ? 0.4 : 1}
          data-tooltip-show={saved}
          data-tooltip="Saved!"
          data-tooltip-location="bottom"
          data-tooltip-type="success"
        >Save</Button>
        <Button 
          size="sm"
          onClick={clearSaved}
          disabled={content?.length <= 0}
          pointerEvents={content?.length <= 0 ? "none" : "all"}
          opacity={content?.length <= 0 ? 0.4 : 1}
          data-tooltip-show={cleared}
          data-tooltip="Cleared!"
          data-tooltip-location="bottom"
          data-tooltip-type="success"
        >Clear Saved</Button>
        <Button 
          size="sm"
          onClick={() => setShow(!showTopicIdInput)}
          disabled={content?.length <= 0}
          pointerEvents={content?.length <= 0 ? "none" : "all"}
          opacity={content?.length <= 0 ? 0.4 : 1}
        >Preview</Button>
        {
          showTopicIdInput && 
          <>
            <Input size="sm" maxW="6vw" placeholder="Topic Id" value={topicId} onChange={(e) => setTopicId(e?.target?.value)} />
            <Button 
              size="sm"
              disabled={!topicId}
              onClick={handlePreview}
              isLoading={loadingPreview}
              loadingText="Go"
            >Go</Button>
          </>
        }
        <Button 
          size="sm"
          onClick={handleLoadData}
        >Load Data</Button>
        <Input size="sm" maxW="20vw" placeholder="Load Data" value={dataInput} onChange={(e) => setDataInput(e?.target?.value)} />
      </HStack>
      <ContentEdit contents={content} setContent={setContent} />
      <Box>
        <Rnd 
          dragHandleClassName="drag-handle"
          default={{
            x: 1200,
            y: 0,
          }}
        >
          <Editor count={content.length} setContent={setContent} />
        </Rnd>
      </Box>
    </Box>
  );
}

export default App;
