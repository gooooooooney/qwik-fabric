import { fabric } from "~/element";


type TLocation = NonNullable<ReturnType<typeof getLocation>>[]
interface VerticalLine {
  from: fabric.Point;
  to: fabric.Point;
}

interface HorizontalLine {
  x: number;
  x2: number;
  y: number;
}

let viewportTransform: number[] | undefined;

const aligningLineWidth = 1;
const aligningLineColor = 'rgb(80,210,194)';
const aligningLineDash = [5];

function getLocation(object: fabric.BaseFabricObject) {
  if (viewportTransform == null) return null;
  const objectBoundingRect = object.getBoundingRect();
  const objectHeight = objectBoundingRect.height / viewportTransform[3];
  const objectWidth = objectBoundingRect.width / viewportTransform[0];
  const center = object.getCenterPoint()
  // 
  // --------------------------------------> x
  // |  (x,y)tl            (x2, y2)tr
  // |  .-----------------------.
  // |  |                       |
  // |  |           .-----------|--> center
  // |  |                       |
  // |  .-----------------------.
  // |  (x3, y3)bl       (x4, y4)br
  // |
  // |
  // v
  // y
  return {
    ...getCoords(object),
    width: objectWidth,
    height: objectHeight,
    center
  }

}

function getCoords(obj: fabric.BaseFabricObject) {
  const [tl, tr, br, bl] = obj.getCoords(true)
  return { tl, tr, br, bl }
}

export function guideLines(canvas: fabric.Canvas) {


  const lines: fabric.Line[] = []
  const threshold = 4
  let verticalLines: VerticalLine[] = [];
  let horizontalLines: HorizontalLine[] = [];




  function drawVerticalLine(coords: VerticalLine) {
    drawLine(
      coords.from,
      coords.to
    );
  }

  function getLocations(objects: fabric.BaseFabricObject[], target: fabric.Object) {
    const movingLocation = getLocation(target)!;
    const locations = objects.map(object => target !== object && getLocation(object) || null).filter(Boolean) as TLocation;
    return {
      movingLocation,
      locations
    }
  }

  function isInRange(a: number, b: number) {
    return Math.abs(Math.round(a) - Math.round(b)) <= threshold
  }

  // function calcCenterPointByACoords(coords: NonNullable<fabric.BaseFabricObject['aCoords']>) {
  //   return getPoint((coords.tl.x + coords.br.x) / 2, (coords.tl.y + coords.br.y) / 2)
  // }

  function drawLine({ x: x1, y: y1 }: fabric.Point, { x: x2, y: y2 }: fabric.Point) {
    const ctx = canvas.getSelectionContext();
    if (viewportTransform == null) return;
    // https://stackoverflow.com/questions/62906060/fabric-js-snapping-guidelines-not-correctly-positioned-when-zoomed
    const originXY = fabric.util.transformPoint(new fabric.Point(x1, y1), canvas.viewportTransform),
      dimensions = fabric.util.transformPoint(new fabric.Point(x2, y2), canvas.viewportTransform);
    ctx.save()
    ctx.lineWidth = aligningLineWidth
    ctx.strokeStyle = aligningLineColor
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

  function getPoint(x: number, y: number) {
    return new fabric.Point(x, y)
  }

  function removeLines(canvas: fabric.Canvas) {
    if (lines.length === 0) return
    lines.forEach(line => {
      canvas.remove(line)
    })
    canvas.requestRenderAll()
  }

  canvas.on('mouse:down', () => {
    viewportTransform = canvas.viewportTransform;
  });

  canvas.on('object:moving', function (e) {
    const movingTarget = e.target;
    if (viewportTransform === undefined || movingTarget === undefined) return;


    const objects = canvas.getObjects();
    const { movingLocation, locations } = getLocations(objects, movingTarget)
    removeLines(canvas)
    locations.forEach(location => {

      // ------------> x
      // | in this case, movingLocation's y is longer than location's y
      // |   |
      // |   | (x, y)
      // |   .--------
      // |   | (2,5) | location
      // |   |---- --- 
      // |   |movingLocation.x    
      // |   |
      // |   | (x, y)
      // |   |---------- 
      // |   |          | movingLocation
      // |   |----------
      // |   | (x, y3)
      // |   |
      // |   
      // v
      // y
      {
        if (isInRange(location.center.x, movingLocation.center.x)) {
          // cross the whole canvas
          // const fromPoint = getPoint(movingLocation.x, 0)
          // const toPoint = getPoint(movingLocation.x, canvas.height)
          // const fromPoint = movingLocation.y - location.y > 0 ? getPoint(movingLocation.x, location.y) : getPoint(movingLocation.x, movingLocation.y3)
          const fromPoint = getPoint(location.center.x, 0)
          const toPoint = getPoint(location.center.x, canvas.height)
          verticalLines.push({
            from: fromPoint,
            to: toPoint
          })
          movingTarget.setXY(
            new fabric.Point(location.center.x, movingLocation.center.y),
            'center',
            'center')
        }
        // ------------> x
        // | in this case, movingLocation's y is longer than location's y
        // |   |
        // |   | (x, y)
        // |   .--------
        // |   | (2,5) | location
        // |   |---- --- 
        // |   |movingLocation.x    
        // |   |
        // |   | (x, y)
        // |   |---------- 
        // |   |          | movingLocation
        // |   |----------
        // |   | (x, y3)
        // |   |
        // |   
        // v
        // y
        if (isInRange(location.center.x - location.width / 2, movingLocation.center.x - movingLocation.width / 2)) {
          const fromPoint = getPoint(location.tl.x, Math.min(location.bl.y, movingLocation.bl.y))
          const toPoint = getPoint(location.tl.x, Math.max(location.tl.y, movingLocation.tl.y))
          verticalLines.push({
            from: fromPoint,
            to: toPoint
          })
          const x = location.center.x - location.width / 2 + movingLocation.width / 2
          movingTarget.setXY(
            new fabric.Point(x, movingLocation.center.y),
            'center',
            'center')
        }

        // ------------> x
        // | in this case, movingLocation's y is longer than location's y
        // |        |
        // | (x, y) |    (x2,y2)
        // |        .---.
        // |        |   | location
        // |(x3,y3) .---. (x4,y4)  
        // |        |movingLocation.x    
        // |        |
        // | (x,y)  | (x2, y2)
        // |   .----.
        // |   |    | movingLocation
        // |   -----.
        // |        | (x4, y4)
        // |        |
        // |   
        // v
        // y

      }

    })

  })


  canvas.on('after:render', () => {
    for (let i = verticalLines.length; i--;) {
      drawVerticalLine(verticalLines[i]);
    }

    // noinspection NestedAssignmentJS
    verticalLines.length = 0;
    horizontalLines.length = 0;
  });

  canvas.on('before:render', () => {
    try {
      canvas.clearContext(canvas.contextTop);
    } catch (error) {
      console.log(error);
    }
  });

  canvas.on('mouse:up', () => {
    verticalLines = [] as any;
    horizontalLines = [] as any;
    canvas.renderAll();
  })
}