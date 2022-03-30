import { App } from 'vue'
import {
  ElAside,
  ElButton,
  ElCol,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElMain,
  ElOption,
  ElRow,
  ElSelect
} from 'element-plus'

import 'element-plus/dist/index.css'
const components = [
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElAside,
  ElContainer,
  ElHeader,
  ElMain,
  ElSelect,
  ElOption
]
export default function (app: App): void {
  components.forEach((it) => {
    app.component(it.name, it)
  })
}
