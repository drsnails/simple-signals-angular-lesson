var gEffectStack = []

const count = signal(0)
const isDark = signal(false)



effect(() => {
    renderCount()
})


effect(() => {
    toggleDark()
})

////////////////////////////////////////////////////


// effect(() => {
//     if (isDark()) {
//         console.log('count in the Dark!:', count())
//     } else {
//         console.log('count Effect:', count())
//     }
//     //* Untrack
//     // if (untrack(isDark)) {
//     //     console.log('count in the Dark!:', count())
//     // } else {
//     //     console.log('count Effect:', count())
//     // }

// })


// effect(() => {
//     toggleDark()
// })


////////////////////////////////////////////////////
// effect(() => {
//     console.log('count():', count())
//     if (count() % 5 === 0) {
//         console.log('isDark():', isDark())
//     }
// })


//* ------------------- Rendering -------------------
function toggleDark() {
    const elDarkBtn = document.querySelector('.dark-btn')
    elDarkBtn.classList.toggle('dark', isDark())
}

function renderCount() {
    const elH1 = document.querySelector('h1')
    elH1.innerText = count()
}


//* ------------------- Signals -------------------

function signal(initialVal) {

    const subscribers = []

    const value = () => {
        const currEffectFn = gEffectStack.at(-1)
        if (currEffectFn && !subscribers.includes(currEffectFn)) {
            subscribers.push(currEffectFn)
        }
        return initialVal
    }

    value.set = (newValue) => {
        initialVal = newValue
        subscribers.forEach(sub => sub())
    }

    return value
}

function effect(effectFn) {
    gEffectStack.push(effectFn)
    effectFn()
    gEffectStack.pop()
}


function untrack(signalFn) {
    const tempEffectStack = gEffectStack
    gEffectStack = []
    const value = signalFn()
    gEffectStack = tempEffectStack
    return value
}

function computed(signalFn) {
    const sig = signal()
    effect(() => sig.set(signalFn()))
    return sig
}

//* ------------------- Listeners -------------------

function onIncrease() {
    count.set(count() + 1)
}


function onToggleDark() {
    isDark.set(!isDark())
}


////////////////////////////////////////////////////
function getRandomColor() {
    const chars = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)]
    }
    return color
}