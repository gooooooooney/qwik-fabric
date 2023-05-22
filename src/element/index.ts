import * as fabric from "fabric"
import type { Object } from "fabric/dist/src/shapes/Object/FabricObject"
import type { BlockInfo } from "~/components/core/components"
import { ComponentType } from "~/constants/enum"
import {renderText} from "~/element/TextElement"
import {renderImage} from "~/element/ImageElement"

export {fabric}

export interface RenderEleArgs {
  canvas: fabric.Canvas,
  block: BlockInfo
}

export const renderElement = ({
  canvas,
  block,
}: RenderEleArgs): Object | null => {
  switch (block.type) {
    case ComponentType.TextBox:
      return renderText({canvas, block})
    case ComponentType.Img:
      return renderImage({canvas, block})
    default:
      return null
  }
}