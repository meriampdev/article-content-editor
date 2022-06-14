import {
  ButtonTool,
  HTMLEditor,
  ImageTool,
  FlexboxTool,
  TextStyles
} from "components/EditorTools"
import { ButtonLink } from "components/ElementTemplate/ButtonLink"
import { ContentBody } from "components/ElementTemplate/ContentBody"
import { Heading1 } from "components/ElementTemplate/H1"
import { Heading2 } from "components/ElementTemplate/H2"
import { Heading3 } from "components/ElementTemplate/H3"
import { Heading4 } from "components/ElementTemplate/H4"
import { ContentImage } from "components/ElementTemplate/Image"
import { LineBreak } from "components/ElementTemplate/LineBreak"

export const TOOLIDS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "content-text",
  "image", 
  "section",
  "button-link",
  "line-break",
  // "flex-box"
]

export const TOOL_ICONS = {
  "h1": <Heading1 />,
  "h2": <Heading2 />,
  "h3": <Heading3 />,
  "h4": <Heading4 />,
  "content-text": <ContentBody />,
  "image": <i className="fa-solid fa-image"></i>,
  "section": <i className="fa-solid fa-code"></i>,
  "button-link": <i className="fa-solid fa-link"></i>,
  "line-break": <span>br</span>,
  "flex-box": <i className="fa-solid fa-grip"></i>
}

export const TOOLS = [
  { id: "h1", Component: Heading1 },
  { id: "h2", Component: Heading2 },
  { id: "h3", Component: Heading3 },
  { id: "h4", Component: Heading4 },
  { id: "content-text", Component: ContentBody },
  { id: "image", Component: ImageTool },
  { id: "section", Component: HTMLEditor },
  { id: "button-link", Component: ButtonTool },
  { id: "line-break", Component: LineBreak },
  { id: "flex-box", Component: FlexboxTool }
]

export const ELEMENT_TEMPLATE = {
  "h1": Heading1,
  "h2": Heading2,
  "h3": Heading3,
  "h4": Heading4,
  "content-text": ContentBody,
  "image": ContentImage,
  "section": ContentBody,
  "button-link": ButtonLink,
  "line-break": LineBreak,
  "flex-box": FlexboxTool
}

export const ELEMENT_TOOL = {
  "h1": TextStyles,
  "h2": TextStyles,
  "h3": TextStyles,
  "h4": TextStyles,
  "content-text": TextStyles,
  "image": ImageTool,
  "section": HTMLEditor,
  "button-link": ButtonTool,
  "line-break": LineBreak,
  "flex-box": FlexboxTool
}

export const TOOLCOMPONENT = {
  "h1": Heading1,
  "h2": Heading2,
  "h3": Heading3,
  "h4": Heading4,
  "content-text": ContentBody,
  "image": ImageTool,
  "section": HTMLEditor,
  "button-link": ButtonTool,
  "line-break": LineBreak,
  "flex-box": FlexboxTool
}

export const EDITING_TOOL = {
  "text": Heading1,
  "image": ImageTool,
  "html": HTMLEditor,
  "button-link": ButtonTool,
  "flex-box": FlexboxTool
}

export const ELEMENT_DEFAULT_DATA = {
  "h1": {
    text: "H1",
    styles: {
      fontSize: {base: "5.6410vw", md: "2.0833vw"},
      lineHeight: {base: "normal", md: "normal"},
      color: "#151515"
    }
  },
  "h2": {
    text: "H2",
    styles: {
      fontSize: {base: "5.1282vw", md: "1.7708vw"},
      lineHeight: {base: "normal", md: "normal"},
      color: "#151515"
    }
  },
  "h3": {
    text: "H3",
    styles: {
      fontSize: {base: "4.6153vw", md: "1.4583vw"},
      lineHeight: {base: "normal", md: "normal"},
      color: "#151515"
    }
  },
  "h4": {
    text: "H4",
    styles: {
      fontSize: {base: "4.1025vw", md: "1.25vw"},
      lineHeight: {base: "normal", md: "normal"},
      color: "#151515"
    }
  },
  "content-text": {
    text: "Text",
    styles: {
      fontSize: {base: "3.5897vw", md: "0.9375vw"},
      lineHeight: {base: "11.5vw", md: "1.875vw"},
      color: "#151515"
    }
  },
  "image": {
    align: "flex-start",
    width: { base: "100%", md: "100%" },
    src: "https://img.stg.skettt.com/images/watanabe/topics/3/image.png"
  },
  "section": {
    content: "text",
    styles: {
      fontSize: {base: "4.1025vw", md: "1.25vw"},
      lineHeight: {base: "11.5vw", md: "1.875vw"},
      color: "#151515"
    }
  },
  "button-link": { 
    text: "Button Link", 
    link: "https://example.com/", 
    align: 'flex-start',
    target: "_blank",
    styles: {
      width: { base: "100%", md: "19.32vw"},
      borderRadius: "none",
      fontSize: { base: "3.07vw", md: "0.83vw"},
      height: { base: "54px", md: "3.33vw" },
      color: "#FFF",
      bg: "#1CBF73"
    }
  },
  "line-break": "line-break",
  "flex-box": "flex-box"
}

export const ELEMENT_TYPE = {
  "h1": "text",
  "h2": "text",
  "h3": "text",
  "h4": "text",
  "content-text": "text",
  "image": "image",
  "section": "text",
  "button-link": "button",
  "line-break": "line-break",
  "flex-box": "flex-box"
}