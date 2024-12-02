class Field {
    createField(i) {
        const square = document.querySelector('.section-1__field')
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (i; i > 0; i--) {
            arr.forEach((el) => square.insertAdjacentHTML(
                'beforeend', `<div class = "div" style = "border: 1px solid grey" data-x = ${el} data-y = ${i}></div>`))
        }
    }
}
