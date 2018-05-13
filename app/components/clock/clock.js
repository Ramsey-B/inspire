function clock() {
    var date = new Date()
    var hour = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()
    hour = hour % 12
    hour = hour ? hour : 12
    var moveClock = min * (4 / 3)
    var moveMins = sec * (4 / 3)
    var hourCurrent = hour
    var hourPrev = hour - 1
    var hourNext = hour + 1
    var hour2 = hour + 2
    var minCurrent = min
    var minPrev = min - 1
    var minNext = min + 1
    var min2 = min + 2

    function alignHour(time) {
        if (time > 9) {
            return 10
        } else {
            return 60
        }
    }

    function changeHour(time) {
        if (time == 11) {
            hour2 = 1
        } else if (time == 12) {
            hourNext = 1
            hour2 = 2
        } else if (time == 0) {
            hourCurrent = 12
        }
    }
    
    function changeMin(time) {
        if (time == 58) {
            min2 = 0
        } else if (time == 59) {
            minNext = 0
            min2 = 1
        } else if (time == 60) {
            minCurrent = 1
        } else if (time < 10) {
            min = 0 + time
        }
    }
    changeHour(hour)
    changeMin(min)

    function updateClock() {
        var canvas = document.getElementById("clock");
        var ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.font = "12vh Arial";
        ctx.fillStyle= 'yellow'
        ctx.fillText(hourCurrent, alignHour(hour), 110 + moveClock);
        ctx.fillText(minCurrent, 140, 110 + moveMins)
        ctx.fillStyle= 'white'
        ctx.fillText(hourPrev, alignHour(hourPrev), 190 + moveClock)
        ctx.fillText(hourNext, alignHour(hourNext), 30 + moveClock)
        ctx.fillText(hour2, alignHour(hour2), -50 + moveClock)
        ctx.fillText(minPrev, 140, 190 + moveMins)
        ctx.fillText(minNext, 140, 30 + moveMins)
        ctx.fillText(min2, 140, -50 + moveMins)
        ctx.fillText(':', 110, 110)
    }
    updateClock()
}
setInterval(clock, 500)
