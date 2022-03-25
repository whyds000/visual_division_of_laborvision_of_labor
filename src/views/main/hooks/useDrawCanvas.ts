import drawCircle from './useDrawCircle'
import drawLineCanvas from './useDrawLine'
const drawCanvas = (canvasRef: HTMLCanvasElement): void => {
  const cxt: CanvasRenderingContext2D = canvasRef!.getContext('2d')!
  drawCircle(cxt, 'black')
  drawLineCanvas(cxt)
}
export default drawCanvas
