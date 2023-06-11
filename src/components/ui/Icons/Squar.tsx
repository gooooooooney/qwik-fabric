import type { QwikDOMAttributes} from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export const SquareIcon = component$((props: QwikDOMAttributes) => {
    return <svg 
    {...props}
    width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H1.5H13.5H14V1.5V13.5V14H13.5H1.5H1V13.5V1.5V1ZM2 2V13H13V2H2Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
})