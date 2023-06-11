import { useContext } from "@builder.io/qwik";
import { GLOBAL_CONTEXT } from "~/store/context";

export function useCanvasCtx() {
    return useContext(GLOBAL_CONTEXT)
}