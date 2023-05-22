import { useSignal, useVisibleTask$} from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { ComponentType } from "~/constants/enum";
import { blockInfoList } from "../core/components";
import Icons from "~/integrations/react/radix-ui/Icons";

export default component$(() => {
    const draggableRef = useSignal<HTMLDivElement>();


    // FUCK: https://qwik.builder.io/docs/components/events/#synchronous-event-handling
    useVisibleTask$(({cleanup}) => {
        const handleDragStart = (e: DragEvent) => {
            const target = e.target;
            if (!(target instanceof HTMLDivElement)) return
            e.dataTransfer?.setData("type", target.dataset.type ?? ComponentType.Text)
        }
        draggableRef.value?.addEventListener('dragstart', handleDragStart)
        cleanup(() => {
            draggableRef.value?.removeEventListener('dragstart', handleDragStart)
        })
    })
    
    return (
        <div ref={draggableRef} class="flex-1 min-h-xl grid p-3 gap-10 grid-cols-3 shadow-radio bg-white rounded-md">
        {
            blockInfoList.map((comp) => (
                <div draggable id={comp.type} key={comp.type} data-type={comp.type} class="active-cursor-grabbing cursor-grab text-center rounded-md p-3 w-[10px] h-[10px] border border-solid border-coolGray flex justify-center items-center">
                    <Icons name={comp.type} />
                </div>
            ))
        }
    </div>
    )
})