import { createContextId } from "@builder.io/qwik";
import { CONTEXT_IDS } from "~/constants/enum";

export interface TemplateCanvas {
    id?: number,
    canvasStyle?: {
        width: number,
        height: number,
    },
    src: string,
    data: {

        version: string,
        objects: any[],
        background: string | Record<string, any>
    },
}

export interface TemplateState {
    currentTmp: TemplateCanvas | null
    tmps: TemplateCanvas[]
}

export const TEMPLATE_CONTEXT = createContextId<TemplateState>(CONTEXT_IDS.TEMPLATE_CONTEXT)