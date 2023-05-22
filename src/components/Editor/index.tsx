import { Slot, component$, noSerialize, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { CANVAS_EVENT_SELECTED } from "~/constants/enum";
import CommonAttr from "~/integrations/react/radix-ui/CommonAttr";
import type { GlobalState } from "~/store/context";
import { GLOBAL_CONTEXT } from "~/store/context";
import { emitter } from "~/utils/event";
import { setGradient } from "~/utils/fabric";
// import Block from "./Block";
// import { getCanvasStyle, getShapeStyle } from "~/utils/style";
import { changeStyleWithScale } from "~/utils/translate";
// import Shape from "./Shape";

interface EditorProps {
  parentState: GlobalState
}
export default component$(({ parentState }: EditorProps) => {
  const state = useContext(GLOBAL_CONTEXT)
  const width = changeStyleWithScale(parentState.canvasStyleData.width, parentState.canvasStyleData.scale)
  const height = changeStyleWithScale(parentState.canvasStyleData.height, parentState.canvasStyleData.scale)
  useVisibleTask$(() => {
    emitter.on(CANVAS_EVENT_SELECTED.ONE, () => {
      const active = state.canvas!.getActiveObject()!
      state.activeElements = noSerialize([active])
      const block = state.blocks.find(block => block.id == active?.get('id'))
      if (block) {
        state.updateCurrentBlock(block)
      }
    })
  })
  return (
    <div
      id="editor"
      style={
        {
          width: width + 'px',
          height: height + 'px',
        }
      }
      class="relative  m-a">
      {/* {
        parentState.blocks.map((block) => (
          <Shape
            style={{...getShapeStyle(block.style)}}
            active={block.id == parentState.currentBlock?.id}
            element={block}
            key={block.id}>
            <Block block={block} />
          </Shape>
        ))
      } */}
      {
        state.currentBlock?.type ? <CommonAttr
          fill={state.currentBlock?.canvasStyle.fill.split(',')}
          onChangeColor$={colors => {
            if (colors.length === 1) {
              state.currentBlock!.canvasStyle.fill = colors[0]
              state.activeElements?.forEach((element) => {
                element.set('fill', colors[0])
              })
            } else {
              let lineWidths = state.activeElements && (state.activeElements![0] as any).__lineWidths
              if (Array.isArray(lineWidths)) {
                lineWidths = Math.max(...lineWidths)
              }
              if (!lineWidths) {
                lineWidths = state.activeElements![0].width
              }
              setGradient(state.activeElements![0], {
                coords: {
                  x1: 0,
                  y1: 0,
                  x2: lineWidths,
                  y2: 0,
                },
                colorStops: colors.map((color, index) => ({
                  offset: index / (colors.length - 1),
                  color,
                }))
              })
              state.currentBlock!.canvasStyle.fill = colors.join(',')
            }
            state.canvas?.renderAll()
          }}
        />
          : null
      }

      <div class="mt-4 bg-white">
        <Slot />
      </div>
    </div>
  );
})