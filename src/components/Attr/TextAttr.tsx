import { component$, noSerialize, useContext } from "@builder.io/qwik";
import type { TextBlock } from "../core/components";
import { GLOBAL_CONTEXT } from "~/store/context";
interface TextAttrProps {
  block: TextBlock,
}

export default component$(({ block }: TextAttrProps) => {
  const {canvas} = useContext(GLOBAL_CONTEXT)
  const active = noSerialize(canvas?.getActiveObject())
  
  return <div>
    <div class="flex flex-col">
      <div class="flex flex-row">
        <label class="w-1/4">文本</label>
        <input class="w-3/4" type="text" onBlur$={(_, el) => {
          block.props.text = el.value
          active?.set('text', block.props.text)
          canvas?.renderAll()
        }}
          value={block.props.text} />

      </div>
    </div>
  </div>
})