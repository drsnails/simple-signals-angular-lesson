'use strict'

const count = signal(0)
const isDark = signal(true)
const countSquared = computed(() => count() ** 2)

effect(() => {
    renderCount()
})

effect(() => {
    renderCountSquared()
})

effect(() => {
    toggleDark()
})



//* ------------------- Listeners -------------------


function onIncrease() {
    count.set(count() + 1)
}


function onToggleDark() {
    isDark.set(!isDark())
}


//* ------------------- Rendering -------------------

function renderCount() {
    console.log('count():', count())
    const elCountSpan = document.querySelector('.count span')
    elCountSpan.innerText = count()

}

function renderCountSquared() {
    console.log('countSquared():', countSquared())
    const elCountSquaredSpan = document.querySelector('.count-squared span')
    elCountSquaredSpan.innerText = countSquared()

}

function toggleDark() {
    console.log('isDark():', isDark())
    const elDarkBtn = document.querySelector('.dark-btn')
    elDarkBtn.innerText = isDark() ? '☀️' : '🌓'
    document.body.classList.toggle('dark', isDark())
}

