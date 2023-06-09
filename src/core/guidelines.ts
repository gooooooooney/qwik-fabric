import { fabric } from "~/element";


type TLocation = NonNullable<ReturnType<typeof getLocation>>[]
interface VerticalLine {
  from: fabric.Point;
  to: fabric.Point;
}

interface HorizontalLine {
  from: fabric.Point;
  to: fabric.Point;
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
  function drawHorizontalLine(coords: HorizontalLine) {
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

  function handleVertical(movingLocation: TLocation[number], location: TLocation[number], movingTarget: fabric.Object) {

    {
      // ----------------------> x
      // | in this case, movingLocation is lower than location
      // |       |
      // |       | 
      // |   ----------
      // |   |   |----|---> center
      // |   ----- ---- 
      // |       | 
      // |       |
      // |       | 
      // |   ----------- 
      // |   |   |-----|--> center
      // |   -----------
      // |       |
      // |       |
      // |       |
      // v
      // y
      if (isInRange(location.center.x, movingLocation.center.x)) {
        const fromPoint = getPoint(location.center.x, Math.min(location.center.y, movingLocation.center.y))
        const toPoint = getPoint(location.center.x, Math.max(location.center.y, movingLocation.center.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        movingTarget.setXY(
          new fabric.Point(location.center.x, movingLocation.center.y),
          'center',
          'center')
      }
      // ----------------------> x
      // | in this case, movingLocation is lower than location
      // |   |
      // |   | tl
      // |   .---------
      // |   |   .----|---> center
      // |   .---- ---- 
      // |   | bl
      // |   |
      // |   | tl
      // |   .---------- 
      // |   |    .----|--> center
      // |   .----------
      // |   | bl
      // |   |
      // |   
      // v
      // y
      if (isInRange(location.tl.x, movingLocation.center.x - movingLocation.width / 2)) {
        const fromPoint = getPoint(location.tl.x, Math.min(location.tl.y, movingLocation.tl.y))
        const toPoint = getPoint(location.tl.x, Math.max(location.bl.y, movingLocation.bl.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x - location.width / 2 = movingLocation.center.x - movingLocation.width / 2
        // so movingLocation.center.x = location.center.x - location.width / 2 + movingLocation.width / 2
        const x = location.center.x - location.width / 2 + movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }

      // ------------> x
      // | in this case, movingLocation is lower than location
      // |        |
      // |  tl    | tr
      // |   .----.       
      // |   | .--|--> center
      // |   -----. br
      // |        |
      // |        |
      // |  tl    |  tr
      // |   .----.
      // |   | .--|--> center 
      // |   -----. br
      // |        | 
      // |        |
      // |   
      // v
      // y
      if (isInRange(location.tr.x, movingLocation.center.x + movingLocation.width / 2)) {
        const fromPoint = getPoint(location.tr.x, Math.min(location.tr.y, movingLocation.tr.y))
        const toPoint = getPoint(location.tr.x, Math.max(location.br.y, movingLocation.br.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        //  location.center.x + location.width / 2 = movingLocation.center.x + movingLocation.width / 2
        // so movingLocation.center.x = location.center.x + location.width / 2 - movingLocation.width / 2
        const x = location.center.x + location.width / 2 - movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }

      // ------------> x
      // | in this case, movingLocation is lower than location
      // |        |
      // |      tl|   tr
      // |        .----.
      // |        | .--|--> center
      // |        -----. br
      // |        |
      // |        |
      // |  tl    |  tr
      // |   .----.
      // |   | .--|--> center 
      // |   -----. br
      // |        | 
      // |        |
      // |   
      // v
      // y
      if (isInRange(location.tl.x, movingLocation.center.x + movingLocation.width / 2)) {
        const fromPoint = getPoint(location.tl.x, Math.min(location.tl.y, movingLocation.tr.y))
        const toPoint = getPoint(location.tl.x, Math.max(location.br.y, movingLocation.br.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x - location.width / 2 = movingLocation.center.x + movingLocation.width / 2
        // so movingLocation.center.x = location.center.x - location.width / 2 - movingLocation.width / 2
        const x = location.center.x - location.width / 2 - movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }


      // ------------> x
      // | in this case, location is lower than movingLocation
      // |        |
      // |      tl|   tr
      // |        .----.
      // |        | .--|--> center
      // |      bl.-----. br
      // |        |
      // |        |
      // |  tl    |  tr
      // |   .----.
      // |   | .--|--> center 
      // |   -----. br
      // |        | 
      // |        |
      // |   
      // v
      // y
      if (isInRange(location.tr.x, movingLocation.center.x - movingLocation.width / 2)) {
        const fromPoint = getPoint(location.tr.x, Math.min(location.tr.y, movingLocation.tl.y))
        const toPoint = getPoint(location.tr.x, Math.max(location.br.y, movingLocation.bl.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x + location.width / 2 = movingLocation.center.x - movingLocation.width / 2
        // so movingLocation.center.x = location.center.x + location.width / 2 + movingLocation.width / 2
        const x = location.center.x + location.width / 2 + movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }

      // ------------> x
      // | in this case, movingLocation is lower than location
      // |     |
      // |   tl|   tr
      // |     .----.
      // |     | .--|--> center
      // |   bl.-----. br
      // |     |
      // |     |
      // |  tl |  tr
      // |   .----.
      // |   | |--|--> center 
      // |   -----. br
      // |     | 
      // |     |
      // |   
      // v
      // y
      if (isInRange(location.tl.x, movingLocation.center.x)) {
        const fromPoint = getPoint(location.tl.x, Math.min(location.tl.y, movingLocation.center.y))
        const toPoint = getPoint(location.tl.x, Math.max(location.tl.y, movingLocation.center.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.tl.x = movingLocation.center.x
        // so movingLocation.center.x = location.tl.x
        const x = location.tl.x
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }
      // ------------> x
      // | in this case, location is lower than movingLocation
      // |     |
      // |   tl|   tr
      // |     .----.
      // |     | .--|--> center
      // |   bl.-----. br
      // |     |
      // |     |
      // |  tl |  tr
      // |   .----.
      // |   | |--|--> center 
      // |   -----. br
      // |     | 
      // |     |
      // |   
      // v
      // y
      if (isInRange(location.center.x, movingLocation.center.x - movingLocation.width / 2)) {
        const fromPoint = getPoint(location.center.x, Math.min(location.center.y, movingLocation.center.y))
        const toPoint = getPoint(location.center.x, Math.max(location.center.y, movingLocation.center.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.tl.x = movingLocation.center.x
        // so movingLocation.center.x = location.tl.x
        const x = location.center.x
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }
      // ------------> x
      // | in this case, location is lower than movingLocation
      // |     |
      // |   tl|   tr
      // |     .----.
      // |     | .--|--> center
      // |   bl.-----. br
      // |     |
      // |     |
      // |  tl |  tr
      // |   .----.
      // |   | |--|--> center 
      // |   -----. br
      // |     | 
      // |     |
      // |   
      // v
      // y
      if (isInRange(location.center.x, movingLocation.center.x - movingLocation.width / 2)) {
        const fromPoint = getPoint(location.center.x, Math.min(location.center.y, movingLocation.center.y))
        const toPoint = getPoint(location.center.x, Math.max(location.center.y, movingLocation.center.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x = movingLocation.center.x - movingLocation.width / 2
        // so movingLocation.center.x = location.center.x + movingLocation.width / 2
        const x = location.center.x + movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }

      // ------------> x
      // | in this case, location is lower than movingLocation
      // |      |
      // |      |tr
      // | -----.
      // | | .--|--> center
      // | -----. br
      // |      |
      // |      |
      // |      |  
      // |    ------
      // |    | |--|--> center 
      // |    ------
      // |      | 
      // |      |
      // |   
      // v
      // y
      if (isInRange(location.center.x, movingLocation.center.x + movingLocation.width / 2)) {
        const fromPoint = getPoint(location.center.x, Math.min(location.center.y, movingLocation.center.y))
        const toPoint = getPoint(location.center.x, Math.max(location.center.y, movingLocation.center.y))
        verticalLines.push({
          from: fromPoint,
          to: toPoint
        })
        // location.center.x = movingLocation.center.x + movingLocation.width / 2
        // so movingLocation.center.x = location.center.x - movingLocation.width / 2
        const x = location.center.x - movingLocation.width / 2
        movingTarget.setXY(
          new fabric.Point(x, movingLocation.center.y),
          'center',
          'center')
      }
    }
  }

  function handleHorizon(movingLocation: TLocation[number], location: TLocation[number], movingTarget: fabric.Object) {
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // |      .-------   -------
    // |      |      |   |     |
    // |      |   .  |   |  .  |
    // |      |   |  |   |  |  |
    // |   ---.---|--.---.--|--.--------
    // |      bl  |  br bl  |  br   
    // |          V         V
    // |         center     center
    // v
    // y
    if (isInRange(location.bl.y, movingLocation.center.y + movingLocation.height / 2)) {
      const fromPoint = getPoint(Math.min(location.bl.x, location.bl.x, movingLocation.bl.x, movingLocation.bl.x), location.bl.y)
      const toPoint = getPoint(Math.max(location.bl.x, location.bl.x, movingLocation.bl.x, movingLocation.bl.x), location.bl.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.bl.y = movingLocation.center.y + movingLocation.height / 2
      const y = location.bl.y - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // | -----.------.---.-----.-----
    // |    tl|    tr|   |tl   | tr
    // |      |   .  |   |  .  |
    // |      |   |  |   |  |  |
    // |      ----|---   ---|---
    // |          |         |     
    // |          V         V
    // |         center     center
    // v
    // y
    if (isInRange(location.tl.y, movingLocation.center.y - movingLocation.height / 2)) {
      const fromPoint = getPoint(Math.min(location.tl.x, location.tr.x, movingLocation.tl.x, movingLocation.tr.x), location.tl.y)
      const toPoint = getPoint(Math.max(location.tl.x, location.tr.x, movingLocation.tl.x, movingLocation.tr.x), location.tl.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.tl.y = movingLocation.center.y - movingLocation.height / 2
      const y = location.tl.y + movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // |      .-------   -------
    // |      |      |   |     |
    // | -----|---|--|------|---------
    // |      |   |  |   |  |  |
    // |      ----|---   ---|---
    // |          |          |     
    // |          V          V
    // |         center     center
    // v
    // y
    if (isInRange(location.center.y, movingLocation.center.y)) {
      const fromPoint = getPoint(Math.min(location.center.x, movingLocation.center.x), location.center.y)
      const toPoint = getPoint(Math.max(location.center.x, movingLocation.center.x), location.center.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, location.center.y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // |      .-------   
    // |      |      |   
    // |      |   |  |
    // |      |   |  |  br   
    // |   bl .---|--.------.-------.---------  
    // |          |      tl |       | tr
    // |          |         |   .   |
    // |          |         |   |   |    
    // |          |         ----|---|  
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (isInRange(location.tl.y, movingLocation.center.y + movingLocation.height / 2)) {
      const fromPoint = getPoint(Math.min(location.tr.x, location.tl.x, movingLocation.br.x, movingLocation.bl.x), location.tl.y)
      const toPoint = getPoint(Math.max(location.tr.x, location.tl.x, movingLocation.br.x, movingLocation.bl.x), location.tl.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.tl.y = movingLocation.center.y + movingLocation.height / 2
      // so movingLocation.center.y = location.tl.y - movingLocation.height / 2
      const y = location.center.y - location.height / 2 - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, location is on the left of movingLocation
    // |      .-------   
    // |      |      |   
    // |      |   |  |
    // |      |   |  |  br   
    // |   bl .---|--.------.-------.---------  
    // |          |      tl |       | tr
    // |          |         |   .   |
    // |          |         |   |   |    
    // |          |         ----|---|  
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (isInRange(location.bl.y, movingLocation.center.y - movingLocation.height / 2)) {
      const fromPoint = getPoint(Math.min(movingLocation.tr.x, movingLocation.tl.x, location.br.x, location.bl.x), location.bl.y)
      const toPoint = getPoint(Math.max(movingLocation.tr.x, movingLocation.tl.x, location.br.x, location.bl.x), location.bl.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.br.y = movingLocation.center.y - movingLocation.height / 2
      // so movingLocation.center.y = location.br.y + movingLocation.height / 2
      const y = location.br.y + movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, movingLocation is on the left of location
    // |      .-------   
    // |      |      |   
    // |      |   |  |      ---------
    // |      |   |  |  br  |       | 
    // |   bl .---|--.------|---.---|---------  
    // |          |         |   |   | 
    // |          |         |   |   |
    // |          |         .---|----
    // |          |         bl  |
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (isInRange(movingLocation.center.y + movingLocation.height / 2, location.center.y)) {
      const fromPoint = getPoint(Math.min(movingLocation.bl.x + movingLocation.width / 2, location.center.x), location.center.y)
      const toPoint = getPoint(Math.max(movingLocation.bl.x + movingLocation.width / 2, location.center.x), location.center.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.center.y = movingLocation.center.y + movingLocation.height / 2
      const y = location.center.y - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, y),
        'center',
        'center')
    }
    // ----------------------> x
    // | in this case, location is on the left of movingLocation
    // |      .-------   
    // |      |      |   
    // |      |   |  |      ---------
    // |      |   |  |  br  |       | 
    // |   bl .---|--.------|---.---|---------  
    // |          |         |   |   | 
    // |          |         |   |   |
    // |          |         .---|----
    // |          |         bl  |
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (isInRange(location.bl.y, movingLocation.center.y)) {
      const fromPoint = getPoint(Math.min(location.bl.x + location.width / 2, movingLocation.center.x), location.bl.y)
      const toPoint = getPoint(Math.max(location.bl.x + location.width / 2, movingLocation.center.x), location.bl.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, location.bl.y),
        'center',
        'center')
    }
    // -------------------------------------> x
    // | in this case, location is on the left of movingLocation
    // |      --------   
    // |      |      |      tl      tr
    // |----------.---------.-------.------------
    // |      |   |  |      |       | 
    // |   bl .---|--.br    |   .   |
    // |          |         |   |   | 
    // |          |         |   |   |
    // |          |         .---|----
    // |          |         bl  |
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (isInRange(location.center.y, movingLocation.center.y - movingLocation.height / 2)) {
      const fromPoint = getPoint(Math.min(location.center.x, movingLocation.tl.x + movingLocation.width / 2), location.center.y)
      const toPoint = getPoint(Math.max(location.center.x, movingLocation.tl.x + movingLocation.width / 2), location.center.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.center.y = movingLocation.center.y - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, location.center.y + movingLocation.height / 2),
        'center',
        'center')
    }
    // -------------------------------------> x
    // | in this case, location is on the left of movingLocation
    // |      --------   
    // |      |      |      tl      tr
    // |----------.---------.-------.------------
    // |      |   |  |      |       | 
    // |   bl .---|--.br    |   .   |
    // |          |         |   |   | 
    // |          |         |   |   |
    // |          |         .---|----
    // |          |         bl  |
    // |          V             |  
    // |         center         V
    // |                      center 
    // v
    // y
    if (isInRange(location.center.y, movingLocation.center.y + movingLocation.height / 2)) {
      const fromPoint = getPoint(Math.min(location.center.x, movingLocation.tl.x + movingLocation.width / 2), location.center.y)
      const toPoint = getPoint(Math.max(location.center.x, movingLocation.tl.x + movingLocation.width / 2), location.center.y)
      verticalLines.push({
        from: fromPoint,
        to: toPoint
      })
      // location.center.y = movingLocation.center.y - movingLocation.height / 2
      movingTarget.setXY(
        new fabric.Point(movingLocation.center.x, location.center.y - movingLocation.height / 2),
        'center',
        'center')
    }
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

      handleVertical(movingLocation, location, movingTarget)
      handleHorizon(movingLocation, location, movingTarget)

    })

  })


  canvas.on('after:render', () => {
    for (let i = verticalLines.length; i--;) {
      drawVerticalLine(verticalLines[i]);
    }
    for (let i = horizontalLines.length; i--;) {
      drawHorizontalLine(horizontalLines[i]);
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