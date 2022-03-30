import { ref } from 'vue'
import { defineStore } from 'pinia'
const mainStore = defineStore('main', () => {
  const path = ref<string>()
  const setComponentPath = (cPath: string) => {
    path.value = cPath
  }
  return { path, setComponentPath }
})
export default mainStore
