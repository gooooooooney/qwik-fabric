import { $, Slot, component$, noSerialize, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from "~/constants/enum";
import type { fabric } from "~/element";
// import type { GlobalState } from "~/store/context";
import { GLOBAL_CONTEXT } from "~/store/context";
import { emitter } from "~/core/event";
// import { changeStyleWithScale } from "~/utils/translate";
import AlertDialog from "~/integrations/react/radix-ui/AlertDialog/AlertDialog";
import "./index.css"

// interface EditorProps {
//   parentState: GlobalState
// }
export default component$(() => {
  const state = useContext(GLOBAL_CONTEXT)
  const shouldShowContextMenu = useSignal(false)
  const shouldShowAlertDialog = useSignal(false)
  const contextPosition = useSignal({ left: 0, top: 0 })
  // const width = changeStyleWithScale(parentState.canvasStyleData.width, parentState.canvasStyleData.scale)
  // const height = changeStyleWithScale(parentState.canvasStyleData.height, parentState.canvasStyleData.scale)
  const contextMenu = [
    {
      name: 'Bring to front',
      value: 'bringToFront',
      onClick: $(() => {
        state.activeElements?.forEach((element => {
          // FABRICV6: https://github.com/fabricjs/fabric.js/issues/8299
          state.canvas?.bringObjectToFront(element)
        }))
      }),
    },
    {
      name: 'Send to back',
      value: 'sendToBack',
      onClick: $(() => {
        state.activeElements?.forEach((element => {
          state.canvas?.sendObjectToBack(element)
        }))
      }),
    },
    {
      name: 'Bring forward',
      value: 'bringForward',
      onClick: $(() => {
        state.activeElements?.forEach((element => {
          state.canvas?.bringObjectForward(element)
        }))
      }),
    },
    {
      name: 'Send backward',
      value: 'sendBackwards',
      onClick: $(() => {
        state.activeElements?.forEach((element => {
          state.canvas?.sendObjectBackwards(element)
        }))
      }),
    },
    {
      name: 'Delete',
      value: 'delete',
      onClick: $(() => {
        state.activeElements?.forEach((element => {
          state.canvas?.remove(element)
        }))
      }),
    },
    {
      name: 'Clear',
      value: 'clear',
      onClick: $(() => {
        shouldShowAlertDialog.value = true
      }),
    },

  ]
  useVisibleTask$(() => {
    emitter.on(CANVAS_EVENT_SELECTED.ONE, () => {
      const active = state.canvas!.getActiveObject()!
      state.activeElements = noSerialize([active])
      const block = state.blocks.find(block => block.id == active?.get('id'))
      if (block) {
        state.currentBlock = [block]
      }
    })
    emitter.on(CANVAS_EVENT_SELECTED.MULTIPLY, () => {
      const actives = state.canvas!.getActiveObjects()!
      state.activeElements = noSerialize(actives)
      // 找出当前选中的所有block
      const blocks = state.blocks.filter(block => actives.some(active => block.id == active?.get('id')))
      state.currentBlock = blocks
    })

    emitter.on(CANVAS_EVENT_SELECTED.NONE, () => {
      shouldShowContextMenu.value = false
    })

    emitter.on(Canvas_Event_Object.CONTEXT_MENU, (opt: fabric.TPointerEventInfo<fabric.TPointerEvent>) => {
      // 如果有选中的元素，就显示右键菜单
      const hasActiveEle = state.activeElements && state.activeElements.length > 0
      if (opt.target && hasActiveEle) {
        shouldShowContextMenu.value = true
        contextPosition.value = {
          left: opt.pointer.x,
          top: opt.pointer.y
        }
      }
    })
  })
  
  return (
    <div
      id="editor"
      class="relative  m-a">



      <div class=" bg-white relative">
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
                  key={menu.value}
                  class="listItem  duration-50 hover:(bg-[rgb(110,86,207)] text-white!) cursor-pointer"
                  onClick$={() => {
                    menu.onClick?.()
                    shouldShowContextMenu.value = false
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
      <AlertDialog
        open={shouldShowAlertDialog.value}
        onCanceled$={() => {
          shouldShowAlertDialog.value = false
        }}
        onConfirm$={() => {
          shouldShowAlertDialog.value = false
          state.canvas?.clear()
        }} />
    </div>
  );
})