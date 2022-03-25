import { App } from 'vue'
import registerElement from './registerElement'
import { registerElIcons } from './registerElIcons'

export function registerApp(app: App): void {
  registerElement(app)
  registerElIcons(app)
}
