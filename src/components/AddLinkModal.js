import { useEffect, useState } from "react"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure
} from '@chakra-ui/react'
import { IconButton } from "components/IconButton"

export const AddLinkModal = ({ appendTarget, setAppendTarget }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [link, setLink] = useState({
    text: appendTarget?.toString(),
    link: "",
    target: "_blank"
  })

  useEffect(() => {
    let selectedText = appendTarget?.toString()
    if(selectedText) {
      setLink(prev => ({ ...prev, text: selectedText }))
    }
  }, [appendTarget])

  const pasteHtmlAtCaret = () => {
    appendTarget.extractContents();
    let span = document.createElement('span')
    span.style.fontWeight = "bold"
    let a = document.createElement('a');
    let linkText = document.createTextNode(link?.text);
    a.appendChild(linkText);
    a.title = link?.text;
    a.href = link?.link;
    a.target = link?.target

    span.appendChild(a)

    appendTarget.insertNode(span);
    
    setLink({ text: "", link: "", target: "_blank" })
    onClose()
  }

  return (
    <>
      <IconButton onClick={onOpen}><i className="fa-solid fa-link"></i></IconButton>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Text</FormLabel>
              <Input value={link?.text} onChange={(e) => setLink(prev => ({ ...prev, text: e?.target?.value }))} placeholder='Text' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input value={link?.link} onChange={(e) => setLink(prev => ({ ...prev, link: e?.target?.value }))} placeholder='Link' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Target</FormLabel>
              <Select 
                size="xs"
                placeholder='Select target'
                value={link?.target}
                onChange={(e) => setLink(prev => ({ ...prev, target: e?.target?.value }))}
              >
                <option value='_blank'>_blank</option>
                <option value='_parent'>_parent</option>
                <option value='_self'>_self</option>
                <option value='_top'>_top</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={pasteHtmlAtCaret} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}