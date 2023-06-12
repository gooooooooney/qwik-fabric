

import { $, component$, useSignal } from "@builder.io/qwik";
import { useCanvasCtx } from "~/use/useCanvasCtx";
import { cx } from "~/utils/common";
import { ShadowPopover } from "~/integrations/react/radix-ui/Popover/ShadowPopover";



interface ShadowProps {
  color: string,
  blur: number,
  offsetX: number,
  offsetY: number,
}
const defaultShadow: ShadowProps = {
  color: 'rgba(0,0,0)',
  blur: 10,
  offsetX: 20,
  offsetY: 20,
};
export default component$(() => {
  const state = useCanvasCtx()
  const isElement = !!state.activeElements?.length
  const shadow = state.currentBlock[0]?.shadow as ShadowProps
  const shadowState = useSignal<ShadowProps | null | undefined>(shadow || defaultShadow)
  const transparency = useSignal(100)


  const onShadowValueChange = $((shadow: ShadowProps | null) => {
    state.currentBlock!.forEach((block) => {
      block.shadow = shadow as any
    })
    state.activeElements?.forEach((element) => {
      element.set('shadow', shadow)
    })
    state.canvas?.renderAll()
  })

  const setShadowState = $((shadow: ShadowProps | null) => {
    shadowState.value = shadow
    console.log(shadow)
    isElement && onShadowValueChange(shadow)
  })



  const setTransparency = $((tr: number) => {
    transparency.value = tr
    if (shadowState.value) {
      shadowState.value.color = shadowState.value.color.replace(/rgba\((\d+),(\d+),(\d+),(\d+)\)/, `rgba($1,$2,$3,${tr / 100})`)
      onShadowValueChange(shadowState.value)
    }
  })


  return (
    <div class=" shadow-radix rounded p-3 mt-5  bg-white">
      <div class="m-5">
        <div class="mb-3">Effects</div>

        <div>
          <div class='relative'>
            {/* <div class='flex pb-2 items-center '>
              Style
            </div> */}
            <div data-orientation="vertical" aria-orientation="vertical" role="separator" class="w-full h-1px bg-#e4e2e4 my-[10px]"></div>
            <div>
              <div class="grid gap-x-4 grid-cols-4">
                <div
                  onClick$={() => {
                    setShadowState(null)

                    onShadowValueChange(null)
                  }}
                  class="flex flex-col items-center">
                  <div
                    class={cx('transition  hover:shadow-[0_0_0_2px_#2b3b4a4d] w-[45px]  cursor-pointer shadow-[0_0_0_1px_#2b3b4a4d] text-xl h-[45px] rounded flex items-center justify-center', { 'shadow-[0_0_0_2px_violet]': shadow && !shadowState })}>A</div>
                  <p class="mt-2">None</p>
                </div>
                <div
                  onClick$={() => {
                    setShadowState(defaultShadow)
                  }}
                  class="flex flex-col items-center ">
                  <div
                    class={cx('transition  hover:shadow-[0_0_0_2px_#2b3b4a4d] w-[45px]  cursor-pointer shadow-[0_0_0_1px_#2b3b4a4d] text-xl h-[45px] rounded flex items-center justify-center', { 'shadow-[0_0_0_2px_violet]': shadow && !!shadowState })}>
                    <p style={{ textShadow: 'rgb(0, 0, 0) 9px 8px 3px' }}>A</p>
                  </div>
                  <p class="mt-2">Shadow</p>
                </div>
              </div>

            </div>
            {
              shadowState.value! ?
                <div>
                  <div>
                    <div class="flex mt-4 justify-between">
                      <div>OffsetX</div>
                      <input type="number" onChange$={e => {
                        setShadowState({ ...shadowState.value!, offsetX: e.target.valueAsNumber })
                      }} value={shadowState.value!.offsetX} max={50} min={-50} />
                    </div>
                    <div>
                      <input
                        style={{
                          backgroundSize: `${shadowState.value!.offsetX + 50}% 100%`
                        }}
                        type="range"
                        step={1}
                        value={shadowState.value!.offsetX}
                        onChange$={(e) => {
                          setShadowState({ ...shadowState.value!, offsetX: e.target.valueAsNumber })
                        }} max={50} min={-50} name="" id="" />
                    </div>

                  </div>
                  <div>
                    <div class="flex mt-4 justify-between">
                      <div>OffsetY</div>
                      <input type="number"
                        onChange$={e => {
                          setShadowState({ ...shadowState.value!, offsetY: e.target.valueAsNumber })
                        }} value={shadowState.value!.offsetY} max={50} min={-50} />
                    </div>

                    <input
                      style={{
                        backgroundSize: `${shadowState.value!.offsetY + 50}% 100%`
                      }}
                      type="range"
                      step={1}
                      value={shadowState.value!.offsetY}
                      onChange$={(e) => {
                        setShadowState({ ...shadowState.value!, offsetY: e.target.valueAsNumber })
                      }} max={50} min={-50} name="" id="" />

                  </div>
                  <div>
                    <div class="flex mt-4 justify-between">
                      <div>Blur</div>
                      <input type="number"
                        onChange$={e => {
                          setShadowState({ ...shadowState.value!, blur: e.target.valueAsNumber })
                        }} value={shadowState.value!.blur} max={50} min={-50} />
                    </div>

                    <input
                      style={{
                        backgroundSize: `${shadowState.value!.blur}% 100%`
                      }}
                      type="range"
                      step={1}
                      value={shadowState.value!.blur}
                      onChange$={(e) => {
                        setShadowState({ ...shadowState.value!, blur: e.target.valueAsNumber })
                      }} max={100} min={0} name="" id="" />

                  </div>
                  <div>
                    <div class="flex mt-4 justify-between">
                      <div>Transparency</div>
                      <input type="number"
                        onChange$={e => {
                          setTransparency(e.target.valueAsNumber)
                        }} value={transparency.value} max={50} min={-50} />
                    </div>

                    <input
                      style={{
                        backgroundSize: `${transparency}% 100%`
                      }}
                      type="range"
                      step={1}
                      value={transparency.value}
                      onChange$={(e) => {
                        setTransparency(e.target.valueAsNumber)
                      }} max={100} min={0} name="" id="" />

                  </div>
                  <div class="flex justify-between items-center my-2">
                    <div class='flex items-center '>
                      Shadow Color
                    </div>
                    <ShadowPopover
                      transparency={transparency.value}
                      isElement={isElement}
                      shadow={shadowState.value}
                      onShadowValueChange$={(c) => {
                        setShadowState(c)
                      }}
                    />
                    {/* <Popover>
                      <div q:slot="trigger">
                        <span
                          class=" h-[25px] w-[25px] flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 "
                          style={{ background: shadowState.value!.color.replace(rgx, `rgb($1)`) }}
                        >
                        </span>
                      </div>

                      <div onClick$={e => {
                        const color = (e.target as HTMLDivElement).getAttribute('data-color')

                        if (color) {
                          if (color.startsWith('#')) {
                            const rgb = hexToRgb(color)
                            if (rgb) {
                              setShadowState({
                                ...shadowState.value!,
                                color: `rgba(${rgb.r},${rgb.g},${rgb.b},${transparency.value / 100})`
                              })
                            }
                          }
                        }
                      }}>
                        <div>


                        </div>
                        <div class='px-4 py-2 relative'>
                          <div class='flex pb-2 items-center '>
                            Current color
                          </div>

                          <div class="flex items-center gap-x-2">
                            <Tooltip tip="Change shadow color">
                              <div
                                preventdefault:click
                                onClick$={(e) => {
                                  e.stopPropagation()
                                  setDisplayShadowColorPicker(true)
                                }}
                                data-color={shadowState.value!.color}
                                style={{ background: shadowState.value!.color }}
                                class="  h-[25px] w-[25px] flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 "
                              >
                              </div>
                            </Tooltip>
                          </div>
                          {
                            displayShadowColorPicker.value ?
                              <div >
                                <div class="fixed top-0 right-0 left-0 bottom-0" onClick$={() => setDisplayShadowColorPicker(false)} />
                                <div class="absolute z-2 top-full left-1/2 -translate-x-[50%]">
                                  <ColorChromePicker
                                    onChangeComplete$={(color) => {
                                      const rgb = color.rgb
                                      setShadowState({
                                        ...shadowState.value!,
                                        color: `rgba(${rgb.r},${rgb.g},${rgb.b},${transparency.value / 100})`
                                      })

                                    }}
                                    color={shadowState.value.color} />
                                </div>

                              </div>
                              :
                              null
                          }

                        </div>
                        <div >
                          <div class=' px-4 py-2  flex items-center '>
                            <ColorWheelIcon class='mr-2' />
                            Default color</div>
                          <SolidColors />

                        </div>
                      </div>
                    </Popover> */}
                  </div>
                </div>
                : null
            }

          </div>
        </div>
      </div>
    </div>
  )
})