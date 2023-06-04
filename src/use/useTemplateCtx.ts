import { useContext } from "@builder.io/qwik";
import { TEMPLATE_CONTEXT } from "~/store/template";

export function useTemplateCtx() {
    return useContext(TEMPLATE_CONTEXT);

}