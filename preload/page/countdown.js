const countdown = async (seconds, action = 'Next page') => {
	document.body.insertAdjacentHTML('beforeend', `
        <div id="next-ticker" style="position: fixed; pointer-events: none; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; padding: 20px; font-size: 24px; font-weight: bold; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); text-align: center;">
                ${action} in <strong id="timer-box">${seconds}</strong> seconds…
            </div>
        </div>
    `);

	const timerBox = document.getElementById('timer-box')

	await new Promise(resolve => {
		function updateTimer() {
			if (seconds > 0) {
				timerBox.textContent = seconds;
				seconds--;
				setTimeout(updateTimer, 1000);
			} else {
				document.getElementById('next-ticker').remove()
				resolve()
			}
		}

		updateTimer()
	})
};
module.exports = {countdown}
