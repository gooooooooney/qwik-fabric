/** @jsxImportSource react */
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { qwikify$ } from '@builder.io/qwik-react';
import * as Popover from '@radix-ui/react-popover';
import * as TooltipCom from '@radix-ui/react-tooltip';
// import "./index.css"
import {
    Cross2Icon,
    MobileIcon,
    DimensionsIcon
} from '@radix-ui/react-icons';
import { cx } from '~/utils/common';

interface DimensionsPopoverProps {
    canvasWidth: number
    canvasHeight: number
    onChangeCanvasSize: ({ width, height }: { width: number, height: number }) => void
}

interface TooltipTriggerProps extends PropsWithChildren {
    tip: string
}

export function TooltipTrigger({ children, tip }: TooltipTriggerProps) {
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



export const PopoverCom = React.forwardRef<HTMLDivElement, PopoverProps>(({ trigger, triggerClass, tip, children, contentClass, side = "left" }) => {
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


const _DimensionsPopover = ({
    canvasWidth,
    canvasHeight,
    onChangeCanvasSize,
}: DimensionsPopoverProps) => {


    const [width, setWidth] = React.useState(canvasWidth)
    const [height, setHeight] = React.useState(canvasHeight)
    useEffect(() => {
        setWidth(canvasWidth)
        setHeight(canvasHeight)

    }, [canvasWidth, canvasHeight])


    return (
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
                <div className="flex justify-end">
                    <button onClick={() => {
                        onChangeCanvasSize({ width, height })
                    }} className="Button bg-violet-4 cursor-pointer text-white">
                        confirm
                    </button>
                </div>
            </div>
            <Popover.Close className="PopoverClose" aria-label="Close">
                <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="PopoverArrow" />
        </PopoverCom>
    )
};

export const DimensionsPopover = qwikify$(_DimensionsPopover, {eagerness: 'idle'})