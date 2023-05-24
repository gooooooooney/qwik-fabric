/** @jsxImportSource react */
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import React from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import { qwikify$ } from '@builder.io/qwik-react';
import { ColorWheelIcon, PlusIcon } from '@radix-ui/react-icons'
import * as Slider from '@radix-ui/react-slider';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as TooltipCom from '@radix-ui/react-tooltip';
import { ChromePicker } from 'react-color'
import "./index.css"
import { cx } from '~/utils/common';

interface ShadowProps {
    color: string,
    blur: number,
    offsetX: number,
    offsetY: number,
}
interface CommonAttrProps {
    fill: string[];
    isElement: boolean;
    shadow: ShadowProps | null;
    onChangeColor: (value: string[]) => void;
    onShadowtValueChange: (shadow: ShadowProps) => void
}

interface TooltipTriggerProps extends PropsWithChildren {
    tip: string
}
function TooltipTrigger({ children, tip }: TooltipTriggerProps) {
    return (
        <TooltipCom.Provider>
            <TooltipCom.Root>
                <TooltipCom.Trigger asChild>
                    {children}
                </TooltipCom.Trigger>
                <TooltipCom.Portal>
                    <TooltipCom.Content
                        className="TooltipContent"
                        sideOffset={5}
                        side='bottom'
                    >
                        {tip}
                        <TooltipCom.Arrow className="fill-black" />
                    </TooltipCom.Content>
                </TooltipCom.Portal>
            </TooltipCom.Root>
        </TooltipCom.Provider>
    );
}

const DropdownMenuCom = ({ trigger, tip, children, contentClass }: { contentClass?: string, trigger: React.ReactNode, tip: string } & PropsWithChildren<{}>) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <TooltipTrigger tip={tip}>
                    {trigger}
                </TooltipTrigger>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={cx('min-w-[250px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade', contentClass)}
                    sideOffset={5}
                >
                    {children}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}


const CommonAttr = ({ fill, onChangeColor, shadow, onShadowtValueChange, isElement }: CommonAttrProps) => {
    const defaultShadow = {
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 10,
        offsetY: 10,
    };
    const [displayColorPicker, setDisplayColorPicker] = React.useState(false)
    const [currentColor, setCurrentColor] = React.useState(fill[0])
    const [currentColorIndex, setCurrentColorIndex] = React.useState(0)
    const [colors, setColors] = React.useState(fill)
    const [shadowState, setShadowState] = React.useState(shadow || defaultShadow)
    useEffect(() => {
        onChangeColor(colors)
    }, [colors])
    useEffect(() => {
        isElement && onShadowtValueChange(shadowState)
    }, [shadowState])

    useEffect(() => {
        shadow && setShadowState(shadow)
    }, [shadow])

    return (
        <Toolbar.Root
            className="flex p-2 min-w-max rounded-md bg-white shadow-[0_2px_10px] shadow-radio"
            aria-label="Formatting options"
        >

            <Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">

                <DropdownMenuCom tip="Change color" trigger={
                    <span
                        className=" h-[25px] w-[25px] flex justify-center items-center rounded shadow-radio cursor-pointer hover:opacity-80 "
                        style={{ background: fill.length > 1 ? 'linear-gradient(to right,' + fill.join(",") + ')' : fill[0] }}
                    >
                    </span>
                }>
                    <div className='pb-2' onClick={e => {
                        const color = (e.target as HTMLDivElement).getAttribute('data-color')
                        if (color) {
                            setColors(color.split(","))
                        }
                    }}>
                        <div>


                        </div>
                        <div className='px-4 py-2 relative'>
                            <div className='flex pb-2 items-center '>
                                Current color
                            </div>

                            <div className="flex items-center gap-x-2">
                                <TooltipTrigger tip='add a new color'>
                                    <div
                                        onClick={() => {
                                            setCurrentColor(fill[0])
                                            setCurrentColorIndex(-1)
                                            setDisplayColorPicker(true)
                                        }}
                                        className="h-[25px] w-[25px] flex justify-center items-center rounded shadow-radio cursor-pointer hover:opacity-80 "
                                    >
                                        <PlusIcon className='text-black' />
                                    </div>
                                </TooltipTrigger>
                                {
                                    colors.map((color, index) => <Fragment key={color + index}>
                                        <TooltipTrigger tip={color}>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    setCurrentColorIndex(index)
                                                    setCurrentColor(color)
                                                    setDisplayColorPicker(true)
                                                }}
                                                data-color={color}
                                                style={{ background: color }}
                                                className="  h-[25px] w-[25px] flex justify-center items-center rounded shadow-radio cursor-pointer hover:opacity-80 "
                                            >
                                            </div>
                                        </TooltipTrigger>
                                    </Fragment>
                                    )
                                }
                            </div>
                            {
                                displayColorPicker ?
                                    <div >
                                        <div className="fixed top-0 right-0 left-0 bottom-0" onClick={() => setDisplayColorPicker(false)} />
                                        <div className="absolute z-2 top-full left-1/2 -translate-x-[50%]">
                                            <ChromePicker
                                                onChangeComplete={(color) => {
                                                    const hexColor = color.hex
                                                    setCurrentColor(hexColor)
                                                    if (currentColorIndex == -1) {
                                                        setColors([...colors, hexColor])
                                                        setCurrentColorIndex(colors.length)
                                                        console.log(colors)
                                                    } else {
                                                        colors[currentColorIndex] = hexColor
                                                        setColors([...colors])
                                                    }

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
                                className="flex px-4 flex-wrap gap-x-4 gap-y-1 flex-col"
                            >
                                <label className='text-[#0d1216b3] text-xs'>
                                    Solid colors
                                </label>
                                <div className="grid grid-cols-6 gap-2">

                                    <TooltipTrigger tip='#000000'>
                                        <div data-color="#000000" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#000000]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#545454'>
                                        <div data-color="#545454" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#545454]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#737373'>
                                        <div data-color="#737373" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#737373]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#a6a6a6'>
                                        <div data-color="#a6a6a6" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#a6a6a6]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#d9d9d9'>
                                        <div data-color="#d9d9d9" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#d9d9d9]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ffffff'>
                                        <div data-color="#ffffff" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ffffff]" ></div>
                                    </TooltipTrigger>

                                    <TooltipTrigger tip='#ff3131'>
                                        <div data-color="#ff3131" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff3131]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff5757'>
                                        <div data-color="#ff5757" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff5757]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff66c4'>
                                        <div data-color="#ff66c4" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff66c4]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#cb6ce6'>
                                        <div data-color="#cb6ce6" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#cb6ce6]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#9c6ade'>
                                        <div data-color="#9c6ade" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#9c6ade]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#7367f0'>
                                        <div data-color="#7367f0" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#7367f0]" ></div>
                                    </TooltipTrigger>

                                    <TooltipTrigger tip='#5a86f5'>
                                        <div data-color="#5a86f5" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#5a86f5]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#4ba0ff'>
                                        <div data-color="#4ba0ff" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#4ba0ff]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#50d2c2'>
                                        <div data-color="#50d2c2" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#50d2c2]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#2bc4c4'>
                                        <div data-color="#2bc4c4" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#2bc4c4]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#5fc27e'>
                                        <div data-color="#5fc27e" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#5fc27e]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#82c91e'>
                                        <div data-color="#82c91e" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#82c91e]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ffde37'>
                                        <div data-color="#ffde37" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ffde37]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ffc61e'>
                                        <div data-color="#ffc61e" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ffc61e]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff9f1e'>
                                        <div data-color="#ff9f1e" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff9f1e]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff6f6f'>
                                        <div data-color="#ff6f6f" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff6f6f]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff922b'>
                                        <div data-color="#ff922b" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff922b]" ></div>
                                    </TooltipTrigger>



                                </div>
                            </div>
                            <div
                                className="flex px-4 py-2 flex-wrap gap-x-4 gap-y-1 flex-col"
                            >
                                <label className='text-[#0d1216b3] text-xs'>
                                    Gradients
                                </label>
                                <div className="grid grid-cols-6 gap-2">

                                    <TooltipTrigger tip='#000000,#737373'>
                                        <div data-color="#000000,#737373" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#737373]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#000000,#c89116'>
                                        <div data-color="#000000,#c89116" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#c89116]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#000000,#3533cd'>
                                        <div data-color="#000000,#3533cd" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#3533cd]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#a6a6a6,#3533cd'>
                                        <div data-color="#a6a6a6,#3533cd" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#a6a6a6] to-[#3533cd]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ffa7ad,#ffa9f9'>
                                        <div data-color="#ffa7ad,#ffa9f9" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ffa7ad] to-[#ffa9f9]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#cdffd8,#94b9ff'>
                                        <div data-color="#cdffd8,#94b9ff" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#cdffd8] to-[#94b9ff]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff9a9e,#fad0c4'>
                                        <div data-color="#ff9a9e,#fad0c4" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff3131,#ff914d'>
                                        <div data-color="#ff3131,#ff914d" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff3131] to-[#ff914d]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff5757,#8c52ff'>
                                        <div data-color="#ff5757,#8c52ff" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff5757] to-[#8c52ff]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#5170ff,#ff66c4'>
                                        <div data-color="#5170ff,#ff66c4" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#5170ff] to-[#ff66c4]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#004aad,#cb6ce6'>
                                        <div data-color="#004aad,#cb6ce6" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#004aad] to-[#cb6ce6]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#8c52ff,#5ce1e6'>
                                        <div data-color="#8c52ff,#5ce1e6" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff66c4,#ffcbcb'>
                                        <div data-color="#ff66c4,#ffcbcb" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff66c4] to-[#ffcbcb]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#0cc0df,#ffde59'>
                                        <div data-color="#0cc0df,#ffde59" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#0cc0df] to-[#ffde59]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ffde59,#ff914d'>
                                        <div data-color="#ffde59,#ff914d" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ffde59] to-[#ff914d]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff914d,#ffcbcb'>
                                        <div data-color="#ff914d,#ffcbcb" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff914d] to-[#ffcbcb]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#ff66c4,#ffde59'>
                                        <div data-color="#ff66c4,#ffde59" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff66c4] to-[#ffde59]" ></div>
                                    </TooltipTrigger>
                                    <TooltipTrigger tip='#8c52ff,#ff914d'>
                                        <div data-color="#8c52ff,#ff914d" className="transition w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#8c52ff] to-[#ff914d]" ></div>
                                    </TooltipTrigger>






                                </div>
                            </div>
                        </div>
                    </div>
                </DropdownMenuCom>

            </Toolbar.ToggleGroup>

            <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
            {
                isElement ?
                    <Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">


                        <DropdownMenuCom tip="Effects" trigger={
                            // <ShadowIcon className='h-[25px] w-[25px] flex justify-center items-center rounded shadow-radio cursor-pointer hover:opacity-80 ' />
                            <span
                                className=" transition h-[25px] bg-[#394c6026] px-2 flex justify-center items-center rounded shadow-radio cursor-pointer hover:opacity-80 "
                            >
                                Effects
                            </span>
                        }>
                            <div>
                                <div className='px-4 py-2 relative'>
                                    <div className='flex pb-2 items-center '>
                                        Style
                                    </div>
                                    <div>
                                        <div className="grid gap-x-4 grid-cols-4">
                                            <div className="flex flex-col items-center ">
                                                <div className="transition hover:shadow-[0_0_0_2px_#2b3b4a4d] w-[45px]  cursor-pointer shadow-[0_0_0_1px_#2b3b4a4d] text-xl h-[45px] rounded flex items-center justify-center">A</div>
                                                <p className="mt-2">None</p>
                                            </div>
                                            <div className="flex flex-col items-center ">
                                                <div className="transition hover:shadow-[0_0_0_2px_#2b3b4a4d] w-[45px]  cursor-pointer shadow-[0_0_0_1px_#2b3b4a4d] text-xl h-[45px] rounded flex items-center justify-center">
                                                    <p style={{
                                                        textShadow: shadow ? `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.color}` : ''
                                                    }}>A</p>
                                                </div>
                                                <p className="mt-2">Shadow</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex mt-4 justify-between">
                                                <div>Offset</div>
                                                <input type="number" onChange={e => {
                                                    setShadowState({ ...shadowState, offsetX: e.target.valueAsNumber })
                                                }} value={shadowState.offsetX} max={100} min={0} />
                                            </div>
                                            <form>
                                                <Slider.Root
                                                    className="relative cursor-pointer flex items-center select-none touch-none w-full h-5"
                                                    value={[shadowState.offsetX]}
                                                    onValueChange={([value]) => {
                                                        setShadowState({ ...shadowState, offsetX: value })
                                                    }}
                                                    max={100}
                                                    step={1}
                                                >
                                                    <Slider.Track className="bg-[#a6a6a6] relative grow rounded-full h-[3px]">
                                                        <Slider.Range className="absolute bg-violet rounded-full h-full" />
                                                    </Slider.Track>
                                                    <Slider.Thumb
                                                        className="transition block w-3 h-3 bg-white shadow-[0_0_0_1px_#a6a6a6] rounded-[10px] hover:shadow-[0_0_0_2px_#a6a6a6] "
                                                        aria-label="Offset"
                                                    />
                                                </Slider.Root>
                                            </form>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </DropdownMenuCom>


                    </Toolbar.ToggleGroup>
                    : null
            }
        </Toolbar.Root>
    )
};

export default qwikify$(CommonAttr, { eagerness: 'idle' });
export const Tooltip = qwikify$(TooltipTrigger, { eagerness: 'idle' });