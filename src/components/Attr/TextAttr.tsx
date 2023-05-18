import { $, component$, noSerialize, useContext, useSignal } from "@builder.io/qwik";
import type { TextBlock } from "../core/components";
import { GLOBAL_CONTEXT } from "~/store/context";
import ColorPicker from "~/integrations/react/ColorPicker";
import Label from "../Label";
import { KEY_CODE } from "~/constants/enum";
interface TextAttrProps {
  block: TextBlock,
}

export default component$(({ block }: TextAttrProps) => {
  const state = useContext(GLOBAL_CONTEXT)
  const active = noSerialize(state.canvas?.getActiveObject())
  const displayColorPicker = useSignal(false)
  const handleChangeColor = $((color: string) => {
    block.canvasStyle.fill = color
    active?.set('fill', block.canvasStyle.fill)
    state.canvas?.renderAll()
  })
  return <div>
    <div class="flex flex-col">
      <Label label="text">
        <input class=" text-base w-full p-1 rounded-md focus:(border-blue) m-0 shadow-radio outline-0 border-gray-3 border-1 border-solid" type="text" onBlur$={(_, el) => {
          block.props.text = el.value
          active?.set('text', block.props.text)
          state.canvas?.renderAll()
        }}
          value={block.props.text} />
      </Label>
      <Label class="mt-4" label="stroke">
        <div class="flex items-center justify-between">
          <div class="w-[50px] h-[50px] rounded-md shadow-radio" onClick$={() => displayColorPicker.value = true} style={{ 'background-color': block.canvasStyle.fill }}></div>
          <div class="flex border border-solid border-gray-3 text-xl items-center w-3/5 h-[50px]  rounded-md shadow-radio">
            <div class="pl-2">#</div>
            <input class="p-2 text-xl w-full pr-1 m-0 outline-0 border-0 " type="text" value={block.canvasStyle.fill.slice(1)} onKeyUp$={(e, el) => {
              if (e.key == KEY_CODE.ENTER) {
                handleChangeColor("#" + el.value)
              }
            }} />
          </div>
        </div>
      </Label>
    </div>
    {displayColorPicker.value ?
      <div class="absolute z-2">
        <div class="fixed top-0 right-0 left-0 bottom-0" onClick$={() => displayColorPicker.value = false} />
        <ColorPicker
          onChangeComplete$={({ hex }) => handleChangeColor(hex)}
          color={block.canvasStyle.fill} />
      </div> : null}
  </div>
})