let timerInterval;

        function updateDigitalClock() {
            const now = new Date();
            const hours = now.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const twelveHourFormat = (hours % 12) || 12; 

            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');

            const digitalClock = document.getElementById('digital-clock');
            digitalClock.textContent = `${twelveHourFormat}:${minutes}:${seconds} ${ampm}`;
        }


        function startTimer() {
            const timerInput = document.getElementById('timerInput');
            const timeValue = timerInput.value;
            const [inputHours, inputMinutes] = timeValue.split(':').map(Number);

            if (!isNaN(inputHours) && !isNaN(inputMinutes)) {
                clearInterval(timerInterval);

                const now = new Date();
                const currentHours = now.getHours();
                const currentMinutes = now.getMinutes();
                const currentSeconds = now.getSeconds();

                const timerHours = inputHours - currentHours;
                const timerMinutes = inputMinutes - currentMinutes;
                const timerSeconds = timerHours * 3600 + timerMinutes * 60 - currentSeconds;

                let remainingTime = timerSeconds;

                timerInterval = setInterval(function () {
                    if (remainingTime >= 0) {
                        const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
                        const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
                        const seconds = (remainingTime % 60).toString().padStart(2, '0');
                        document.getElementById('timer-display').textContent = `${hours}:${minutes}:${seconds}`;
                        remainingTime--;
                    } else {
                        clearInterval(timerInterval);
                        document.getElementById('timer-display').textContent = "Time Complete!";
                        setTimeout(function () {
                            location.reload();
                        }, 5000)
                    }
                }, 1000);
            }
        }

        function initDigitalClock() {
            updateDigitalClock();
            setInterval(updateDigitalClock, 1000);
        }

        window.onload = initDigitalClock;