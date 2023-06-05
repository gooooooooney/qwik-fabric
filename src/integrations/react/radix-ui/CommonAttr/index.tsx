/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsxImportSource react */
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import React from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import { qwikify$ } from '@builder.io/qwik-react';
import * as Popover from '@radix-ui/react-popover';
import * as TooltipCom from '@radix-ui/react-tooltip';
import * as ColorPicker from 'react-color'
// import "./index.css"
import {
    ColorWheelIcon,
    PlusIcon,
    TextIcon,
    ImageIcon,
    CircleIcon,
    SquareIcon,
    MixerHorizontalIcon,
    Cross2Icon,
    MobileIcon,
    Component2Icon,
    DimensionsIcon
} from '@radix-ui/react-icons';
import { cx } from '~/utils/common';
import { hexToRgb } from '~/utils/style';
import { ComponentType } from '~/constants/enum';
import { blockInfoList } from '~/components/core/components';


interface ShadowProps {
    color: string,
    blur: number,
    offsetX: number,
    offsetY: number,
}
interface CommonAttrProps {
    fill: string[];
    canvasWidth: number
    canvasHeight: number
    isElement: boolean;
    shadow: ShadowProps | null;
    onChangeColor: (value: string[]) => void;
    onChangeCanvasSize: ({ width, height }: { width: number, height: number }) => void
    onShadowValueChange: (shadow: ShadowProps | null) => void
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
interface PopoverProps extends PropsWithChildren, Popover.PopoverContentProps {
    contentClass?: string,
    triggerClass?: string,
    trigger: React.ReactNode,
    tip: string
}

const getIcon = (iconName: ComponentType) => {
    switch (iconName) {
        case ComponentType.TextBox:
            return <TextIcon />
        case ComponentType.Img:
            return <ImageIcon />
        case ComponentType.Circle:
            return <CircleIcon />
        case ComponentType.Rect:
            return <SquareIcon />

    }

}

const PopoverCom = React.forwardRef<HTMLDivElement, PopoverProps>(({ trigger, triggerClass, tip, children, contentClass, side = "left" }, forwardedRef) => {
    return (
        <Popover.Root>
            <Popover.Trigger className={cx(triggerClass)}>
                <TooltipTrigger tip={tip}>
                    {trigger}
                </TooltipTrigger>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    side={side}
                    className={cx('w-[250px] max-w-2xl bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] ', contentClass)}
                    sideOffset={5}
                >
                    {children}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
})

const SolidColors = () => <>
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
</>

const GradientColors = () => <>
    <div
        className="flex py-2 flex-wrap gap-x-4 gap-y-1 flex-col"
    >
        <label className='text-[#0d1216b3] text-xs'>
            Gradients
        </label>
        <div className="flex flex-wrap ">

            <TooltipTrigger tip='#000000,#737373'>
                <div data-color="#000000,#737373" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#737373]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#000000,#c89116'>
                <div data-color="#000000,#c89116" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#c89116]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#000000,#3533cd'>
                <div data-color="#000000,#3533cd" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#3533cd]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#a6a6a6,#3533cd'>
                <div data-color="#a6a6a6,#3533cd" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#a6a6a6] to-[#3533cd]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ffa7ad,#ffa9f9'>
                <div data-color="#ffa7ad,#ffa9f9" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ffa7ad] to-[#ffa9f9]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#cdffd8,#94b9ff'>
                <div data-color="#cdffd8,#94b9ff" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#cdffd8] to-[#94b9ff]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff9a9e,#fad0c4'>
                <div data-color="#ff9a9e,#fad0c4" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff3131,#ff914d'>
                <div data-color="#ff3131,#ff914d" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff3131] to-[#ff914d]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff5757,#8c52ff'>
                <div data-color="#ff5757,#8c52ff" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff5757] to-[#8c52ff]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#5170ff,#ff66c4'>
                <div data-color="#5170ff,#ff66c4" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#5170ff] to-[#ff66c4]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#004aad,#cb6ce6'>
                <div data-color="#004aad,#cb6ce6" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#004aad] to-[#cb6ce6]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#8c52ff,#5ce1e6'>
                <div data-color="#8c52ff,#5ce1e6" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff66c4,#ffcbcb'>
                <div data-color="#ff66c4,#ffcbcb" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff66c4] to-[#ffcbcb]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#0cc0df,#ffde59'>
                <div data-color="#0cc0df,#ffde59" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#0cc0df] to-[#ffde59]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ffde59,#ff914d'>
                <div data-color="#ffde59,#ff914d" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ffde59] to-[#ff914d]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff914d,#ffcbcb'>
                <div data-color="#ff914d,#ffcbcb" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff914d] to-[#ffcbcb]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff66c4,#ffde59'>
                <div data-color="#ff66c4,#ffde59" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff66c4] to-[#ffde59]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#8c52ff,#ff914d'>
                <div data-color="#8c52ff,#ff914d" className="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#8c52ff] to-[#ff914d]" ></div>
            </TooltipTrigger>






        </div>
    </div>
</>


const CommonAttr = ({
    fill,
    onChangeColor,
    shadow,
    onShadowValueChange,
    isElement,
    canvasWidth,
    canvasHeight,
    onChangeCanvasSize
}: CommonAttrProps) => {
    const defaultShadow = {
        color: 'rgba(0,0,0)',
        blur: 10,
        offsetX: 20,
        offsetY: 20,
    };

    const rgx = /^rgba\(((,?\s*\d+){3}).+$/
    const [transparency, setTransparency] = React.useState(100)
    const [displayColorPicker, setDisplayColorPicker] = React.useState(false)
    const [displayShadowColorPicker, setDisplayShadowColorPicker] = React.useState(false)
    const [currentColor, setCurrentColor] = React.useState(fill[0])
    const [currentColorIndex, setCurrentColorIndex] = React.useState(0)
    const [colors, setColors] = React.useState(fill)
    const [shadowState, setShadowState] = React.useState<ShadowProps | null>(shadow || defaultShadow)
    const [width, setWidth] = React.useState(canvasWidth)
    const [height, setHeight] = React.useState(canvasHeight)
    useEffect(() => {
        // if (width === canvasWidth && height === canvasHeight) {
        //     return
        // }
        onChangeCanvasSize({ width, height })

    }, [width, height])
    useEffect(() => {
        shadowState && setShadowState({
            ...shadowState,
            color: shadowState.color.replace(rgx, `rgba($1,${transparency / 100})`)
        })
    }, [transparency])
    useEffect(() => {
        onChangeColor(colors)
    }, [colors])
    useEffect(() => {
        isElement && onShadowValueChange(shadowState)
    }, [shadowState])

    useEffect(() => {
        shadow && setShadowState(shadow)
    }, [shadow])
    useEffect(() => {
        setColors(fill)
    }, [fill])

    return (
        <Toolbar.Root
            className="flex p-2 min-w-max rounded-md bg-white shadow-[0_2px_10px] shadow-radix justify-between items-center"
            aria-label="Formatting options"
        >

            <div className="flex">
                <Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">

                    <PopoverCom contentClass='PopoverContent' tip="Change color" trigger={
                        <span
                            className=" h-[25px] w-[25px] flex justify-center items-center rounded  border-shape cursor-pointer hover:opacity-80 "
                            style={{ background: fill.length > 1 ? 'linear-gradient(to right,' + fill.join(",") + ')' : fill[0] }}
                        >
                        </span>
                    }>
                        <div onClick={e => {
                            const color = (e.target as HTMLDivElement).getAttribute('data-color')
                            if (color) {
                                setColors(color.split(","))
                            }
                        }}>
                            <div>


                            </div>
                            <div className=' relative'>
                                <div className='flex pb-2 items-center '>
                                    Current color
                                </div>

                                <div className="flex py-2 items-center gap-x-2">
                                    <TooltipTrigger tip='add a new color'>
                                        <div
                                            onClick={() => {
                                                setCurrentColor(fill[0])
                                                setCurrentColorIndex(-1)
                                                setDisplayColorPicker(true)
                                            }}
                                            className="h-[25px] w-[25px] flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 "
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
                                                    className="mt-0!  h-[25px] w-[25px] flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 "
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
                                                <ColorPicker.ChromePicker
                                                    onChangeComplete={(color) => {
                                                        const hexColor = color.hex
                                                        setCurrentColor(hexColor)
                                                        if (currentColorIndex == -1) {
                                                            setColors([...colors, hexColor])
                                                            setCurrentColorIndex(colors.length)
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
                                <div className=' flex items-center '>
                                    <ColorWheelIcon className='mr-2' />
                                    Default color</div>
                                <SolidColors />
                                <GradientColors />

                            </div>
                        </div>
                    </PopoverCom>

                </Toolbar.ToggleGroup>

                <Toolbar.Separator className="w-[1px] bg-#e4e2e4 mx-[10px]" />


                {
                    blockInfoList.map((comp, index) => (
                        <Fragment key={comp.type + index}>
                            <Toolbar.ToggleGroup onDragStart={(e) => {
                                const target = e.target;
                                if (!(target instanceof HTMLDivElement)) return
                                e.dataTransfer?.setData("type", target.dataset.type ?? ComponentType.Text)
                            }} type="single" defaultValue="center" aria-label="Text alignment">
                                <TooltipTrigger tip={comp.type}>

                                    <div data-id={comp.id} draggable id={comp.type} data-type={comp.type} className="active-cursor-grabbing cursor-grab h-[25px] w-[25px] flex justify-center items-center rounded  border-shape cursor-pointer hover:opacity-80 ">
                                        {getIcon(comp.type)}
                                    </div>
                                </TooltipTrigger>
                            </Toolbar.ToggleGroup>
                            <Toolbar.Separator className="w-[1px] bg-#e4e2e4 mx-[10px]" />
                        </Fragment>

                    ))
                }

                {
                    isElement ?
                        <Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">


                            <PopoverCom contentClass='PopoverContent' tip="Effects" trigger={
                                // <ShadowIcon className='h-[25px] w-[25px] flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 ' />
                                <span
                                    className=" transition h-[25px] bg-[#394c6026] px-2 flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 "
                                >
                                    Effects
                                </span>
                            }>
                                <div>
                                    <div className='relative'>
                                        <div className='flex pb-2 items-center '>
                                            Style
                                        </div>
                                        <div data-orientation="vertical" aria-orientation="vertical" role="separator" className="w-full h-1px bg-#e4e2e4 my-[10px]"></div>
                                        <div>
                                            <div className="grid gap-x-4 grid-cols-4">
                                                <div
                                                    onClick={() => {
                                                        setShadowState(null)

                                                        onShadowValueChange(null)
                                                    }}
                                                    className="flex flex-col items-center">
                                                    <div
                                                        className={cx('transition  hover:shadow-[0_0_0_2px_#2b3b4a4d] w-[45px]  cursor-pointer shadow-[0_0_0_1px_#2b3b4a4d] text-xl h-[45px] rounded flex items-center justify-center', { 'shadow-[0_0_0_2px_violet]': shadow && !shadowState })}>A</div>
                                                    <p className="mt-2">None</p>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setShadowState(defaultShadow)
                                                    }}
                                                    className="flex flex-col items-center ">
                                                    <div
                                                        className={cx('transition  hover:shadow-[0_0_0_2px_#2b3b4a4d] w-[45px]  cursor-pointer shadow-[0_0_0_1px_#2b3b4a4d] text-xl h-[45px] rounded flex items-center justify-center', { 'shadow-[0_0_0_2px_violet]': shadow && !!shadowState })}>
                                                        <p style={{ textShadow: 'rgb(0, 0, 0) 9px 8px 3px' }}>A</p>
                                                    </div>
                                                    <p className="mt-2">Shadow</p>
                                                </div>
                                            </div>

                                        </div>
                                        {
                                            shadowState ?
                                                <div>
                                                    <div>
                                                        <div className="flex mt-4 justify-between">
                                                            <div>OffsetX</div>
                                                            <input type="number" onChange={e => {
                                                                setShadowState({ ...shadowState, offsetX: e.target.valueAsNumber })
                                                            }} value={shadowState.offsetX} max={50} min={-50} />
                                                        </div>
                                                        <div>
                                                            <input
                                                                style={{
                                                                    backgroundSize: `${shadowState.offsetX + 50}% 100%`
                                                                }}
                                                                type="range"
                                                                step={1}
                                                                value={shadowState.offsetX}
                                                                onChange={(e) => {
                                                                    setShadowState({ ...shadowState, offsetX: e.target.valueAsNumber })
                                                                }} max={50} min={-50} name="" id="" />
                                                        </div>

                                                    </div>
                                                    <div>
                                                        <div className="flex mt-4 justify-between">
                                                            <div>OffsetY</div>
                                                            <input type="number"
                                                                onChange={e => {
                                                                    setShadowState({ ...shadowState, offsetY: e.target.valueAsNumber })
                                                                }} value={shadowState.offsetY} max={50} min={-50} />
                                                        </div>

                                                        <input
                                                            style={{
                                                                backgroundSize: `${shadowState.offsetY + 50}% 100%`
                                                            }}
                                                            type="range"
                                                            step={1}
                                                            value={shadowState.offsetY}
                                                            onChange={(e) => {
                                                                setShadowState({ ...shadowState, offsetY: e.target.valueAsNumber })
                                                            }} max={50} min={-50} name="" id="" />

                                                    </div>
                                                    <div>
                                                        <div className="flex mt-4 justify-between">
                                                            <div>Blur</div>
                                                            <input type="number"
                                                                onChange={e => {
                                                                    setShadowState({ ...shadowState, blur: e.target.valueAsNumber })
                                                                }} value={shadowState.blur} max={50} min={-50} />
                                                        </div>

                                                        <input
                                                            style={{
                                                                backgroundSize: `${shadowState.blur}% 100%`
                                                            }}
                                                            type="range"
                                                            step={1}
                                                            value={shadowState.blur}
                                                            onChange={(e) => {
                                                                setShadowState({ ...shadowState, blur: e.target.valueAsNumber })
                                                            }} max={100} min={0} name="" id="" />

                                                    </div>
                                                    <div>
                                                        <div className="flex mt-4 justify-between">
                                                            <div>Transparency</div>
                                                            <input type="number"
                                                                onChange={e => {
                                                                    setTransparency(e.target.valueAsNumber)
                                                                }} value={transparency} max={50} min={-50} />
                                                        </div>

                                                        <input
                                                            style={{
                                                                backgroundSize: `${transparency}% 100%`
                                                            }}
                                                            type="range"
                                                            step={1}
                                                            value={transparency}
                                                            onChange={(e) => {
                                                                setTransparency(e.target.valueAsNumber)
                                                            }} max={100} min={0} name="" id="" />

                                                    </div>
                                                    <div className="flex justify-between items-center my-2">
                                                        <div className='flex items-center '>
                                                            Shadow Color
                                                        </div>
                                                        <PopoverCom contentClass='PopoverContent' tip="Change color" trigger={
                                                            <span
                                                                className=" h-[25px] w-[25px] flex justify-center items-center rounded shadow-radix cursor-pointer hover:opacity-80 "
                                                                style={{ background: shadowState.color.replace(rgx, `rgb($1)`) }}
                                                            >
                                                            </span>
                                                        }>
                                                            <div onClick={e => {
                                                                const color = (e.target as HTMLDivElement).getAttribute('data-color')

                                                                if (color) {
                                                                    if (color.startsWith('#')) {
                                                                        const rgb = hexToRgb(color)
                                                                        if (rgb) {
                                                                            setShadowState({
                                                                                ...shadowState,
                                                                                color: `rgba(${rgb.r},${rgb.g},${rgb.b},${transparency / 100})`
                                                                            })
                                                                        }
                                                                    }
                                                                }
                                                            }}>
                                                                <div>


                                                                </div>
                                                                <div className='px-4 py-2 relative'>
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
                                                                                data-color={shadowState.color}
                                                                                style={{ background: shadowState.color }}
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
                                                                                            setShadowState({
                                                                                                ...shadowState,
                                                                                                color: `rgba(${rgb.r},${rgb.g},${rgb.b},${transparency / 100})`
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
                                                                    <SolidColors />

                                                                </div>
                                                            </div>
                                                        </PopoverCom>
                                                    </div>
                                                </div>
                                                : null
                                        }

                                    </div>
                                </div>
                            </PopoverCom>


                        </Toolbar.ToggleGroup>
                        : null
                }
            </div>


            <div className="flex">
                <Toolbar.Button className='ml-auto'>
                    <TooltipTrigger tip="Template">
                        <span className="h-[25px] w-[25px] flex justify-center items-center rounded  border-shape cursor-pointer hover:opacity-80 " aria-label="template">
                            <Component2Icon />
                        </span>
                    </TooltipTrigger>
                </Toolbar.Button>
                <Toolbar.Separator className="w-[1px] bg-#e4e2e4 mx-[10px]" />

                <Toolbar.Button asChild className='ml-auto'>
                    <PopoverCom
                        side="right"
                        triggerClass="ml-auto"
                        contentClass='PopoverContent'
                        tip="Canvas dimensions"
                        trigger={
                            <span className="h-[25px] w-[25px] flex justify-center items-center rounded  border-shape cursor-pointer hover:opacity-80 " aria-label="Update dimensions">
                                <DimensionsIcon />
                            </span>
                        }>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <p className="Text" style={{ marginBottom: 10 }}>
                                Dimensions
                            </p>
                            <div>
                                {/* <span onClick={() => {
                                setWidth(1920)
                                setHeight(1080)
                            }} className="block w-15px cursor-pointer h-15px">
                                <DesktopIcon />
                            </span> */}
                                <span onClick={() => {
                                    setWidth(390)
                                    setHeight(844)
                                }} className="block w-15px cursor-pointer h-15px">
                                    <MobileIcon />
                                </span>
                            </div>
                            <div>
                                Custom
                            </div>
                            <fieldset className="Fieldset">
                                <label className="Label" htmlFor="width">
                                    Width
                                </label>
                                <input className="Input"
                                    onChange={e => {
                                        setWidth(e.target.valueAsNumber)
                                    }}
                                    type="number"
                                    id="width" value={width} />
                            </fieldset>

                            <fieldset className="Fieldset">
                                <label className="Label" htmlFor="height">
                                    Height
                                </label>
                                <input
                                    type="number"
                                    className="Input"
                                    onChange={e => {
                                        setHeight(e.target.valueAsNumber)
                                    }}
                                    id="height"
                                    value={height} />
                            </fieldset>

                        </div>
                        <Popover.Close className="PopoverClose" aria-label="Close">
                            <Cross2Icon />
                        </Popover.Close>
                        <Popover.Arrow className="PopoverArrow" />
                    </PopoverCom>
                </Toolbar.Button>
            </div>

        </Toolbar.Root>
    )
};

export default qwikify$(CommonAttr, { eagerness: 'idle' });
export const Tooltip = qwikify$(TooltipTrigger, { eagerness: 'idle' });