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


function getLocation(object: fabric.BaseFabricObject) {
  if (viewportTransform == null) return null;
  const { left, top } = object;
  // const objectCenter = object.getCenterPoint();
  // const objectLeft = objectCenter.x;
  // const objectTop = objectCenter.y;
  const objectBoundingRect = object.getBoundingRect();
  const objectHeight = objectBoundingRect.height / viewportTransform[3];
  const objectWidth = objectBoundingRect.width / viewportTransform[0];
  const center = object.getCenterPoint()
  // 
  // --------------------------------------> x
  // |  (x=left,y=top)            (x2=x+width, y2=y)
  // |  .-----------------------.
  // |  |                       |
  // |  |           .-----------|--> center (x+width/2, y+height/2)
  // |  |                       |
  // |  .-----------------------.
  // |  (x3=x, y3=y+height)       (x4=x+width, y4=y+height)
  // |
  // |
  // v
  // y
  return {
    x: left,
    y: top,
    x2: left + objectWidth,
    y2: top,
    x3: left,
    y3: top + objectHeight,
    x4: left + objectWidth,
    y4: top + objectHeight,
    center
  }

}

export function guideLines(canvas: fabric.Canvas) {


  const lines: fabric.Line[] = []
  const threshold = 4
  const verticalLines: VerticalLine[] = [];
  const horizontalLines: HorizontalLine[] = [];




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
    return Math.abs(a - b) <= threshold
  }

  function drawLine(from: fabric.Point, to: fabric.Point) {
    const line = new fabric.Line([from.x, from.y, to.x, to.y], {
      stroke: 'red',
      strokeWidth: 1,
      selectable: false,
      evented: false
    })
    lines.push(line)
    canvas.add(line)
    canvas.requestRenderAll()
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

      // 水平线
      // ------------> x
      // | in this case, movingLocation's y is longer than location's y
      // |   |
      // |   | (x, y)
      // |   .----
      // |   |   | location
      // |   |----  
      // |   |movingLocation.x    
      // |   |
      // |   | (x, y)
      // |   .----
      // |   |   | movingLocation
      // |   .----
      // |   | (x, y3)
      // |   |
      // |   
      // v
      // y
      {
        if (isInRange(location.x, movingLocation.x)) {
          // cross the whole canvas
          // const fromPoint = getPoint(movingLocation.x, 0)
          // const toPoint = getPoint(movingLocation.x, canvas.height)
          const fromPoint = movingLocation.y - location.y > 0 ? getPoint(movingLocation.x, location.y) : getPoint(movingLocation.x, movingLocation.y3)
          const toPoint = movingLocation.y - location.y > 0 ? getPoint(movingLocation.x, movingLocation.y3) : getPoint(movingLocation.x, location.y3)
          verticalLines.push({
            from: fromPoint,
            to: toPoint
          })
          movingTarget.setPositionByOrigin(
            new fabric.Point(location.x, movingLocation.y),
            'left',
            'top')
        }

        // 水平线
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

        if (isInRange(movingLocation.x2, location.x)) {
          const fromPoint = movingLocation.y4 - location.y > 0 ? getPoint(location.x, location.y) : getPoint(movingLocation.x2, movingLocation.y2)
          const toPoint = movingLocation.y - location.y > 0 ? getPoint(movingLocation.x4, movingLocation.y4) : getPoint(location.x3, location.y3)
          // const fromPoint = movingLocation.x2 - location.x2 > 0 ? getPoint(movingLocation.x, 0)
          // const toPoint = getPoint(movingLocation.x, canvas.height)
          // console.log(fromPoint)
          // console.log(toPoint)
          verticalLines.push({
            from: fromPoint,
            to: toPoint
          })
          movingTarget.setPositionByOrigin(
            new fabric.Point(location.x, movingLocation.y),
            'right',
            "center")

        }
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
}