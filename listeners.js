export default class Listeners {
    constructor() {
        document.addEventListener("keydown", (event) => {
            if (this[event.code]) {
                this[event.code]()
            }
        })
    }
}