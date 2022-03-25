import { circleCoordinate } from '../config'
const drawCircle = (cxt: CanvasRenderingContext2D, color: string): void => {
  circleCoordinate.forEach((it) => {
    cxt.beginPath()

    cxt.arc(it.x, it.y, it.raradius, 0, Math.PI * 2, false)
    cxt.fillStyle = color
    cxt.closePath()
    cxt.fill()
  })
}
export default drawCircle
