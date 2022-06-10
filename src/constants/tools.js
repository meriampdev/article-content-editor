import {
  ButtonTool,
  HTMLEditor,
  ImageTool
} from "components/EditorTools"
import { LineBreak } from "components/ElementTemplate/LineBreak"
import { Heading1 } from "components/ElementTemplate/H1"
import { Heading2 } from "components/ElementTemplate/H2"
import { Heading3 } from "components/ElementTemplate/H3"
import { Heading4 } from "components/ElementTemplate/H4"
import { ContentBody } from "components/ElementTemplate/ContentBody"
import { RenderContent } from "components/RenderContent"

export const TOOLIDS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "content-text",
  "image", 
  "section",
  "button-link",
  "line-break"
]

export const TOOL_ICONS = {
  "h1": <RenderContent tool_id="h1" mode="tool" />,
  "h2": <RenderContent tool_id="h2" mode="tool" />,
  "h3": <RenderContent tool_id="h3" mode="tool" />,
  "h4": <RenderContent tool_id="h4" mode="tool" />,
  "content-text": <RenderContent tool_id="content-text" mode="tool" />,
  "image": <i className="fa-solid fa-image"></i>,
  "section": <i className="fa-solid fa-code"></i>,
  "button-link": <i className="fa-solid fa-link"></i>,
  "line-break": <span>br</span>
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
  { id: "line-break", Component: LineBreak }
]

export const TOOLCOMPONENT = {
  "h1": Heading1,
  "h2": Heading2,
  "h3": Heading3,
  "h4": Heading4,
  "content-text": ContentBody,
  "image": ImageTool,
  "section": HTMLEditor,
  "button-link": ButtonTool,
  "line-break": LineBreak
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
  "line-break": "line-break"
}