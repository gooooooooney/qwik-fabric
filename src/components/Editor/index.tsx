import { $, Slot, component$, noSerialize, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { CANVAS_EVENT_SELECTED } from "~/constants/enum";
import { fabric } from "~/element";
import CommonAttr from "~/integrations/react/radix-ui/CommonAttr";
import type { GlobalState } from "~/store/context";
import { GLOBAL_CONTEXT } from "~/store/context";
import { emitter } from "~/core/event";
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
    emitter.on(CANVAS_EVENT_SELECTED.MULTIPLY, () => {
      const actives = state.canvas!.getActiveObjects()!
      console.log(actives)
      state.activeElements = noSerialize(actives)
    })
  })
  const setCanvasBackgroundColor = $((colors: string[]) => {
    if (colors.length === 1) {
      state.canvasStyleData.backgroundColor = colors[0]
      state.canvas?.set('backgroundColor', colors[0])
    } else {
      const gradient = new fabric.Gradient({
        coords: {
          x1: 0,
          y1: 0,
          x2: state.canvasStyleData.width,
          y2: 0,
        },
        colorStops: colors.map((color, index) => ({
          offset: index / (colors.length - 1),
          color,
        }))
      })
      state.canvasStyleData.backgroundColor = colors.join(',')
      state.canvas?.set('backgroundColor', gradient)
      state.canvas?.renderAll()
    }
  })
  const setElementColor = $((colors: string[]) => {
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
        lineWidths = state.activeElements?.[0]?.width || 0
      }
      setGradient(state.activeElements?.[0], {
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
      state.currentBlock && (state.currentBlock.canvasStyle.fill = colors.join(','))
    }
    state.canvas?.renderAll()
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

      <CommonAttr
        client:load
        // is show when currentBlock is not null. when currentBlock is null, it means the canvas is selected
        isElement={!!state.activeElements?.length}
        shadow={state.currentBlock?.canvasStyle?.shadow || null}
        onShadowValueChange$={(shadow) => {
          state.currentBlock!.canvasStyle.shadow = shadow
          state.activeElements?.forEach((element) => {
            element.set('shadow', shadow)
          })
          state.canvas?.renderAll()
        }}
        fill={state.currentBlock?.canvasStyle.fill!.split(',') || state.canvasStyleData.backgroundColor.split(",")}
        onChangeColor$={colors => {
          // 没有活跃的block 不存在时，代表选中的是画布
          if (!state.activeElements?.length) {
            setCanvasBackgroundColor(colors)
          } else {
            setElementColor(colors)
          }
          // state.canvas?.renderAll()
        }}
      />

      <div class="mt-4 bg-white">
        <Slot />
      </div>
    </div>
  );
})