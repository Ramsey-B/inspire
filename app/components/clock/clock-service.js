function ClockService(cb) {
    //feedback on this part of my project would be appreciated. I wanted to do something more 
    //challenging than just drawing a digital clock to the screen the screen, and I'm happy with the
    //look and functionality of the clock I made. But keeping function seperated in our normal 
    //service/controller encapsulation was a bit confusing since the function needs to be repeatedly called 
    //and still have access to the updated time and position data.
    function moveClock() {
        var date = new Date()
        var hour = date.getHours()
        var min = date.getMinutes()
        var sec = date.getSeconds()
        hour = hour % 12
        hour = hour ? hour : 12
        var moveHour = min * (1.5)
        var moveMins = sec * (1.5)
        var hourCurrent = hour
        var hourPrev = hour - 1
        var hourNext = hour + 1
        var hour2 = hour + 2
        var minCurrent = (min < 10 ? '0' : '') + min
        var minPrev = (min < 10 ? '0' : '') + (min - 1)
        var minNext = ((min + 1) < 10 ? '0' : '') + (min + 1)
        var min2 = ((min + 2) < 10 ? '0' : '') + (min + 2)
        var posCurrent = 110

        function alignHour(time) {
            if (time > 9) {
                return 5
            } else {
                return 60
            }
        }
        function alignMin() {
            return 150
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

        var canvas = document.getElementById("clock");
        var ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.font = "12vh sans-serif";
        cb(hourPrev, hourCurrent, hourNext, hour2, moveHour, alignHour, ctx)
        cb(minPrev, minCurrent, minNext, min2, moveMins, alignMin, ctx)
    }
    setInterval(moveClock, 500)
}
