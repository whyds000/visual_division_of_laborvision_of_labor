import { lineCoordinate, lineCoordinateItem } from '../config'
const drawLineCanvas = (cxt: CanvasRenderingContext2D): void => {
  lineCoordinate.forEach((it: lineCoordinateItem) => {
    cxt.beginPath()
    cxt.moveTo(it.coordinate[0].x, it.coordinate[0].y)

    for (let i = 1; i < it.coordinate.length; i++) {
      cxt.lineTo(it.coordinate[i].x, it.coordinate[i].y)
    }
    cxt.lineWidth = 2
    // cxt.font = 'small-caps bold 50px sans-serif'
    // cxt.fillText(it.name, it.coordinate[0].x, it.coordinate[0].y - 30, 100)
    switch (it.id) {
      case 1:
        cxt.strokeStyle = 'black'
        cxt.stroke()
        break
      case 2:
        cxt.strokeStyle = 'green'
        cxt.stroke()
        break
      case 3:
        cxt.strokeStyle = 'red'
        cxt.stroke()
        break
      case 4:
        cxt.strokeStyle = 'blue'
        cxt.stroke()
    }
  })
}
export default drawLineCanvas
