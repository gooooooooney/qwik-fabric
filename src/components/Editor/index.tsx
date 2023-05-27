import { $, Slot, component$, noSerialize, useContext, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "~/constants/enum";
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
  const shouldShowContextMenu = useSignal(false)
  const contextPosition = useSignal({ left: 0, top: 0 })
  const width = changeStyleWithScale(parentState.canvasStyleData.width, parentState.canvasStyleData.scale)
  const height = changeStyleWithScale(parentState.canvasStyleData.height, parentState.canvasStyleData.scale)
  const contextMenu = [
    {
      name: 'Bring to front',
      value: 'bringToFront',
      onClick: $(() => {
        state.activeElements?.forEach((element => {
          state.canvas.bringToFront(element)
        }))
      }),
    },
    {
      name: 'Send to back',
      value: 'sendToBack',
      onClick: $(() => {

      }),
    },
    {
      name: 'Bring forward',
      value: 'bringForward',
      onClick: $(() => {

      }),
    },
    {
      name: 'Send backward',
      value: 'sendBackwards',
      onClick: $(() => {

      }),
    },
    {
      name: 'Delete',
      value: 'delete',
      onClick: $(() => {

      }),
    },

  ]
  useStylesScoped$(`
  .listItem {
    font-size: 13px;
    line-height: 1;
    color: rgb(87, 70, 175);
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0px 5px 0px 25px;
    position: relative;
    user-select: none;
    outline: none;
  }
  .list {
    min-width: 120px;
    background-color: white;
    border-radius: 6px;
    padding: 5px;
    box-shadow: rgba(22, 23, 24, 0.35) 0px 10px 38px -10px, rgba(22, 23, 24, 0.2) 0px 10px 20px -15px;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }
  .listWrapper {
    position: absolute;
    left: 0px;
    top: 0px;
    min-width: max-content;
    will-change: transform;
    z-index: 999;
    
  }
  `)
  useVisibleTask$(() => {
    emitter.on(CANVAS_EVENT_SELECTED.ONE, () => {
      const active = state.canvas!.getActiveObject()!
      state.activeElements = noSerialize([active])
      const block = state.blocks.find(block => block.id == active?.get('id'))
      if (block) {
        state.updateCurrentBlock([block])
      }
    })
    emitter.on(CANVAS_EVENT_SELECTED.MULTIPLY, () => {
      const actives = state.canvas!.getActiveObjects()!
      state.activeElements = noSerialize(actives)
      // 找出当前选中的所有block
      const blocks = state.blocks.filter(block => actives.some(active => block.id == active?.get('id')))
      state.updateCurrentBlock(blocks)
    })

    emitter.on(CANVAS_EVENT_SELECTED.NONE, () => {
      shouldShowContextMenu.value = false
    })

    emitter.on(Canvas_Event_Object.CONTENT_MENU, (target: fabric.TPointerEventInfo<fabric.TPointerEvent>['target']) => {
      // 如果有选中的元素，就显示右键菜单
      const hasActiveEle = state.activeElements && state.activeElements.length > 0
      if (target && hasActiveEle) {
        shouldShowContextMenu.value = true
        contextPosition.value = {
          left: target.left + target.width,
          top: target.top + target.height / 2,
        }
      }
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
      state.currentBlock!.forEach(block => {
        block.canvasStyle.fill = colors[0]
      })
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
      state.activeElements?.forEach((element) => {
        setGradient(element, {
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
      })

      state.currentBlock.forEach(block => {
        block.canvasStyle.fill = colors.join(',')
      })
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
        shadow={state.currentBlock[0]?.canvasStyle?.shadow || null}
        onShadowValueChange$={(shadow) => {
          state.currentBlock!.forEach((block) => {
            block.canvasStyle.shadow = shadow
          })
          state.activeElements?.forEach((element) => {
            element.set('shadow', shadow)
          })
          state.canvas?.renderAll()
        }}
        fill={state.currentBlock[0]?.canvasStyle.fill!.split(',') || state.canvasStyleData.backgroundColor.split(",")}
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
      <div class="mt-4 bg-white relative">
        {shouldShowContextMenu.value && <div class="fixed top-0 right-0 left-0 bottom-0" onClick$={() => shouldShowContextMenu.value = false} />}

        <div style={{
          display: shouldShowContextMenu.value ? 'block' : 'none',
          left: contextPosition.value.left + 'px',
          top: contextPosition.value.top + 'px',
        }} class="listWrapper">

          <div class="text-[rgb(87,70,175)] list shadow-radix ">
            {
              contextMenu.map(menu => (
                <div
                  key={menu.name}
                  class="listItem  duration-50 hover:(bg-[rgb(110,86,207)] text-white!)"
                  onClick$={() => {
                    menu.onClick()
                  }}
                >
                  {menu.name}
                </div>
              )
              )
            }

          </div>
        </div>

        <Slot />
      </div>
    </div>
  );
})