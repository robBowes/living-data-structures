import descriptions from "./descriptions.js"

export default class Listeners {
    constructor(world) {
        document.addEventListener("keydown", (event) => {
            if (this[event.code]) {
                this[event.code]()
            }
        })
        document.querySelector(".select.queue").addEventListener("click", event => {
            if (this.selectQueue) {
                this.selectQueue()
            }
            this.clear()
        })
        document.querySelector(".select.stack").addEventListener("click", event => {
            if (this.selectStack) {
                this.showDescription("stack")
                this.selectStack()
            }
            this.clear()
        })
        this.descriptionContainer = document.querySelector(".data-structure-description")
    }
    showDescription(type) {
        this.descriptionContainer.innerHTML = descriptions[type]
    }
    clear() {

    }
}