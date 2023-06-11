import { Fragment, component$, useComputed$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useAttrCtx } from "~/use/useAttrCtx";
import { useCanvasCtx } from "~/use/useCanvasCtx";
import { blockInfoList } from "../core/components";
import Tooltip from "../ui/Tooltip/Tooltip";
import { ComponentType } from "~/constants/enum";
import { TextIcon } from "../ui/Icons/Text";
import { CircleIcon } from "../ui/Icons/Circle";
import { ImageIcon } from "../ui/Icons/Image";
import { SquareIcon } from "../ui/Icons/Squar";


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

export const Separator = component$(() => {
    return <div data-orientation="vertical" aria-orientation="vertical" role="separator" class="w-[1px] bg-#e4e2e4 mx-[10px]"></div>
})

export const Toolbar = component$(() => {
    const state = useCanvasCtx()
    const attrState = useAttrCtx()
    const draggableRef = useSignal<HTMLElement>();
    const fill = useComputed$(() => {
        const f = state.activeElements?.length ? (state.currentBlock[0]?.fill as string)?.split(',') : state.canvasStyleData.backgroundColor?.split(",")
        return f
    })


    useVisibleTask$(({ cleanup }) => {
        const dragStart = (e: DragEvent) => {
            const target = e.target;
            if (!(target instanceof HTMLDivElement && target.dataset.type)) return
            e.dataTransfer?.setData("type", target.dataset.type ?? ComponentType.Text)

        }
        draggableRef.value?.addEventListener('dragstart', dragStart)

        cleanup(() => {
            draggableRef.value?.removeEventListener('dragstart', dragStart)
        })
    })
    return <>
        <div style={{ outline: 'none' }} class="flex p-2 min-w-max rounded-md bg-white shadow-[0_2px_10px] shadow-radix justify-between items-center">
            <div class="flex">
                <div>
                    <span
                        onClick$={() => attrState.shouldShowColor = true}
                        class=" h-[25px] w-[25px] flex justify-center items-center rounded  border-shape cursor-pointer hover:opacity-80 "
                        style={{ background: fill.value.length > 1 ? 'linear-gradient(to right,' + fill.value.join(",") + ')' : fill.value[0] }}
                    >
                    </span>
                </div>
                <Separator />
                <div class="flex" ref={draggableRef}>
                    {
                        blockInfoList.map((comp, index) => (
                            <Fragment key={comp.type + index}>
                                <div onClick$={() => {
                                    switch (comp.type) {
                                        case ComponentType.Img:
                                            attrState.shouldShowImage = true
                                            break
                                        case ComponentType.TextBox:
                                            attrState.shouldShowText = true
                                            break
                                        case ComponentType.Circle:
                                        case ComponentType.Rect:
                                            attrState.shouldShowShape = true
                                            break
                                        default:
                                            return
                                    }
                                }} >
                                    <Tooltip tip={comp.type}>

                                        <div data-id={comp.id} draggable id={comp.type} data-type={comp.type} class="active-cursor-grabbing cursor-grab h-[25px] w-[25px] flex justify-center items-center rounded  border-shape cursor-pointer hover:opacity-80 ">
                                            {getIcon(comp.type)}
                                        </div>
                                    </Tooltip>
                                </div>
                                <Separator />
                            </Fragment>

                        ))
                    }
                </div>

            </div >
        </div>
    </>
})

