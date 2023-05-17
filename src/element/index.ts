import * as fabric from "fabric"
import type { FabricObject } from "fabric/dist/src/shapes/Object/FabricObject"
import type { BlockInfo } from "~/components/core/components"
import { ComponentType } from "~/constants/enum"
import {renderText} from "~/element/TextElement"

export {fabric}

export interface RenderEleArgs {
  canvas: fabric.Canvas,
  block: BlockInfo
}

export const renderElement = ({
  canvas,
  block,
}: RenderEleArgs): FabricObject => {
  switch (block.type) {
    case ComponentType.Text:
      return renderText({canvas, block})
    default:
      return null
  }
}