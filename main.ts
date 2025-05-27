input.onButtonPressed(Button.A, function () {
    movementMode = 1
    basic.showArrow(ArrowNames.West)
    basic.pause(500)
    basic.clearScreen()
    led.plot(dotX, dotY)
})
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    currentTime = input.runningTime()
    if (currentTime - lastMovementTime < ENCODER_DEBOUNCE_MS) {
        return;
    }
    lastMovementTime = currentTime
    dtState = pins.digitalReadPin(DigitalPin.P1)
    led.unplot(dotX, dotY)
    if (dtState == 0) {
        if (movementMode == 0 || movementMode == 2) {
            dotX = (dotX + 1) % 5
            if (dotX == 0) {
                dotY = (dotY + 1) % 5
            }
            keyboard.sendString(keyboard.keys(keyboard._Key.right))
        }
    } else {
        if (movementMode == 0 || movementMode == 1) {
            dotX = dotX - 1
            if (dotX < 0) {
                dotX = 4
                dotY = dotY - 1
                if (dotY < 0) {
                    dotY = 4
                }
            }
            keyboard.sendString(keyboard.keys(keyboard._Key.left))
        }
    }
    led.plot(dotX, dotY)
})
function resetDotPositionAndMode () {
    led.unplot(dotX, dotY)
    dotX = DOT_START_X
    dotY = DOT_START_Y
    movementMode = 0
    led.plot(dotX, dotY)
    basic.showIcon(IconNames.SmallSquare)
    basic.pause(200)
    basic.clearScreen()
    led.plot(dotX, dotY)
}
input.onButtonPressed(Button.AB, function () {
    resetDotPositionAndMode()
})
input.onButtonPressed(Button.B, function () {
    movementMode = 2
    basic.showArrow(ArrowNames.East)
    basic.pause(500)
    basic.clearScreen()
    led.plot(dotX, dotY)
})
let currentP2State = 0
let dtState = 0
let lastMovementTime = 0
let currentTime = 0
let movementMode = 0
let dotY = 0
let dotX = 0
let ENCODER_DEBOUNCE_MS = 0
let DOT_START_Y = 0
let DOT_START_X = 0
DOT_START_X = 2
DOT_START_Y = 2
ENCODER_DEBOUNCE_MS = 35
let BUTTON_P2_DEBOUNCE_MS = 30
dotX = DOT_START_X
dotY = DOT_START_Y
let lastP2State = 1
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
keyboard.startKeyboardService()
led.plot(dotX, dotY)
basic.forever(function () {
    currentP2State = pins.digitalReadPin(DigitalPin.P2)
    if (currentP2State == 0 && lastP2State == 1) {
        basic.pause(BUTTON_P2_DEBOUNCE_MS)
        currentP2State = pins.digitalReadPin(DigitalPin.P2)
        if (currentP2State == 0) {
            keyboard.sendString(keyboard.keys(keyboard._Key.enter))
            led.unplot(dotX, dotY)
            basic.pause(100)
            led.plot(dotX, dotY)
        }
    }
    lastP2State = currentP2State
    basic.pause(20)
})
