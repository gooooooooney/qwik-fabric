import { $, Fragment, component$, noSerialize, useComputed$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import type { TextBlock } from "../core/components";
import { GLOBAL_CONTEXT } from "~/store/context";
import Label from "../Label";
import { Canvas_Event_Object } from "~/constants/enum";
import Toolbar from "~/integrations/react/radix-ui/Toolbar";
import type { FontWeight, TextAlign } from "~/constants/enum/style";
import NumberSelte from "~/integrations/react/radix-ui/Select/NumberSelte";
import FontFamilySelect from "~/integrations/react/radix-ui/Select/FontFamilySelect";
import Toggle from "../Toggle";
import type { fabric } from "~/element";
import { emitter } from "~/core/event";
interface TextAttrProps {
  blocks: TextBlock[],
}

export default component$(({ blocks }: TextAttrProps) => {
  const state = useContext(GLOBAL_CONTEXT)
  const elements = noSerialize(state.canvas?.getActiveObjects() as fabric.Textbox[])

  // const handleChangeColor = $((color: string) => {
  //   block.fill = color
  //   element?.set('fill', block.fill)
  //   state.canvas?.renderAll()
  // })

  useVisibleTask$(() => {
    emitter.on(Canvas_Event_Object.TEXT_MODIFIED, (target: fabric.Textbox) => {

      blocks.forEach((b) => {
        if (b.id == target.get('id')) {
          b.top = target.top
          b.left = target.left
          b.width = target.width
          b.height = target.height
          // b.scaleX = target.zoomX || 1
          // b.scaleX = target.zoomY || 1
          b.text = target.text
        }
      })
    })
  })

  const handleChangeFontStyle = $((value: string[]) => {
    blocks.forEach((block) => {
      block.fontWeight = (value.find((item) => item == 'bold') ? 'bold' : 'normal') as FontWeight
      block.underline = !!value.find(item => item == 'underline')
      block.linethrough = !!value.find(item => item == 'line-through')
      block.fontStyle = value.find(item => item == 'italic') ? 'italic' : 'normal'
    })
    elements?.forEach((element) => {
      const block = blocks[0]
      
      // element.setSelectionStyles({ 
      //   'fontWeight': block.fontWeight,
      //   'underline': block.underline,
      //   'linethrough': block.linethrough,
      //   'fontStyle': block.fontStyle,
      //  })
      
      element?.set('fontWeight', block.fontWeight)
      element?.set('underline', block.underline)
      element?.set('linethrough', block.linethrough)
      element?.set('fontStyle', block.fontStyle)
    })
    state.canvas?.renderAll()
  })
  const handleChangeAlignment = $((value: TextAlign) => {
    blocks.forEach((block) => {
      block.textAlign = value
    })
    elements?.forEach((element) => {
      element?.set('textAlign', value)
    })
    state.canvas?.renderAll()
  })
  const textStyleDefaultValue = useComputed$(() => {
    if (!blocks.length) return []
    const block = blocks[0]
    return [
      block?.fontWeight ?? 'normal',
      block.underline ? 'underline' : 'none',
      block.linethrough ? 'line-through' : 'none',
      block.fontStyle ?? 'normal',
    ]
  })
  const textSizes = [
    { label: 'S', value: 12, size: 'text-[12px]' },
    { label: 'M', value: 16, size: 'text-[16px]' },
    { label: 'L', value: 20, size: 'text-[20px]' },
    { label: 'XL', value: 24, size: 'text-[24px]' },
  ]
  const fontSizeRange = Array.from({ length: 28 }, (_, i) => i + 12)




  return blocks.length ? <div class="w-full relative ">
    <Toolbar
      alignmentDefaultValue={(blocks?.[0]?.textAlign ?? 'left') as TextAlign}
      textStyleDefaultValue={textStyleDefaultValue.value}
      onChangeAlignment$={handleChangeAlignment}
      onChangeTextStyle$={handleChangeFontStyle} />
    <div class="p-3 relative  mt-5 shadow-radix bg-white rounded-md">
      <div class="flex flex-col ">
        <Label label="Text">
          <input class=" text-base w-full p-1 rounded-md focus:(border-blue) m-0 shadow-radix outline-0 border-gray-3 border-1 border-solid" type="text" onBlur$={(_, el) => {
            blocks.forEach((block) => {
              block.text = el.value
            })
            elements?.forEach((element) => {
              element?.set('text', el.value)
            })
            state.canvas?.renderAll()
          }}
            value={blocks[0]?.text} />
        </Label>
        {/* <Label class="mt-4 relative" label="Fill">
          <div class="flex items-center justify-between">
            <div class="w-[45px] h-[45px] rounded-xl shadow-radix cursor-pointer hover:opacity-80" onClick$={() => displayColorPicker.value = true} style={{ 'background-color': block.fill }}></div>
            <div class="flex border border-solid border-gray-3 text-xl items-center w-3/5 h-[45px]  rounded-xl shadow-radix">
              <div class="pl-2">#</div>
              <input class="p-2 text-xl w-full pr-1 m-0 outline-0 border-0 rounded-xl " type="text" value={block.fill.slice(1)} onKeyUp$={(e, el) => {
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
                  color={block.fill} />
              </div>

            </div> : null
          }
        </Label> */}



        <Label class="mt-4" label="Size">
          <div class="flex items-center relative">
            {
              textSizes.map(size => {
                return <Fragment key={size.value}>
                  <Toggle active={size.value == blocks[0]?.fontSize}>
                    <input
                      onChange$={(_, el) => {
                        blocks.forEach((block) => {
                          block.fontSize = Number(el.value)
                        })
                        elements?.forEach((element) => {
                          element?.set('fontSize', el.value)
                        })
                        state.canvas?.renderAll()
                      }}
                      class="absolute opacity-0 pointer-events-none"
                      value={size.value}
                      checked={blocks[0]?.fontSize === size.value}
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
            value={blocks[0]?.fontSize?.toString()}
            onValueChange$={size => {
              blocks.forEach((block) => {
                block.fontSize = Number(size)
              })
              elements?.forEach((element) => {
                element?.set('fontSize', Number(size))
              })
              state.canvas?.renderAll()
            }} />
        </Label>

        <Label class="mt-4" label="Font family">
          <FontFamilySelect
            value={blocks[0]?.fontFamily}
            onValueChange$={fontFamily => {
              blocks.forEach((block) => {
                block.fontFamily = fontFamily
              })
              elements?.forEach((element) => {
                element?.set('fontFamily', fontFamily)
              })
              state.canvas?.renderAll()
            }}
          />
        </Label>
      </div>
    </div>



  </div>
    : null
})