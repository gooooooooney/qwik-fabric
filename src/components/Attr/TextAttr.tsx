import { component$, noSerialize, useContext, useSignal } from "@builder.io/qwik";
import type { TextBlock } from "../core/components";
import { GLOBAL_CONTEXT } from "~/store/context";
import ColorPicker from "~/integrations/react/ColorPicker";
import Label from "~/integrations/react/radix-ui/Label";
interface TextAttrProps {
  block: TextBlock,
}

export default component$(({ block }: TextAttrProps) => {
  const state = useContext(GLOBAL_CONTEXT)
  const active = noSerialize(state.canvas?.getActiveObject())
  const showColorPicker = useSignal(false)


  return <div>
    <div class="flex flex-col">
      <Label label="text">
        <input class="w-3/4" type="text" onBlur$={(_, el) => {
          block.props.text = el.value
          active?.set('text', block.props.text)
          state.canvas?.renderAll()
        }}
          value={block.props.text} />
      </Label>
      <Label label="color">
        <div class="w-[20px] h-[20px] rounded-md" onClick$={() => showColorPicker.value = true} style={{ 'background-color': block.canvasStyle.color }}></div>
      </Label>
    </div>
    {showColorPicker.value && <ColorPicker
      onChangeComplete$={({ hex }, ev) => {
        document.body.addEventListener('click', (e) => {
          if (e.target != ev.target) {
            showColorPicker.value = false
          }
        }, { once: true })
        block.canvasStyle.color = hex
        active?.set('fill', block.canvasStyle.color)
        state.canvas?.renderAll()
      }}
      color={block.canvasStyle.color} />
    }
  </div>
})