import { fabric } from "~/element"

declare module 'fabric' {
    interface Canvas {
        isDragging: boolean;
        lastPosX: number;
        lastPosY: number;
    }
}

export function initMouseEvent(canvas: fabric.Canvas) {
    canvas.on('mouse:wheel', (opt) => {
        const delta = opt.e.deltaY; // 滚轮，向上滚一下是 -100，向下滚一下是 100
        let zoom = canvas.getZoom(); // 获取画布当前缩放值
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint(new fabric.Point({ x: opt.e.offsetX, y: opt.e.offsetY }), zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    })
    canvas.on('mouse:down', (opt) => {
        const evt = opt.e as MouseEvent;
        if (evt.altKey === true) {
            
            canvas.isDragging = true;
            canvas.selection = false;
            canvas.lastPosX = evt.clientX;
            canvas.lastPosY = evt.clientY;
        }
    })

    canvas.on('mouse:move', (opt) => {
        if (canvas.isDragging) {
            const e = opt.e as MouseEvent;
            canvas.defaultCursor = 'grabbing';
            if (!canvas.viewportTransform) return;
            const vpt = canvas.viewportTransform;
            vpt[4] += e.clientX - canvas.lastPosX;
            vpt[5] += e.clientY - canvas.lastPosY;
            canvas.requestRenderAll();
            canvas.lastPosX = e.clientX;
            canvas.lastPosY = e.clientY;
        }
    })

    canvas.on('mouse:up', () => {
        if (!canvas.viewportTransform) return;
         canvas.setViewportTransform(canvas.viewportTransform)
        canvas.isDragging = false;
        canvas.selection = true;
        canvas.defaultCursor = 'default';
    })
}