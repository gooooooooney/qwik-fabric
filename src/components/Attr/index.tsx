import { Fragment, component$, $, noSerialize, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { CANVAS_EVENT_SELECTED, ComponentType, KEY_CODE } from "~/constants/enum";
import { GLOBAL_CONTEXT } from "~/store/context";
import TextAttr from "./TextAttr";
import { emitter } from "~/core/event";
import { fabric } from "~/element";
import ColorPicker from "~/integrations/react/ColorPicker";
import NumberSelte from "~/integrations/react/radix-ui/Select/NumberSelte";
import Label from "../Label";
import Toggle from "../Toggle";

export default component$(() => {
  const state = useContext(GLOBAL_CONTEXT)
  const elements = noSerialize(state.canvas?.getActiveObjects())
  // const displayColorPicker = useSignal(false)
  const displayStrokeColorPicker = useSignal(false)
  const showAttr = useSignal(false)
  const strokeWidthRange = Array.from({ length: 10 }, (_, i) => i + 1)
  useVisibleTask$(() => {
    emitter.on(CANVAS_EVENT_SELECTED.ONE, () => {
      showAttr.value = true
      const active = state.canvas?.getActiveObject()
      if (active instanceof fabric.Textbox) {
        const block = state.blocks.find(block => block.id == active.get('id'))
        if (block) {
          state.updateCurrentBlock(block)
        }
      }
    })
    emitter.on(CANVAS_EVENT_SELECTED.NONE, () => {
      showAttr.value = false
    })
  })
  const handleChangeStrokeColor = $((color: string | null) => {
    state.currentBlock && (state.currentBlock.canvasStyle.stroke = color)

    elements?.forEach((element) => {
      element.set('stroke', color)
    })
    state.canvas?.renderAll()
  })
  const elementAttr = () => {

    if (state.currentBlock) {
      switch (state.currentBlock.type) {
        case ComponentType.TextBox:
          return <TextAttr block={state.currentBlock} />
        default:
          return null
      }
    }
    return null

  }
  return <div class="h-2xl overflow-auto ">

    {elementAttr()}
    {
      state.activeElements?.length ?
        <div class="p-3 relative  mt-5 shadow-radio transition bg-white rounded-md">
          <Label class="mt-4" label="Stroke width">
            <div class="flex items-center relative flex-wrap gap-2">
              {
                [0, 1, 2, 3, 4, 5].map(size => {
                  return <Fragment key={size}>
                    <Toggle active={size === state.currentBlock?.canvasStyle.strokeWidth}>
                      <input
                        onChange$={(_, el) => {
                          state.currentBlock && (state.currentBlock.canvasStyle.strokeWidth = Number(el.value))
                          elements?.forEach((element) => {
                            element?.set('strokeWidth', Number(el.value))
                          })
                          state.canvas?.renderAll()
                        }}
                        class="absolute opacity-0 pointer-events-none"
                        value={size}
                        checked={state.currentBlock?.canvasStyle.strokeWidth === size}
                        type="radio"
                        name="Stroke" />
                      <span>{size}
                      </span>
                    </Toggle>
                  </Fragment>
                })
              }
            </div>
            <NumberSelte
              range={strokeWidthRange}
              value={state.currentBlock?.canvasStyle?.strokeWidth?.toString()}
              onValueChange$={size => {
                state.currentBlock && (state.currentBlock.canvasStyle.strokeWidth = Number(size))
                elements?.forEach((element) => {
                  element?.set('strokeWidth', Number(size))
                })
                state.canvas?.renderAll()
              }}
            />
          </Label>
          <Label class="mt-4 relative" label="Stroke">
            <div class="flex items-center justify-between">
              <div class="w-[45px] h-[45px] rounded-xl shadow-radio cursor-pointer hover:opacity-80" onClick$={() => displayStrokeColorPicker.value = true} style={{ 'background-color': state.currentBlock?.canvasStyle.stroke ?? 'black' }}></div>
              <div class=" h-[45px] w-[50px] flex justify-center items-center rounded-xl shadow-radio cursor-pointer hover:opacity-80" onClick$={() => handleChangeStrokeColor(null)}>reset</div>
              <div class="flex border border-solid border-gray-3 text-xl items-center w-2/5 h-[45px]  rounded-xl shadow-radio">
                <div class="pl-2">#</div>
                <input class="p-2 text-xl w-full pr-1 m-0 outline-0 border-0 rounded-xl " type="text" value={state.currentBlock?.canvasStyle.stroke?.slice(1)} onKeyUp$={(e, el) => {
                  if (e.key == KEY_CODE.ENTER) {
                    handleChangeStrokeColor("#" + el.value)
                  }
                }} />
              </div>
            </div>
            {displayStrokeColorPicker.value ?
              <div >
                <div class="fixed top-0 right-0 left-0 bottom-0" onClick$={() => displayStrokeColorPicker.value = false} />
                <div class="absolute z-2 top-full left-1/2 -translate-x-[50%]">
                  <ColorPicker
                    onChangeComplete$={({ hex }) => handleChangeStrokeColor(hex)}
                    color={state.currentBlock?.canvasStyle.stroke ?? 'none'} />
                </div>

              </div> : null
            }
          </Label>
        </div>
        : null
    }
  </div>
})