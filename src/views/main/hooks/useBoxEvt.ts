const useBoxEvt = (dv: HTMLDivElement, Dv?: HTMLDivElement) => {
  //元素的鼠标落下事件
  dv.onmousedown = function (ev: MouseEvent) {
    //获取鼠标按下的坐标
    let x1 = ev.clientX
    let y1 = ev.clientY

    //获取元素的left，top值
    let l = dv.offsetLeft
    let t = dv.offsetTop

    //给可视区域添加鼠标的移动事件
    document.onmousemove = function (ev: MouseEvent) {
      //event的兼容性

      //获取鼠标移动时的坐标
      let x2 = ev.clientX
      let y2 = ev.clientY

      //计算出鼠标的移动距离
      let x = x2 - x1
      let y = y2 - y1

      //移动的数值与元素的left，top相加，得出元素的移动的距离
      let lt = y + t
      let ls = x + l

      //更改元素的left，top值
      dv.style.top = lt + 'px'
      dv.style.left = ls + 'px'
    }

    //清除
    document.onmouseup = function (e: MouseEvent) {
      document.onmousemove = null
    }
  }
}
export default useBoxEvt
