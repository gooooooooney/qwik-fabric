import { component$ } from "@builder.io/qwik";
import Template from "./Template";
import { useAttrCtx } from "~/use/useAttrCtx";
import ImageAside from "./ImageAside";
import TextAside from "./TextAside";
import ShapeAside from "./ShapeAside";
import { ColorAside } from "./Color";

export default component$(() => {

    const attrState = useAttrCtx()

    switch (true) {
        case attrState.shouldShowTemplate:
            return <Template />
        case attrState.shouldShowImage:
            return <ImageAside />
        case attrState.shouldShowText:
            return <TextAside />
        case attrState.shouldShowShape:
            return <ShapeAside />
        case attrState.shouldShowColor:
            return <ColorAside />
        default:
            return null
    }

    // return <>
    //     {
    //         attrState.shouldShowTemplate && <Template />
    //     }
    //     {
    //         attrState.shouldShowImage && <ImageAside />
    //     }
    // </>
})