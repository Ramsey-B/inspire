function ClockService() {
    //feedback on this part of my project would be appreciated. I wanted to do something more 
    //challenging than just drawing a digital clock to the screen the screen, and I'm happy with the
    //look and functionality of the clock I made. But keeping function seperated in our normal 
    //service/controller encapsulation was a bit confusing since the function needs to be repeatedly called 
    //and still have access to the updated time and position data.
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
    var minCurrent = (min < 10 ? '0' : '') + min
    var minPrev = (min < 10 ? '0' : '') + (min - 1)
    var minNext = ((min + 1) < 10 ? '0' : '') + (min + 1)
    var min2 = ((min + 2) < 10 ? '0' : '') + (min + 2)

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
        }
    }

    function changeMin(time) {
        if (time == 58) {
            min2 = '00'
        } else if (time == 59) {
            minNext = '00'
            min2 = '01'
        } else if (time == 60) {
            minCurrent = '00'
            minNext = '01'
        }
    }
    changeHour(hour)
    changeMin(min)

    function updateClock() {
        var canvas = document.getElementById("clock");
        var ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.font = "12vh Arial";
        ctx.fillStyle = 'yellow'
        //current times drawn to canvas, makes them yellow to indicate current time
        ctx.fillText(hourCurrent, alignHour(hour), 110 + moveClock);
        ctx.fillText(minCurrent, 140, 110 + moveMins)
        ctx.fillStyle = 'white'
        //alternative times drawn to canvas
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
setInterval(ClockService, 500)
