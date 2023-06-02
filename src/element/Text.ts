import type { TextBlock } from "~/components/core/components"
import type { RenderEleArgs } from ".";
import { fabric } from "."

interface TextRenderEleArgs extends RenderEleArgs {
  block: TextBlock
}

export const renderText = ({ canvas, block }: TextRenderEleArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {type, ...styles} = block
  const textElement = new fabric.Textbox(block.text!, {
    ...styles
  })

  // 禁止用户垂直缩放
  textElement.setControlVisible('mt', false)
  textElement.setControlVisible('mb', false)

  canvas.add(textElement)
  return textElement
}