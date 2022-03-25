import { App } from 'vue'
import { ElButton, ElCol, ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'

import 'element-plus/dist/index.css'
const components = [ElRow, ElCol, ElForm, ElFormItem, ElInput, ElButton]
export default function (app: App): void {
  components.forEach((it) => {
    app.component(it.name, it)
  })
}
