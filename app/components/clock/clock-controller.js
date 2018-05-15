function ClockController() {
    var cs = new ClockService(drawClock)

    function drawClock(previous, current, next, plus2, posIncrease, cb, context) {
        context.fillStyle = 'yellow'
        //current times drawn to canvas, makes them yellow to indicate current time
        context.fillText(current, cb(current), 110 + posIncrease);
        context.fillStyle = 'white'
        //alternative times drawn to canvas
        context.fillText(previous, cb(previous), 200 + posIncrease)
        context.fillText(next, cb(next), 20 + posIncrease)
        context.fillText(plus2, cb(plus2), -70 + posIncrease)
        context.fillText(':', 115, 110)
    }
    
}