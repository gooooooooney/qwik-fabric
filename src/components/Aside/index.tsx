import { component$ } from "@builder.io/qwik";
import { useTemplateCtx } from "~/use/useTemplateCtx";
import Template from "./Template";

export default component$(() => {

  const tmpState = useTemplateCtx()

  return <>
    {/* <div class="absolute top-0 left-2% min-w-xs shadow-radix rounded overflow-y-auto h-2xl bg-white"> */}
      {
        tmpState.shouldShowTemplate && <Template />
      }
    {/* </div> */}
  </>
})