import { App } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
function registerElIcons(app: App): void {
  const icons = [Fold, Expand]
  icons.forEach((icon) => {
    app.component(icon.name, icon)
  })
}
export { registerElIcons }
