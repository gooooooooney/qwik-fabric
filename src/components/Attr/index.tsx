import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { CANVAS_EVENT_SELECTED, ComponentType } from "~/constants/enum";
import { GLOBAL_CONTEXT } from "~/store/context";
import TextAttr from "./TextAttr";
import { emitter } from "~/utils/event";
import { fabric } from "~/element";

export default component$(() => {
  const state = useContext(GLOBAL_CONTEXT)
  // const canvas = state.canvas!
  // const active = useSignal<ReturnType<typeof canvas['getActiveObject']>>({} as any)
  useVisibleTask$(() => {
    emitter.on(CANVAS_EVENT_SELECTED.ONE, () => {
      const active = state.canvas?.getActiveObject()
      if (active instanceof fabric.Textbox) {
        const block = state.blocks.find(block => block.id == active.get('id'))
        if (block) {
          state.updateCurrentBlock(block)
        }
      }
    })
  })
  
  const element = () => {switch (state.currentBlock?.type) {
    case ComponentType.TextBox:
      return <TextAttr block={state.currentBlock} />
    default:
      return <div>
        属性
      </div>
  }}
  return <div >
    {element()}
  </div>
})