
import {App} from 'vue'
import {loadElementPlus} from "./modules/elementPlus";

export function setupPlugins(app:App<Element>) {
    loadElementPlus(app)
}