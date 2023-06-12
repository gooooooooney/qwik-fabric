
/** @jsxImportSource react */
import { PopoverCom, TooltipTrigger } from "./DimensionsPopover"
import React from 'react';
import { hexToRgb } from "~/utils/style";
import * as ColorPicker from 'react-color'
import { ColorWheelIcon } from "@radix-ui/react-icons";
import { qwikify$ } from "@builder.io/qwik-react";

interface ShadowPopoverProps {
  shadow: ShadowProps | null;
  onShadowValueChange: (shadow: ShadowProps | null) => void
  isElement: boolean
  transparency: number
}

interface ShadowProps {
  color: string,
  blur: number,
  offsetX: number,
  offsetY: number,
}

export const _ShadowPopover = ({ shadow, transparency, onShadowValueChange }: ShadowPopoverProps) => {
  const defaultShadow: ShadowProps = {
    color: 'rgba(0,0,0)',
    blur: 10,
    offsetX: 20,
    offsetY: 20,
  };
  const rgx = /^rgba\(((,?\s*\d+){3}).+$/

  const [shadowState, setShadowState] = React.useState<ShadowProps | null>(shadow || defaultShadow)
  const [displayShadowColorPicker, setDisplayShadowColorPicker] = React.useState(false)
  const [currentColor] = React.useState(shadowState?.color)

  // useEffect(() => {
  //   isElement && onShadowValueChange(shadowState)
  // }, [shadowState])
  return <PopoverCom contentClass='PopoverContent' tip="Change color" trigger={
    <span
      className=" h-[25px] w-[25px] flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 "
      style={{ background: shadowState!.color.replace(rgx, `rgb($1)`) }}
    >
    </span>
  }>
    <div onClick={e => {
      const color = (e.target as HTMLDivElement).getAttribute('data-color')

      if (color) {
        if (color.startsWith('#')) {
          const rgb = hexToRgb(color)
          if (rgb) {
            setShadowState(p => {
              const state = {
                ...p!,
                color: `rgba(${rgb.r},${rgb.g},${rgb.b},${transparency / 100})`
              }
              onShadowValueChange(state)
              return state
            })
          }
        }
      }
    }}>
      <div className=' py-2 relative'>
        <div className='flex pb-2 items-center '>
          Current color
        </div>

        <div className="flex items-center gap-x-2">
          <TooltipTrigger tip="Change shadow color">
            <div
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setDisplayShadowColorPicker(true)
              }}
              data-color={shadowState!.color}
              style={{ background: shadowState!.color }}
              className="  h-[25px] w-[25px] flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 "
            >
            </div>
          </TooltipTrigger>
        </div>
        {
          displayShadowColorPicker ?
            <div >
              <div className="fixed top-0 right-0 left-0 bottom-0" onClick={() => setDisplayShadowColorPicker(false)} />
              <div className="absolute z-2 top-full left-1/2 -translate-x-[50%]">
                <ColorPicker.ChromePicker
                  onChangeComplete={(color) => {
                    const rgb = color.rgb
                    setShadowState(p => {
                      const state = {
                        ...p!,
                        color: `rgba(${rgb.r},${rgb.g},${rgb.b},${transparency / 100})`
                      }
                      onShadowValueChange(state)
                      return state
                    })

                  }}
                  color={currentColor} />
              </div>

            </div>
            :
            null
        }

      </div>
      <div >
        <div className=' px-4 py-2  flex items-center '>
          <ColorWheelIcon className='mr-2' />
          Default color</div>
        <div
          className="flex flex-wrap gap-x-4 gap-y-1 flex-col"
        >
          <label className='text-[#0d1216b3] text-xs'>
            Solid colors
          </label>
          <div className="flex flex-wrap ">

            <TooltipTrigger tip='#000000' >
              <div data-color="#000000" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#000000]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#545454'>
              <div data-color="#545454" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#545454]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#737373'>
              <div data-color="#737373" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#737373]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#a6a6a6'>
              <div data-color="#a6a6a6" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#a6a6a6]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#d9d9d9'>
              <div data-color="#d9d9d9" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#d9d9d9]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ffffff'>
              <div data-color="#ffffff" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ffffff]" ></div>
            </TooltipTrigger>

            <TooltipTrigger tip='#ff3131'>
              <div data-color="#ff3131" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ff3131]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff5757'>
              <div data-color="#ff5757" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ff5757]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff66c4'>
              <div data-color="#ff66c4" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ff66c4]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#cb6ce6'>
              <div data-color="#cb6ce6" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#cb6ce6]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#9c6ade'>
              <div data-color="#9c6ade" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#9c6ade]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#7367f0'>
              <div data-color="#7367f0" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#7367f0]" ></div>
            </TooltipTrigger>

            <TooltipTrigger tip='#5a86f5'>
              <div data-color="#5a86f5" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#5a86f5]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#4ba0ff'>
              <div data-color="#4ba0ff" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#4ba0ff]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#50d2c2'>
              <div data-color="#50d2c2" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#50d2c2]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#2bc4c4'>
              <div data-color="#2bc4c4" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#2bc4c4]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#5fc27e'>
              <div data-color="#5fc27e" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#5fc27e]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#82c91e'>
              <div data-color="#82c91e" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#82c91e]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ffde37'>
              <div data-color="#ffde37" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ffde37]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ffc61e'>
              <div data-color="#ffc61e" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ffc61e]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff9f1e'>
              <div data-color="#ff9f1e" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ff9f1e]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff6f6f'>
              <div data-color="#ff6f6f" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ff6f6f]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff922b'>
              <div data-color="#ff922b" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-[#ff922b]" ></div>
            </TooltipTrigger>



          </div>
        </div>

      </div>
    </div>
  </PopoverCom>
}

export const ShadowPopover = qwikify$(_ShadowPopover, { eagerness: 'idle' })