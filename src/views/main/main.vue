<template>
  <div class="main-container">
    <el-container class="e-contaier">
      <div ref="menuRef" id="menu" class="menu-x">
        <div class="menu-li">什么都不做</div>
        <div class="menu-li">什么都不做</div>
        <div class="menu-li">什么都不做</div>
        <div class="menu-li">什么都不做</div>
        <div class="menu-li" @click="delEl">删除</div>
      </div>
      <el-header class="e-header"><header></header></el-header>
      <el-container>
        <el-aside width="200px" class="e-aside">
          <h1>标记管理</h1>
          <div class="dv dvO">
            <img src="../../assets/img/person.svg" ref="imgRef1" @click="btnEvt('p1')" />
          </div>
          <div class="dv dvT">
            <img src="../../assets/img/person2.svg" ref="imgRef2" @click="btnEvt('p2')" />
          </div>
          <div class="dv dvT2">
            <img src="@/assets/img/train.svg" ref="imgRef3" @click="btnEvt('train')" />
          </div>
          <div class="dvTr">
            <div><span>标记工具</span></div>
            <div class="tagging">
              <img src="@/assets/img/rect.svg" @click="currentType = 'rect'" title="矩形" />
              <img src="@/assets/img/circle.svg" @click="currentType = 'circle'" title="圆形" />
              <img src="@/assets/img/Line.svg" @click="currentType = 'line'" title="线段" />
              <img
                src="@/assets/img/triangle.svg"
                @click="currentType = 'triangle'"
                title="三角形"
              />
            </div>

            <el-select v-model="coarseness">
              <el-option label="1" value="1"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="9" value="9"></el-option>
            </el-select>
            <div class="demo-color-block">
              <span style="font-size: 12px; margin-right: 10px">标记颜色</span>
              <span class="demonstration">{{ color }}</span>
              <el-color-picker v-model="color" @active-change="colorChange" @change="changeCol" />
            </div>
            <!-- <el-button @click="removeCanvas" class="backBtn" type="warning">上一步</el-button> -->
            <el-button @click="removeAll" class="removeAll" type="danger">一键清除</el-button>
          </div>

          <div class="dv dvF">
            <el-button @click="zoomEvt('enlarge')">放大</el-button>
            <el-button @click="zoomEvt('narrow')">缩小</el-button>
            <el-button v-show="!canMove" @click="canMove = !canMove">移动</el-button>
            <el-button v-show="canMove" @click="canMove = !canMove">固定</el-button>
          </div>
        </el-aside>
        <el-main class="e-main">
          <div class="content">
            <canvas
              id="canvas"
              ref="canvasRef"
              width="1650"
              height="850"
              style="border: 1px solid #ccc"
            ></canvas>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'

import { onMounted, ref } from 'vue'
const imgRef1 = ref<HTMLImageElement>()
const imgRef2 = ref<HTMLImageElement>()
const imgRef3 = ref<HTMLImageElement>()
const pChange = ref<string>()
//标记粗细度
const coarseness = ref<number>(5)
const color = ref<string>('#342F2F')
const colorChange = (e: any) => {
  color.value = e
}
const changeCol = (e: any) => {
  if (e === null) {
    color.value = '#342F2F'
  }
}
let canvas: any = null // 画布实例
const canvasRef = ref<HTMLCanvasElement>()
const menuRef = ref()
let downPoint: any = null // 鼠标按下的坐标
let upPoint: any = null
let isMove: boolean
const canMove = ref<boolean>(false)
let currentType = ref<string>('') // 当前操作类型（默认选框 || 创建矩形）

let currentCircle: any = null // 临时圆，创建圆的时候使用
let currentLine: any = null // 临时线段
let currentTriangle: any = null // 临时三角形
let img: any = null
let rect: any = null
let canvasArray: any[] = []
// 修改当前操作类型。如果是矩形模式，选框填充透明，有个小灰框。
function changeType(val: string) {
  switch (val) {
    case 'rect':
      canvas.selectionColor = 'transparent'
      canvas.selectionBorderColor = 'rgba(0, 0, 0, 0.2)'
      canvas.skipTargetFind = false // 禁止选中

      break
    case 'circle':
      canvas.selectionColor = 'transparent'
      canvas.selectionBorderColor = 'transparent'
      canvas.skipTargetFind = false // 禁止选中
      break
    case 'p1':
      canvas.selectionColor = 'transparent'
      canvas.selectionBorderColor = 'transparent'
      canvas.skipTargetFind = false // 禁止选中
      break
    case 'p2':
      canvas.selectionColor = 'transparent'
      canvas.selectionBorderColor = 'transparent'
      canvas.skipTargetFind = false // 禁止选中
      break
    case 'line':
      canvas.selectionColor = 'transparent'
      canvas.selectionBorderColor = 'transparent'
      canvas.skipTargetFind = false // 禁止选中
      break
    case 'triangle':
      canvas.selectionColor = 'transparent'
      canvas.selectionBorderColor = 'transparent'
      canvas.skipTargetFind = true // 禁止选中
      break
    case 'train':
      canvas.selectionColor = 'transparent'
      canvas.selectionBorderColor = 'transparent'
      canvas.skipTargetFind = false // 禁止选中
      break
  }
}
// 鼠标在画布上移动
function canvasMouseMove(e: any) {
  if (currentType.value === 'circle' && currentCircle) {
    const currentPoint = e.absolutePointer
    let radius =
      Math.min(Math.abs(downPoint.x - currentPoint.x), Math.abs(downPoint.y - currentPoint.y)) / 2
    let top = currentPoint.y > downPoint.y ? downPoint.y : downPoint.y - radius * 2
    let left = currentPoint.x > downPoint.x ? downPoint.x : downPoint.x - radius * 2
    currentCircle.set('radius', radius)
    currentCircle.set('top', top)
    currentCircle.set('left', left)
    canvas.requestRenderAll()
  }
  if (currentType.value === 'line' && currentLine) {
    const currentPoint = e.absolutePointer
    currentLine.set('x2', currentPoint.x)
    currentLine.set('y2', currentPoint.y)
    canvas.requestRenderAll()
  }
  if (isMove && canMove.value) {
    var delta = new fabric.Point(e.e.movementX, e.e.movementY)
    canvas.relativePan(delta)
  }
  if (currentType.value === 'triangle' && currentTriangle) {
    const currentPoint = e.absolutePointer
    let width = Math.abs(downPoint.x - currentPoint.x)
    let height = Math.abs(downPoint.y - currentPoint.y)
    let top = currentPoint.y > downPoint.y ? downPoint.y : currentPoint.y
    let left = currentPoint.x > downPoint.x ? downPoint.x : currentPoint.x
    currentTriangle.set('width', width)
    currentTriangle.set('height', height)
    currentTriangle.set('top', top)
    currentTriangle.set('left', left)
    canvas.requestRenderAll()
  }
}
//设置背景图片
const setBgImg = () => {
  fabric.Image.fromURL(
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmap.ps123.net%2Ftraffic%2FUploadFiles%2F201305%2F2013052816315715.jpg&refer=http%3A%2F%2Fmap.ps123.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651114781&t=868e3f7fe1926a625d2af09461db75ce',
    (img: any) => {
      // 设置背景图
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width, // 计算出图片要拉伸的宽度
        scaleY: canvas.height / img.height // 计算出图片要拉伸的高度
      })
    }
  )
}
// 初始化画布
function init() {
  canvas = new fabric.Canvas('canvas')
  canvas.fireRightClick = true
  canvas.fireMiddleClick = true
  canvas.on('mouse:down', canvasMouseDown) // 鼠标在画布上按下
  canvas.on('mouse:move', canvasMouseMove) // 鼠标在画布上移动
  canvas.on('mouse:up', canvasMouseUp) // 鼠标在画布上松开

  setBgImg()
}

window.oncontextmenu = (e: any) => {
  e.preventDefault()
}
let activeEl: any = null
// 鼠标在画布上按下
function canvasMouseDown(e: any) {
  if (e.button === 3 && e.target) {
    activeEl = e.target
    console.log(activeEl)

    //显示菜单，设置右键菜单位置
    // 获取菜单组件的宽高
    const menuWidth: number = menuRef.value!.offsetWidth
    const menuHeight: number = menuRef.value!.offsetHeight

    // 当前鼠标位置
    let pointX = e.pointer.x
    let pointY = e.pointer.y
    // 计算菜单出现的位置
    // 如果鼠标靠近画布右侧，菜单就出现在鼠标指针左侧
    if (canvas.width - pointX <= menuWidth) {
      pointX -= menuWidth
    }
    // 如果鼠标靠近画布底部，菜单就出现在鼠标指针上方
    if (canvas.height - pointY <= menuHeight) {
      pointY -= menuHeight
    }
    menuRef.value.style = `
      visibility: visible;
      left: ${pointX}px;
      top: ${pointY}px;
      z-index: 100;
    `
  } else {
    hiddenMenu()
  }

  isMove = true
  downPoint = e.absolutePointer
  if (currentType.value === 'circle') {
    currentCircle = new fabric.Circle({
      top: downPoint.y,
      left: downPoint.x,
      radius: 0,
      fill: 'transparent',
      stroke: color.value,
      strokeWidth: coarseness.value ?? 1
    })

    canvas.add(currentCircle)
  }
  if (pChange.value === 'p1') {
    img = new fabric.Image(imgRef1.value, { left: downPoint.x, top: downPoint.y })
    canvas.add(img)
    pChange.value = ''
    const obj = {
      canvas: img
    }
    canvasArray.push(obj)
  }
  if (pChange.value === 'p2') {
    img = new fabric.Image(imgRef2.value, { left: downPoint.x, top: downPoint.y })
    canvas.add(img)
    pChange.value = ''
    const obj = {
      canvas: img
    }
    canvasArray.push(obj)
  }
  if (pChange.value === 'train') {
    img = new fabric.Image(imgRef3.value, {
      left: downPoint.x,
      top: downPoint.y,
      strokeWidth: coarseness.value ?? 1
    })
    canvas.add(img)
    pChange.value = ''
    const obj = {
      canvas: img
    }
    canvasArray.push(obj)
  }
  if (currentType.value === 'line') {
    currentLine = new fabric.Line(
      [
        downPoint.x,
        downPoint.y, // 起始点坐标
        downPoint.x,
        downPoint.y // 结束点坐标
      ],
      {
        stroke: 'rgba(0, 0, 0, 0.2)',
        strokeWidth: coarseness.value ?? 1 // 笔触颜色
      }
    )
    canvas.add(currentLine)
    pChange.value = ''
    const obj = {
      canvas: currentLine
    }
    canvasArray.push(obj)
  }
  if (currentType.value === 'triangle') {
    currentTriangle = new fabric.Triangle({
      top: downPoint.y,
      left: downPoint.x,
      width: 0,
      height: 0,
      fill: 'transparent',
      stroke: 'rgba(0, 0, 0, 0.2)',
      strokeWidth: coarseness.value ?? 1
    })
    canvas.add(currentTriangle)
    pChange.value = ''
    const obj = {
      canvas: currentTriangle
    }
    canvasArray.push(obj)
  }
}

// 鼠标在画布上松开
function canvasMouseUp(e: any) {
  isMove = false
  if (currentType.value === 'rect') {
    // 创建矩形
    createRect(e.absolutePointer)
  }
  if (currentType.value === 'circle') {
    if (JSON.stringify(downPoint) === JSON.stringify(upPoint)) {
      canvas.remove(currentCircle)
    } else {
      if (currentCircle) {
        currentCircle.set('stroke', color.value)
        const obj = {
          canvas: currentCircle
        }
        canvasArray.push(obj)
      }
      currentCircle = null
    }
  }
  if (currentType.value === 'line') {
    if (JSON.stringify(downPoint) === JSON.stringify(upPoint)) {
      canvas.remove(currentLine)
    } else {
      currentLine.set('stroke', color.value)
    }
    currentLine = null
  }
  if (currentType.value === 'triangle') {
    if (JSON.stringify(downPoint) === JSON.stringify(upPoint)) {
      canvas.remove(currentTriangle)
    } else {
      currentTriangle.set('stroke', color.value)
    }
    currentTriangle = null
  }
  currentType.value = ''
}

// 创建矩形
function createRect(pointer: any) {
  // 点击事件，不生成矩形
  if (JSON.stringify(downPoint) === JSON.stringify(pointer)) {
    return
  }

  // 创建矩形
  // 矩形参数计算
  let top = Math.min(downPoint.y, pointer.y)
  let left = Math.min(downPoint.x, pointer.x)
  let width = Math.abs(downPoint.x - pointer.x)
  let height = Math.abs(downPoint.y - pointer.y)

  // 矩形对象
  rect = new fabric.Rect({
    top,
    left,
    width,
    height,
    fill: 'transparent',
    stroke: color.value,
    strokeWidth: coarseness.value ?? 1
  })

  // 将矩形添加到画布上
  canvas.add(rect)
  const obj = {
    canvas: rect
  }
  canvasArray.push(obj)
  downPoint = null
}
// const removeCanvas = () => {
//   const popItem = canvasArray.pop()
//   console.log(popItem)

//   canvas.remove(popItem.canvas)
// }
// 隐藏菜单
function hiddenMenu() {
  menuRef.value.style = `
    visibility: hidden;
    left: 0;
    top: 0;
    z-index: -100;
  `
  activeEl = null
}

// 删除元素
function delEl() {
  canvas.remove(activeEl)
  hiddenMenu()
}
const zoomIt = (factor: number, type: string) => {
  // factor： 比例
  // let cWidth = canvas.width
  // canvas.setWidth(cWidth * factor)
  // canvas.setHeight(cWidth * factor)
  // if (canvas.backgroundImage) {
  //   var bi = canvas.backgroundImage
  //   bi.width = bi.width * factor
  //   bi.height = bi.height * factor
  // }
  var objects = canvas.getObjects()
  if (type === 'enlarge') {
    for (var i in objects) {
      var scaleX = objects[i].scaleX
      var scaleY = objects[i].scaleY
      var left = objects[i].left
      var top = objects[i].top

      var tempScaleX = scaleX * factor
      var tempScaleY = scaleY * factor
      var tempLeft = left * factor
      var tempTop = top * factor

      objects[i].scaleX = tempScaleX
      objects[i].scaleY = tempScaleY
      objects[i].left = tempLeft
      objects[i].top = tempTop

      objects[i].setCoords()
    }
  } else {
    for (var i in objects) {
      var scaleX = objects[i].scaleX
      var scaleY = objects[i].scaleY
      var left = objects[i].left
      var top = objects[i].top

      var tempScaleX = scaleX / factor
      var tempScaleY = scaleY / factor
      var tempLeft = left / factor
      var tempTop = top / factor

      objects[i].scaleX = tempScaleX
      objects[i].scaleY = tempScaleY
      objects[i].left = tempLeft
      objects[i].top = tempTop

      objects[i].setCoords()
    }
  }
  canvas.renderAll()
  canvas.calcOffset()
}
//缩放

const zoomEvt = (type: string) => {
  let objects = canvas.getObjects()
  console.log(JSON.parse(JSON.stringify(objects)))

  switch (type) {
    case 'enlarge':
      canvas.setWidth(canvas.width * 1.5)
      canvas.setHeight(canvas.height * 1.5)

      zoomIt(1.5, 'enlarge')
      setBgImg()

      break
    case 'narrow':
      canvas.setWidth(canvas.width / 1.5)
      canvas.setHeight(canvas.height / 1.5)

      zoomIt(1.5, 'narrow')
      setBgImg()
      break
  }
}

const btnEvt = (type: string) => {
  pChange.value = type
  changeType(type)
}
const removeAll = () => {
  canvasArray.forEach((it) => {
    canvas.remove(it.canvas)
  })
}
onMounted(() => {
  init()
})
</script>

<style scoped lang="less">
.main-container {
  margin: 0;
  padding: 0;
  .wh();
  overflow: hidden;
  position: relative;
}
.e-contaier {
  width: 100%;
  height: 100%;
}
.e-header {
  width: 100%;
  background-color: #99d3f5;
  overflow-y: hidden;
}
.e-aside {
  text-align: center;
  background-color: #d0ecfc;
  overflow-y: hidden;
}

.dv {
  margin-top: 20px;
  width: 100%;

  span {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    position: absolute;
    left: 70px;
  }
}
.s1 {
  z-index: 1;
  background: url('@/assets/img/person.svg') no-repeat center;
}
.s2 {
  z-index: 1;
  background: url('@/assets/img/person2.svg') no-repeat center;
}
.dvTr {
  margin-top: 40px;
}
.backBtn,
.removeAll {
  margin-top: 20px;
}
.dvF {
  margin-top: 80px;
  height: 100px;

  /deep/.el-button + .el-button {
    margin-left: 0;
  }
}
.tagging {
  width: 100%;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  img {
    width: 40%;
    height: 45%;
    cursor: pointer;
  }
}
.dvO,
.dvT {
  cursor: pointer;
}
.menu-x {
  visibility: hidden; /* 隐藏菜单 */
  z-index: -100;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}

/* 菜单每个选项 */
.menu-li {
  box-sizing: border-box;
  padding: 4px 8px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

/* 鼠标经过的选项，更改背景色 */
.menu-li:hover {
  background-color: antiquewhite;
}

/* 第一个选项，顶部两角是圆角 */
.menu-li:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

/* 最后一个选项，底部两角是圆角，底部不需要边框 */
.menu-li:last-child {
  border-bottom: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.demo-color-block {
  margin-top: 10px;
  width: 100%;

  align-items: center;
  margin-bottom: 16px;
}
</style>
