var gEffectStack = []


function signal(initialVal) {

}



//* ------------------- Listeners -------------------

function onIncrease() {
    console.log('Increase')
}


function onToggleDark() {
    console.log('Toggle Dark')
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