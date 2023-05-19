import { $, Fragment, component$, noSerialize, useComputed$, useContext, useSignal } from "@builder.io/qwik";
import type { TextBlock } from "../core/components";
import { GLOBAL_CONTEXT } from "~/store/context";
import ColorPicker from "~/integrations/react/ColorPicker";
import Label from "../Label";
import { KEY_CODE } from "~/constants/enum";
import Toolbar from "~/integrations/react/radix-ui/Toolbar";
import type { FontWeight, TextAlign } from "~/constants/enum/style";
import SelectArea from "~/integrations/react/radix-ui/Select/FontSizeSelect";
import FontFamilySelect from "~/integrations/react/radix-ui/Select/FontFamilySelect";
import Toggle from "../Toggle";
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
  const handleChangeFontStyle = $((value: string[]) => {
    block.canvasStyle.fontWeight = (value.find((item) => item == 'bold') ? 'bold' : 'normal') as FontWeight
    block.canvasStyle.underline = !!value.find(item => item == 'underline')
    block.canvasStyle.linethrough = !!value.find(item => item == 'line-through')
    block.canvasStyle.fontStyle = value.find(item => item == 'italic') ? 'italic' : 'normal'
    active?.set('fontWeight', block.canvasStyle.fontWeight)
    active?.set('underline', block.canvasStyle.underline)
    active?.set('linethrough', block.canvasStyle.linethrough)
    active?.set('fontStyle', block.canvasStyle.fontStyle)
    state.canvas?.renderAll()
  })
  const handleChangeAlignment = $((value: TextAlign) => {
    block.canvasStyle.textAlign = value
    active?.set('textAlign', block.canvasStyle.textAlign)
    state.canvas?.renderAll()
  })
  const textStyleDefaultValue = useComputed$(() => {
    return [
      block?.canvasStyle.fontWeight,
      block.canvasStyle.underline ? 'underline' : 'none',
      block.canvasStyle.linethrough ? 'line-through' : 'none',
      block.canvasStyle.fontStyle,
    ]
  })
  const textSizes = [
    { label: 'S', value: 12, size: 'text-[12px]' },
    { label: 'M', value: 16, size: 'text-[16px]' },
    { label: 'L', value: 20, size: 'text-[20px]' },
    { label: 'XL', value: 24, size: 'text-[24px]' },
  ]


  return <div class="w-full relative">
    <Toolbar
      alignmentDefaultValue={block?.canvasStyle.textAlign}
      textStyleDefaultValue={textStyleDefaultValue.value}
      onChangeAlignment$={handleChangeAlignment}
      onChangeTextStyle$={handleChangeFontStyle} />
    <div class="p-3 relative min-h-xl mt-5 shadow-radio bg-white rounded-md">
      <div class="flex flex-col ">
        <Label label="Text">
          <input class=" text-base w-full p-1 rounded-md focus:(border-blue) m-0 shadow-radio outline-0 border-gray-3 border-1 border-solid" type="text" onBlur$={(_, el) => {
            block.props.text = el.value
            active?.set('text', block.props.text)
            state.canvas?.renderAll()
          }}
            value={block.props.text} />
        </Label>
        <Label class="mt-4 relative" label="Stroke">
          <div class="flex items-center justify-between">
            <div class="w-[45px] h-[45px] rounded-xl shadow-radio" onClick$={() => displayColorPicker.value = true} style={{ 'background-color': block.canvasStyle.fill }}></div>
            <div class="flex border border-solid border-gray-3 text-xl items-center w-3/5 h-[45px]  rounded-xl shadow-radio">
              <div class="pl-2">#</div>
              <input class="p-2 text-xl w-full pr-1 m-0 outline-0 border-0 rounded-xl " type="text" value={block.canvasStyle.fill.slice(1)} onKeyUp$={(e, el) => {
                if (e.key == KEY_CODE.ENTER) {
                  handleChangeColor("#" + el.value)
                }
              }} />
            </div>
          </div>
          {displayColorPicker.value ?
            <div >
              <div class="fixed top-0 right-0 left-0 bottom-0" onClick$={() => displayColorPicker.value = false} />
              <div class="absolute z-2 top-full left-1/2 -translate-x-[50%]">
                <ColorPicker
                  onChangeComplete$={({ hex }) => handleChangeColor(hex)}
                  color={block.canvasStyle.fill} />
              </div>

            </div> : null
          }
        </Label>

        <Label class="mt-4" label="Size">
          <div class="flex items-center relative">
            {
              textSizes.map(size => {
                return <Fragment key={size.value}>
                  <Toggle active={size.value === block.canvasStyle.fontSize}>
                    <input
                      onChange$={(_, el) => {
                        block.canvasStyle.fontSize = Number(el.value)
                        active?.set('fontSize', block.canvasStyle.fontSize)
                        state.canvas?.renderAll()
                      }}
                      class="absolute opacity-0 pointer-events-none"
                      value={size.value}
                      checked={block.canvasStyle.fontSize === size.value}
                      type="radio"
                      name="Size" />
                    <span class={size.size}>{size.label}
                    </span>
                  </Toggle>
                </Fragment>
              })
            }
          </div>
          <SelectArea
            value={block.canvasStyle.fontSize.toString()}
            onValueChange$={size => {
              block.canvasStyle.fontSize = Number(size)
              active?.set('fontSize', block.canvasStyle.fontSize)
              state.canvas?.renderAll()
            }} />
        </Label>

        <Label class="mt-4" label="Font family">
          <FontFamilySelect
            value={block.canvasStyle.fontFamily}
            onValueChange$={fontFamily => {
              block.canvasStyle.fontFamily = fontFamily
              active?.set('fontFamily', block.canvasStyle.fontFamily)
              state.canvas?.renderAll()
            }}
          />
        </Label>
      </div>
    </div>



  </div>
})