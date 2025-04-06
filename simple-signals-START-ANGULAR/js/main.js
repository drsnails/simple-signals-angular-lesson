'use strict'

const count = signal(0)
const isDark = signal(true)


//* ------------------- Listeners -------------------

function onIncrease() {
    console.log('Increase Count')
}


function onToggleDark() {
    console.log('Toggle IsDark')
}


