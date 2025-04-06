'use strict'
var gEffectStack = []


//* ------------------- Signal -------------------

function signal(initialVal) {

    let _val = initialVal

    const subscribedEffects = []

    const value = () => {
        const currEffect = gEffectStack[gEffectStack.length - 1]
        if (currEffect && !subscribedEffects.includes(currEffect)) {
            subscribedEffects.push(currEffect)
        }
        return _val
    }

    value.set = (newValue) => {
        _val = newValue
        subscribedEffects.forEach(effect => effect())
    }

    return value
}


//* ------------------- Effect -------------------

function effect(effectFn) {
    gEffectStack.push(effectFn)
    effectFn()
    gEffectStack.pop()
}



//* ------------------- Extra signals features -------------------
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
