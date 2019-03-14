import descriptions from "./descriptions.js"

export default class Listeners {
    constructor(canvas) {
        canvas.addEventListener("click", event => {
            console.log(event)
            if (this.clickTop && this.clickBottom) {
                if (event.clientY > canvas.getBoundingClientRect().height / 2)
                    this.clickTop(event, "up")
                else
                    this.clickBottom(event)
            }
        })
        document.addEventListener("keydown", (event) => {
            if (this[event.code]) {
                this[event.code]()
            }
        })

        document.querySelector(".select.queue").addEventListener("click", event => {
            if (this.selectQueue) {
                this.showDescription("queue")
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
        window.myApp = {
            clickPriorityQueue: () =>  {
                if (this.selectPriorityQueue) {
                    this.selectPriorityQueue()
                }
        }}
        this.descriptionContainer = document.querySelector(".data-structure-description")
    }
    showDescription(type) {
        this.descriptionContainer.innerHTML = descriptions[type]
    }
    clear() {

    }
}