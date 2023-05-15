import { component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { GLOBAL_CONTEXT } from "~/store/context";
import { changeStyleWithScale } from "~/utils/translate";

interface GridProps {
  width: number;
  height: number;
}
export default component$(({width = 1200, height = 740}: GridProps) => {
  const canvasRef = useSignal<HTMLCanvasElement>()
  useVisibleTask$(() => {
    const canvas = canvasRef.value
    const context = canvas!.getContext('2d')!;

    //初始化
    AutoCanvas();
    drawGrid('rgba(186, 186, 186, 0.5)', 10, 10);

    //窗口伸缩监听
    window.onresize = function () {
      AutoCanvas();
      drawGrid('rgba(186, 186, 186, 0.5)', 10, 10);
    };

    /**
    * 画网格
    * @param color 网格线颜色
    * @param stepX 格子横向间距
    * @param stepY 格子垂直间距
    */
    function drawGrid(color: string, stepX: number, stepY: number) {
      context.save();
      context.strokeStyle = color;
      context.lineWidth = 0.5;
      for (let i = stepX + 0.5;
        i < context.canvas.width; i += stepX) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
      }

      for (let i = stepY + 0.5;
        i < context.canvas.height; i += stepY) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
      }

      context.restore();
    }

    /**
    * 自动更改画布，当浏览器窗口大小改变当时候调用
    * @constructor
    */
    function AutoCanvas() {
      // canvas!.height = window.innerHeight;
      // canvas!.width = window.innerWidth;
    }
  })
  return <canvas id="canvas" class="absolute top-0 left-0 block"  width ={width}
  height={height}ref={canvasRef} ></canvas>
})