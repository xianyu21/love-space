import { createPinia } from "pinia";
import {createPersistedState } from "pinia-plugin-persistedstate";

// pinia persist
const pinia = createPinia();

pinia.use(
  createPersistedState({
    auto: true,
  })
)
export default pinia;