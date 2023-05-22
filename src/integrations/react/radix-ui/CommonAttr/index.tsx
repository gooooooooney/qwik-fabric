/** @jsxImportSource react */
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import React from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import { qwikify$ } from '@builder.io/qwik-react';
import { ColorWheelIcon, PlusIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as TooltipCom from '@radix-ui/react-tooltip';
import { ChromePicker } from 'react-color'
import "./index.css"

interface CommonAttrProps {
    fill: string[];
    onChangeColor: (value: string[]) => void;
}

interface TooltipTriggerProps extends PropsWithChildren {
    tip: string
}
function TooltipTrigger({ children, tip }: TooltipTriggerProps) {
    return (
        <TooltipCom.Provider>
            <TooltipCom.Root>
                <TooltipCom.Trigger>
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


const CommonAttr = ({ fill, onChangeColor }: CommonAttrProps) => {
    const [displayColorPicker, setDisplayColorPicker] = React.useState(false)
    const [currentColor, setCurrentColor] = React.useState(fill[0])
    const [currentColorIndex, setCurrentColorIndex] = React.useState(0)
    const [colors, setColors] = React.useState(fill)
    useEffect(() => {
        onChangeColor(colors)
    }, [colors])
    return (
        <Toolbar.Root
            className="flex p-2 min-w-max rounded-md bg-white shadow-[0_2px_10px] shadow-radio"
            aria-label="Formatting options"
        >

            <Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>


                        {/* <TooltipTrigger tip="change color"> */}
                        <span
                            className=" h-[25px] w-[25px] flex justify-center items-center rounded shadow-radio cursor-pointer hover:opacity-80 "
                            style={{ background: fill.length > 1 ? 'linear-gradient(to right,' + fill.join(",") + ')' : fill[0] }}
                        >
                        </span>
                        {/* </TooltipTrigger> */}



                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="min-w-[250px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            sideOffset={5}
                        >
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
                                        Current color</div>
                                    
                                    <div className="flex items-center gap-x-2">
                                        <TooltipTrigger tip='add a new color'>
                                            <div
                                                onClick={() => {
                                                    setCurrentColor(fill[0])
                                                    setCurrentColorIndex(-1)
                                                    setDisplayColorPicker(true)}}
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
                                                        className="h-[25px] w-[25px] flex justify-center items-center rounded shadow-radio cursor-pointer hover:opacity-80 "
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
                                                <div data-color="#000000" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#000000]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#545454'>
                                                <div data-color="#545454" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#545454]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#737373'>
                                                <div data-color="#737373" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#737373]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#a6a6a6'>
                                                <div data-color="#a6a6a6" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#a6a6a6]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#d9d9d9'>
                                                <div data-color="#d9d9d9" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#d9d9d9]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ffffff'>
                                                <div data-color="#ffffff" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ffffff]" ></div>
                                            </TooltipTrigger>

                                            <TooltipTrigger tip='#ff3131'>
                                                <div data-color="#ff3131" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff3131]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff5757'>
                                                <div data-color="#ff5757" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff5757]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff66c4'>
                                                <div data-color="#ff66c4" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff66c4]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#cb6ce6'>
                                                <div data-color="#cb6ce6" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#cb6ce6]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#9c6ade'>
                                                <div data-color="#9c6ade" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#9c6ade]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#7367f0'>
                                                <div data-color="#7367f0" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#7367f0]" ></div>
                                            </TooltipTrigger>

                                            <TooltipTrigger tip='#5a86f5'>
                                                <div data-color="#5a86f5" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#5a86f5]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#4ba0ff'>
                                                <div data-color="#4ba0ff" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#4ba0ff]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#50d2c2'>
                                                <div data-color="#50d2c2" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#50d2c2]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#2bc4c4'>
                                                <div data-color="#2bc4c4" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#2bc4c4]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#5fc27e'>
                                                <div data-color="#5fc27e" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#5fc27e]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#82c91e'>
                                                <div data-color="#82c91e" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#82c91e]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ffde37'>
                                                <div data-color="#ffde37" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ffde37]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ffc61e'>
                                                <div data-color="#ffc61e" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ffc61e]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff9f1e'>
                                                <div data-color="#ff9f1e" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff9f1e]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff6f6f'>
                                                <div data-color="#ff6f6f" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff6f6f]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff922b'>
                                                <div data-color="#ff922b" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-[#ff922b]" ></div>
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
                                                <div data-color="#000000,#737373" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#737373]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#000000,#c89116'>
                                                <div data-color="#000000,#c89116" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#c89116]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#000000,#3533cd'>
                                                <div data-color="#000000,#3533cd" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#3533cd]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#a6a6a6,#3533cd'>
                                                <div data-color="#a6a6a6,#3533cd" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#a6a6a6] to-[#3533cd]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ffa7ad,#ffa9f9'>
                                                <div data-color="#ffa7ad,#ffa9f9" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ffa7ad] to-[#ffa9f9]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#cdffd8,#94b9ff'>
                                                <div data-color="#cdffd8,#94b9ff" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#cdffd8] to-[#94b9ff]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff9a9e,#fad0c4'>
                                                <div data-color="#ff9a9e,#fad0c4" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff3131,#ff914d'>
                                                <div data-color="#ff3131,#ff914d" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff3131] to-[#ff914d]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff5757,#8c52ff'>
                                                <div data-color="#ff5757,#8c52ff" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff5757] to-[#8c52ff]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#5170ff,#ff66c4'>
                                                <div data-color="#5170ff,#ff66c4" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#5170ff] to-[#ff66c4]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#004aad,#cb6ce6'>
                                                <div data-color="#004aad,#cb6ce6" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#004aad] to-[#cb6ce6]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#8c52ff,#5ce1e6'>
                                                <div data-color="#8c52ff,#5ce1e6" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff66c4,#ffcbcb'>
                                                <div data-color="#ff66c4,#ffcbcb" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff66c4] to-[#ffcbcb]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#0cc0df,#ffde59'>
                                                <div data-color="#0cc0df,#ffde59" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#0cc0df] to-[#ffde59]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ffde59,#ff914d'>
                                                <div data-color="#ffde59,#ff914d" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ffde59] to-[#ff914d]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff914d,#ffcbcb'>
                                                <div data-color="#ff914d,#ffcbcb" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff914d] to-[#ffcbcb]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#ff66c4,#ffde59'>
                                                <div data-color="#ff66c4,#ffde59" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff66c4] to-[#ffde59]" ></div>
                                            </TooltipTrigger>
                                            <TooltipTrigger tip='#8c52ff,#ff914d'>
                                                <div data-color="#8c52ff,#ff914d" className="w-[25px] h-[25px] rounded shadow-radio cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#8c52ff] to-[#ff914d]" ></div>
                                            </TooltipTrigger>






                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>

            </Toolbar.ToggleGroup>
            <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
        </Toolbar.Root>
    )
};

export default qwikify$(CommonAttr, { eagerness: 'idle' });
export const Tooltip = qwikify$(TooltipTrigger, { eagerness: 'idle' });