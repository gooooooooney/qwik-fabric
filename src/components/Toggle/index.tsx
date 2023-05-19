import { Slot, component$ } from "@builder.io/qwik";
import { cx } from "~/utils/common";

interface ToggleProps {
  active: boolean
  width?: string
}

const Toggle = component$(({active, width}: ToggleProps) => {
  return <>
    <label
    style={{width}}
      class={cx("border-shape hover:bg-violet-1 p-2 mr-2 w-[20px] h-[20px] cursor-pointer flex justify-center items-center",
        { "bg-violet text-white hover:!bg-violet-5": active })}>
     <Slot />
    </label>
  </>
})

export default Toggle