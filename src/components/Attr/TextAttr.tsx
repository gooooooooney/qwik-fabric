import { $, Fragment, component$, noSerialize, useComputed$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { TextBlock } from "../core/components";
import { GLOBAL_CONTEXT } from "~/store/context";
import ColorPicker from "~/integrations/react/ColorPicker";
import Label from "../Label";
import { Canvas_Event_Object, KEY_CODE } from "~/constants/enum";
import Toolbar from "~/integrations/react/radix-ui/Toolbar";
import type { FontWeight, TextAlign } from "~/constants/enum/style";
import NumberSelte from "~/integrations/react/radix-ui/Select/NumberSelte";
import FontFamilySelect from "~/integrations/react/radix-ui/Select/FontFamilySelect";
import Toggle from "../Toggle";
import type { fabric } from "~/element";
import { emitter } from "~/utils/event";
interface TextAttrProps {
  block: TextBlock,
}

export default component$(({ block }: TextAttrProps) => {
  const state = useContext(GLOBAL_CONTEXT)
  const element = noSerialize(state.canvas?.getActiveObject())
  // const displayColorPicker = useSignal(false)
  const displayStrokeColorPicker = useSignal(false)
  // const handleChangeColor = $((color: string) => {
  //   block.canvasStyle.fill = color
  //   element?.set('fill', block.canvasStyle.fill)
  //   state.canvas?.renderAll()
  // })

  useVisibleTask$(() => {
    emitter.on(Canvas_Event_Object.TEXT_MODIFIED, (target: fabric.Textbox) => {
      
      block.canvasStyle.top = target.top
      block.canvasStyle.left = target.left
      block.canvasStyle.width = target.width
      block.canvasStyle.height = target.height
      block.canvasStyle.zoomX = target.zoomX || 1
      block.canvasStyle.zoomY = target.zoomY || 1
      block.props.text = target.text
    })
  })
  const handleChangeStrokeColor = $((color: string | null) => {
    block.canvasStyle.stroke = color

    element?.set('stroke', block.canvasStyle.stroke)
    state.canvas?.renderAll()
  })
  const handleChangeFontStyle = $((value: string[]) => {
    block.canvasStyle.fontWeight = (value.find((item) => item == 'bold') ? 'bold' : 'normal') as FontWeight
    block.canvasStyle.underline = !!value.find(item => item == 'underline')
    block.canvasStyle.linethrough = !!value.find(item => item == 'line-through')
    block.canvasStyle.fontStyle = value.find(item => item == 'italic') ? 'italic' : 'normal'
    element?.set('fontWeight', block.canvasStyle.fontWeight)
    element?.set('underline', block.canvasStyle.underline)
    element?.set('linethrough', block.canvasStyle.linethrough)
    element?.set('fontStyle', block.canvasStyle.fontStyle)
    state.canvas?.renderAll()
  })
  const handleChangeAlignment = $((value: TextAlign) => {
    block.canvasStyle.textAlign = value
    element?.set('textAlign', block.canvasStyle.textAlign)
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
  const fontSizeRange = Array.from({ length: 28 }, (_, i) => i + 12)

  const strokeWidthRange = Array.from({ length: 10 }, (_, i) => i + 1)


  return <div class="w-full relative animate-wobble">
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
            element?.set('text', block.props.text)
            state.canvas?.renderAll()
          }}
            value={block.props.text} />
        </Label>
        {/* <Label class="mt-4 relative" label="Fill">
          <div class="flex items-center justify-between">
            <div class="w-[45px] h-[45px] rounded-xl shadow-radio cursor-pointer hover:opacity-80" onClick$={() => displayColorPicker.value = true} style={{ 'background-color': block.canvasStyle.fill }}></div>
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
        </Label> */}

        <Label class="mt-4" label="Stroke width">
          <div class="flex items-center relative">
            {
              [1, 2, 3, 4, 5].map(size => {
                return <Fragment key={size}>
                  <Toggle active={size === block.canvasStyle.strokeWidth}>
                    <input
                      onChange$={(_, el) => {
                        block.canvasStyle.strokeWidth = Number(el.value)
                        element?.set('strokeWidth', block.canvasStyle.strokeWidth)
                        state.canvas?.renderAll()
                      }}
                      class="absolute opacity-0 pointer-events-none"
                      value={size}
                      checked={block.canvasStyle.strokeWidth === size}
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
            value={block.canvasStyle.strokeWidth.toString()}
            onValueChange$={size => {
              block.canvasStyle.strokeWidth = Number(size)
              element?.set('strokeWidth', block.canvasStyle.strokeWidth)
              state.canvas?.renderAll()
            }}
          />
        </Label>
        <Label class="mt-4 relative" label="Stroke">
          <div class="flex items-center justify-between">
            <div class="w-[45px] h-[45px] rounded-xl shadow-radio cursor-pointer hover:opacity-80" onClick$={() => displayStrokeColorPicker.value = true} style={{ 'background-color': block.canvasStyle.stroke ?? 'black' }}></div>
            <div class=" h-[45px] w-[50px] flex justify-center items-center rounded-xl shadow-radio cursor-pointer hover:opacity-80" onClick$={() => handleChangeStrokeColor(null)}>reset</div>
            <div class="flex border border-solid border-gray-3 text-xl items-center w-2/5 h-[45px]  rounded-xl shadow-radio">
              <div class="pl-2">#</div>
              <input class="p-2 text-xl w-full pr-1 m-0 outline-0 border-0 rounded-xl " type="text" value={block.canvasStyle.stroke?.slice(1)} onKeyUp$={(e, el) => {
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
                  color={block.canvasStyle.stroke ?? 'none'} />
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
                        element?.set('fontSize', block.canvasStyle.fontSize)
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
          <NumberSelte
            range={fontSizeRange}
            value={block.canvasStyle.fontSize.toString()}
            onValueChange$={size => {
              block.canvasStyle.fontSize = Number(size)
              element?.set('fontSize', block.canvasStyle.fontSize)
              state.canvas?.renderAll()
            }} />
        </Label>

        <Label class="mt-4" label="Font family">
          <FontFamilySelect
            value={block.canvasStyle.fontFamily}
            onValueChange$={fontFamily => {
              block.canvasStyle.fontFamily = fontFamily
              element?.set('fontFamily', block.canvasStyle.fontFamily)
              state.canvas?.renderAll()
            }}
          />
        </Label>
      </div>
    </div>



  </div>
})