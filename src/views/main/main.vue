<template>
  <div class="container">
    <div class="box box1" ref="moveBoxRef1">
      <img src="@/assets/img/lubenwei.png" />
    </div>
    <div class="box box2" ref="moveBoxRef2">
      <img src="@/assets/img/dasi.jpeg" />
    </div>
    <div class="box box3" ref="moveBoxRef3">
      <img src="@/assets/img/pdd.png" />
    </div>
    <div class="box box4" ref="moveBoxRef4">
      <img src="@/assets/img/xxbb.png" />
    </div>
    <canvas ref="canvasRef" width="1920" height="1080" id="canvasRef"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import drawCanvas from './hooks/useDrawCanvas'
import drawCircle from './hooks/useDrawCircle'
import { circleCoordinate } from './config'
import { ElMessageBox, ElMessage } from 'element-plus'

const canvasRef = ref<HTMLCanvasElement>()
const moveBoxRef1 = ref<HTMLDivElement>()
const moveBoxRef2 = ref<HTMLDivElement>()
const moveBoxRef3 = ref<HTMLDivElement>()
const moveBoxRef4 = ref<HTMLDivElement>()
onMounted(() => {
  drawCanvas(canvasRef.value!)
  boxMoveEvt(moveBoxRef1.value!)
  boxMoveEvt(moveBoxRef2.value!)
  boxMoveEvt(moveBoxRef3.value!)
  boxMoveEvt(moveBoxRef4.value!)
})

const boxMoveEvt = (moveBoxRef: HTMLDivElement) => {
  //x轴，y轴，左偏移量,顶偏移量
  let x = 0,
    y = 0,
    left = 0,
    top = 0
  //是否按下
  let isDown = false
  //移动前的位置
  let oldMoveX: number, oldMoveY: number
  moveBoxRef.addEventListener('mousedown', (e: MouseEvent) => {
    drawCircle(canvasRef.value!.getContext('2d')!, 'red')
    x = e.clientX
    y = e.clientY
    //获取左部和顶部的偏移量
    left = moveBoxRef.offsetLeft
    top = moveBoxRef.offsetTop
    //移动前的位置
    oldMoveX = x - (x - left)
    oldMoveY = y - (y - top)
    //开关打开
    isDown = true
    //设置样式
    moveBoxRef.style.cursor = 'move'
  })
  window.addEventListener('mousemove', (e: MouseEvent) => {
    if (isDown === false) {
      return
    }
    //获取x和y
    let nx = e.clientX
    let ny = e.clientY
    //计算移动后的左偏移量和顶部的偏移量
    let nl = nx - (x - left)
    let nt = ny - (y - top)

    moveBoxRef.style.left = nl + 'px'
    moveBoxRef.style.top = nt + 'px'
  })

  moveBoxRef.addEventListener('mouseup', (e: MouseEvent) => {
    circleCoordinate.forEach((it) => {
      if (
        e.clientX > it.x - 100 &&
        e.clientX < it.x + 100 &&
        e.clientY > it.y - 100 &&
        e.clientY < it.y + 100
      ) {
        ElMessageBox.confirm('是否确定放在此处?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            moveBoxRef.style.left = it.x - 35 + 'px'
            moveBoxRef.style.top = it.y - 35 + 'px'
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消放置'
            })
            moveBoxRef.style.left = oldMoveX + 'px'
            moveBoxRef.style.top = oldMoveY + 'px'
          })
      } else {
        moveBoxRef.style.left = oldMoveX + 'px'
        moveBoxRef.style.top = oldMoveY + 'px'
      }
    })
    drawCircle(canvasRef.value!.getContext('2d')!, 'black')
    //开关关闭
    isDown = false
    moveBoxRef.style.cursor = 'pointer'
  })
}
</script>

<style scoped lang="less">
.container {
  .wh();
  position: relative;
}
.box {
  position: absolute;
  text-align: center;
  line-height: 40px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid rgb(206, 162, 162);

  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
    border-radius: 50%;
  }
}
.box2 {
  top: 200px;
}
.box3 {
  top: 400px;
}
.box4 {
  top: 600px;
}
</style>
