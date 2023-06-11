import { createContextId } from "@builder.io/qwik";
import { CONTEXT_IDS } from "~/constants/enum";


export interface AttrState {
    shouldShowTemplate: boolean
    shouldShowImage: boolean
    shouldShowText: boolean
    shouldShowShape: boolean
    shouldShowColor: boolean
}

export const ATTR_CONTEXT = createContextId<AttrState>(CONTEXT_IDS.ATTR_CONTEXT)