<template>
  <div class="main-container">
    <el-container class="e-contaier">
      <el-header class="e-header"><header></header></el-header>
      <el-container>
        <el-aside width="200px" class="e-aside">
          <h1>标记管理</h1>
          <div ref="dv1" class="dv dvO">
            <span ref="s1" class="s1"></span>
            <span ref="s2" class="s1"></span>
            <span ref="s3" class="s1"></span>
            <span ref="s4" class="s1"></span>
            <span ref="s5" class="s1"></span>
            <span ref="s6" class="s1"></span>
            <span ref="s7" class="s1"></span>
            <span ref="s8" class="s1"></span>
            <span ref="s9" class="s1"></span>
            <span ref="s10" class="s1"></span>
            <span ref="s11" class="s1"></span>
            <span ref="s12" class="s1"></span>
            <span ref="s13" class="s1"></span>
            <span ref="s14" class="s1"></span>
            <span ref="s15" class="s1"></span>
          </div>
          <div ref="dv2" class="dv dvT">
            <span ref="w1" class="s2"></span>
            <span ref="w2" class="s2"></span>
            <span ref="w3" class="s2"></span>
            <span ref="w4" class="s2"></span>
            <span ref="w5" class="s2"></span>
            <span ref="w6" class="s2"></span>
            <span ref="w7" class="s2"></span>
            <span ref="w8" class="s2"></span>
            <span ref="w9" class="s2"></span>
            <span ref="w10" class="s2"></span>
            <span ref="w11" class="s2"></span>
            <span ref="w12" class="s2"></span>
            <span ref="w13" class="s2"></span>
            <span ref="w14" class="s2"></span>
            <span ref="w15" class="s2"></span>
          </div>
          <div class="dv dvTr">
            <el-select v-model="currentType" @change="changeType" placeholder="请选择标记工具">
              <el-option
                v-for="item in currentTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="coarseness" placeholder="请选择标记粗细度">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
            <el-button @click="removeCanvas" class="backBtn">上一步</el-button>
          </div>
          <div class="dv dvF">
            <el-button>放大</el-button>
            <el-button>缩小</el-button>
          </div>
        </el-aside>
        <el-main class="e-main">
          <div class="content">
            <canvas
              id="canvas"
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

import useBoxEvt from './hooks/useBoxEvt'

const s1 = ref<HTMLDivElement>()
const s2 = ref<HTMLDivElement>()
const s3 = ref<HTMLDivElement>()
const s4 = ref<HTMLDivElement>()
const s5 = ref<HTMLDivElement>()
const s6 = ref<HTMLDivElement>()
const s7 = ref<HTMLDivElement>()
const s8 = ref<HTMLDivElement>()
const s9 = ref<HTMLDivElement>()
const s10 = ref<HTMLDivElement>()
const s11 = ref<HTMLDivElement>()
const s12 = ref<HTMLDivElement>()
const s13 = ref<HTMLDivElement>()
const s14 = ref<HTMLDivElement>()
const s15 = ref<HTMLDivElement>()
const w1 = ref<HTMLDivElement>()
const w2 = ref<HTMLDivElement>()
const w3 = ref<HTMLDivElement>()
const w4 = ref<HTMLDivElement>()
const w5 = ref<HTMLDivElement>()
const w6 = ref<HTMLDivElement>()
const w7 = ref<HTMLDivElement>()
const w8 = ref<HTMLDivElement>()
const w9 = ref<HTMLDivElement>()
const w10 = ref<HTMLDivElement>()
const w11 = ref<HTMLDivElement>()
const w12 = ref<HTMLDivElement>()
const w13 = ref<HTMLDivElement>()
const w14 = ref<HTMLDivElement>()
const w15 = ref<HTMLDivElement>()
const dv1 = ref<HTMLDivElement>()
const dv2 = ref<HTMLDivElement>()
//标记粗细度
const coarseness = ref<number>()
let canvas: any = null // 画布实例

let downPoint: any = null // 鼠标按下的坐标
let upPoint: any = null
let currentType = ref<string>('') // 当前操作类型（默认选框 || 创建矩形）
const currentTypeArr = [
  { label: '矩形', value: 'rect' },
  { label: '圆形', value: 'circle' }
]
let currentCircle: any = null // 临时圆，创建圆的时候使用
let rect: any = null
const canvasArray: any[] = []
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
}
// 初始化画布
function init() {
  canvas = new fabric.Canvas('canvas')

  canvas.on('mouse:down', canvasMouseDown) // 鼠标在画布上按下
  canvas.on('mouse:move', canvasMouseMove) // 鼠标在画布上移动
  canvas.on('mouse:up', canvasMouseUp) // 鼠标在画布上松开
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

// 鼠标在画布上按下
function canvasMouseDown(e: any) {
  downPoint = e.absolutePointer
  if (currentType.value === 'circle') {
    currentCircle = new fabric.Circle({
      top: downPoint.y,
      left: downPoint.x,
      radius: 0,
      fill: 'transparent',
      stroke: 'rgba(0, 0, 0, 0.2)',
      strokeWidth: coarseness.value ?? 1
    })

    canvas.add(currentCircle)
  }
}

// 鼠标在画布上松开
function canvasMouseUp(e: any) {
  if (currentType.value === 'rect') {
    // 创建矩形
    createRect(e.absolutePointer)
  }
  if (currentType.value === 'circle') {
    if (JSON.stringify(downPoint) === JSON.stringify(upPoint)) {
      canvas.remove(currentCircle)
    } else {
      if (currentCircle) {
        currentCircle.set('stroke', '#000')
        const obj = {
          canvas: currentCircle
        }
        canvasArray.push(obj)
      }
      currentCircle = null
    }
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
    stroke: 'red',
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
const removeCanvas = () => {
  const popItem = canvasArray.pop()
  console.log(popItem)

  canvas.remove(popItem.canvas)
}

onMounted(() => {
  useBoxEvt(s1.value!, dv1.value)
  useBoxEvt(s2.value!, dv1.value)
  useBoxEvt(s3.value!, dv1.value)
  useBoxEvt(s4.value!, dv1.value)
  useBoxEvt(s5.value!, dv1.value)
  useBoxEvt(s6.value!, dv1.value)
  useBoxEvt(s7.value!, dv1.value)
  useBoxEvt(s8.value!, dv1.value)
  useBoxEvt(s9.value!, dv1.value)
  useBoxEvt(s10.value!, dv1.value)
  useBoxEvt(s11.value!, dv1.value)
  useBoxEvt(s12.value!, dv1.value)
  useBoxEvt(s13.value!, dv1.value)
  useBoxEvt(s14.value!, dv1.value)
  useBoxEvt(s15.value!, dv1.value)
  useBoxEvt(w1.value!, dv2.value)
  useBoxEvt(w2.value!, dv1.value)
  useBoxEvt(w3.value!, dv1.value)
  useBoxEvt(w4.value!, dv1.value)
  useBoxEvt(w5.value!, dv1.value)
  useBoxEvt(w6.value!, dv1.value)
  useBoxEvt(w7.value!, dv1.value)
  useBoxEvt(w8.value!, dv1.value)
  useBoxEvt(w9.value!, dv1.value)
  useBoxEvt(w10.value!, dv1.value)
  useBoxEvt(w11.value!, dv1.value)
  useBoxEvt(w12.value!, dv1.value)
  useBoxEvt(w13.value!, dv1.value)
  useBoxEvt(w14.value!, dv1.value)
  useBoxEvt(w15.value!, dv1.value)
  init()
})
</script>

<style scoped lang="less">
.main-container {
  margin: 0;
  padding: 0;
  .wh();
}
.e-contaier {
  width: 100%;
  height: 100%;
}
.e-header {
  width: 100%;
  background-color: #99d3f5;
}
.e-aside {
  text-align: center;
  background-color: #d0ecfc;
}

.dv {
  margin-top: 20px;
  width: 100%;
  height: 50px;

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
.backBtn {
  margin-top: 20px;
}
.dvF {
  margin-top: 80px;
}
</style>
