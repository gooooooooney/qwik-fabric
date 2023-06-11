import { Slot, component$ } from "@builder.io/qwik";

export const Toolbar = component$(() => {
    return <>
        <div style={{outline: 'none'}} class="flex p-2 min-w-max rounded-md bg-white shadow-[0_2px_10px] shadow-radix justify-between items-center">
            
        </div>
    </>
})

export const Separator = component$(() => {
    return <div data-orientation="vertical" aria-orientation="vertical" role="separator" class="w-[1px] bg-#e4e2e4 mx-[10px]"></div>
})