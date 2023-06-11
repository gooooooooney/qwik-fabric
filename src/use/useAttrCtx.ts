import { useContext, useVisibleTask$ } from "@builder.io/qwik";
import { ATTR_CONTEXT } from "~/store/attr";

export function useAttrCtx() {
    const state = useContext(ATTR_CONTEXT);
    useVisibleTask$(({track}) => {
        const bol = track(() => state.shouldShowImage)
        if (bol) {
            state.shouldShowTemplate = false
            state.shouldShowColor = false
            state.shouldShowText = false
            state.shouldShowShape = false
        }

    })
    useVisibleTask$(({track}) => {
        const bol = track(() => state.shouldShowTemplate)
        if (bol) {
            state.shouldShowImage = false
            state.shouldShowText = false
            state.shouldShowColor = false
            state.shouldShowShape = false
        }

    })
    useVisibleTask$(({track}) => {
        const bol = track(() => state.shouldShowText)
        if (bol) {
            state.shouldShowTemplate = false
            state.shouldShowImage = false
            state.shouldShowShape = false
            state.shouldShowColor = false
        }

    })
    useVisibleTask$(({track}) => {
        const bol = track(() => state.shouldShowShape)
        if (bol) {
            state.shouldShowTemplate = false
            state.shouldShowImage = false
            state.shouldShowText = false
            state.shouldShowColor = false
        }

    })
    useVisibleTask$(({track}) => {
        const bol = track(() => state.shouldShowColor)
        if (bol) {
            state.shouldShowTemplate = false
            state.shouldShowImage = false
            state.shouldShowText = false
            state.shouldShowShape = false

        }

    })
    return state


}