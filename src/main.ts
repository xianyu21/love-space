import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import tmui from "./tmui"
import App from "./App.vue";
import 'uno.css'


export function createApp() {
  const app = createSSRApp(App);
  const store = Pinia.createPinia()
  
  app.use(tmui,{shareDisable:false} as Tmui.tmuiConfig)
 
  return {
    app,
    Pinia
  };
}
