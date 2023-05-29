/**
 * Augments canvas by assigning to `onObjectMove` and `onAfterRender`.
 * This kind of sucks because other code using those methods will stop functioning.
 * Need to fix it by replacing callbacks with pub/sub kind of subscription model.
 * (or maybe use existing fabric.util.fire/observe (if it won't be too slow))
 */
import * as fabric from 'fabric';

export function initCenteringGuidelines(canvas: fabric.Canvas) {

  const canvasWidth = canvas.getWidth(),
    canvasHeight = canvas.getHeight(),
    canvasWidthCenter = canvasWidth / 2,
    canvasHeightCenter = canvasHeight / 2,
    canvasWidthCenterMap: Record<string, boolean> = {},
    canvasHeightCenterMap: Record<string, boolean> = {},
    centerLineMargin = 4,
    centerLineColor = 'rgb(80,210,194)',
    centerLineWidth = 1,
    aligningLineDash = [5],
    ctx = canvas.getSelectionContext();
  let viewportTransform: number[] | undefined;

  for (let i = canvasWidthCenter - centerLineMargin, len = canvasWidthCenter + centerLineMargin; i <= len; i++) {
    canvasWidthCenterMap[Math.round(i)] = true;
  }
  for (let i = canvasHeightCenter - centerLineMargin, len = canvasHeightCenter + centerLineMargin; i <= len; i++) {
    canvasHeightCenterMap[Math.round(i)] = true;
  }

  function showVerticalCenterLine() {
    showCenterLine(canvasWidthCenter + 0.5, 0, canvasWidthCenter + 0.5, canvasHeight);
  }

  function showHorizontalCenterLine() {
    showCenterLine(0, canvasHeightCenter + 0.5, canvasWidth, canvasHeightCenter + 0.5);
  }

  function showCenterLine(x1: number, y1: number, x2: number, y2: number) {
    if (viewportTransform === undefined) return;
    // ctx.save();
    // ctx.strokeStyle = centerLineColor;
    // ctx.lineWidth = centerLineWidth;
    // ctx.setLineDash(aligningLineDash);
    // ctx.beginPath();
    // ctx.moveTo(x1 * viewportTransform[0], y1 * viewportTransform[3]);
    // ctx.lineTo(x2 * viewportTransform[0], y2 * viewportTransform[3]);
    // ctx.stroke();
    // ctx.restore();

    const originXY = fabric.util.transformPoint(new fabric.Point(x1, y1), canvas.viewportTransform),
      dimensions = fabric.util.transformPoint(new fabric.Point(x2, y2), canvas.viewportTransform);
    ctx.save()
    ctx.lineWidth = centerLineWidth
    ctx.strokeStyle = centerLineColor
    ctx.setLineDash(aligningLineDash);
    ctx.beginPath()

    ctx.moveTo(
      ((originXY.x)),
      ((originXY.y))
    )


    ctx.lineTo(
      ((dimensions.x)),
      ((dimensions.y))
    )
    ctx.stroke()
    ctx.restore()
  }

  let isInVerticalCenter: boolean | null,
    isInHorizontalCenter: boolean | null;

  canvas.on('mouse:down', function () {
    viewportTransform = canvas.viewportTransform;
  });

  canvas.on('object:moving', function (e) {
    const object = e.target,
      objectCenter = object.getCenterPoint(),
      transform = canvas._currentTransform;

    if (!transform) return;

    isInVerticalCenter = Math.round(objectCenter.x) in canvasWidthCenterMap,
      isInHorizontalCenter = Math.round(objectCenter.y) in canvasHeightCenterMap;

    if (isInHorizontalCenter || isInVerticalCenter) {
      object.setPositionByOrigin(new fabric.Point((isInVerticalCenter ? canvasWidthCenter : objectCenter.x), (isInHorizontalCenter ? canvasHeightCenter : objectCenter.y)), 'center', 'center');
    }
  });

  canvas.on('before:render', function () {
    canvas.clearContext(canvas.contextTop);
  });

  canvas.on('after:render', function () {
    if (isInVerticalCenter) {
      showVerticalCenterLine();
    }
    if (isInHorizontalCenter) {
      showHorizontalCenterLine();
    }
  });

  canvas.on('mouse:up', function () {
    // clear these values, to stop drawing guidelines once mouse is up
    isInVerticalCenter = isInHorizontalCenter = null;
    canvas.renderAll();
  });
}