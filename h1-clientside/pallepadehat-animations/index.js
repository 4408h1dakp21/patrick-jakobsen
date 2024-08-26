document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const spinners = document.querySelectorAll('.spinner');
    const spinnerContainer = document.querySelector('.spinner-container');

    // Opdater listen over spinner-navne med danske navne
    const spinnerNames = ['drone', 'bil', 'busk', 'træ', 'bold', 'øje', 'spøgelse', 'hjerte', 'regnbue', 'vejr', 'bogstaver'];

    function autocomplete(inp, arr) {
        let currentFocus;
        inp.addEventListener("input", function(e) {
            let a, b, i, val = this.value;
            closeAllLists();
            if (!val) {
                filterSpinners(val);
                return false;
            }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                        filterSpinners(inp.value);
                    });
                    a.appendChild(b);
                }
            }
            filterSpinners(val);
        });

        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    function filterSpinners(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        spinners.forEach(spinner => {
            const spinnerName = spinner.getAttribute('data-name').toLowerCase();
            const displayName = spinner.querySelector('.spinner-name').textContent.toLowerCase();
            if (spinnerName.includes(searchTerm) || displayName.includes(searchTerm)) {
                spinner.style.display = 'flex';
            } else {
                spinner.style.display = 'none';
            }
        });
    }

    autocomplete(searchInput, spinnerNames);
    searchInput.addEventListener('input', () => filterSpinners(searchInput.value));

    function updateWeather() {
        const weatherSpinner = document.querySelector('.spinner-weather');
        const weatherStates = ['sun', 'rain', 'thunder'];
        let currentState = 0;

        function showWeatherState(state) {
            weatherStates.forEach(s => {
                const element = weatherSpinner.querySelector(`.${s}`);
                if (s === state) {
                    element.style.opacity = 1;
                    element.style.visibility = 'visible';
                } else {
                    element.style.opacity = 0;
                    element.style.visibility = 'hidden';
                }
            });

            // Opdater baggrunden
            weatherSpinner.className = 'spinner-weather ' + state + '-bg';

            // Tilføj regn til tordenvejr
            if (state === 'thunder') {
                const rainElement = weatherSpinner.querySelector('.rain .raindrop').cloneNode(true);
                weatherSpinner.querySelector('.thunder').appendChild(rainElement);
            } else {
                const thunderRain = weatherSpinner.querySelector('.thunder .raindrop');
                if (thunderRain) {
                    thunderRain.remove();
                }
            }
        }

        showWeatherState(weatherStates[currentState]); // Vis den første vejrtilstand med det samme

        setInterval(() => {
            currentState = (currentState + 1) % weatherStates.length;
            showWeatherState(weatherStates[currentState]);
        }, 4000);
    }

    // Kald denne funktion når siden er indlæst
    updateWeather();

    const eye = document.querySelector('.spinner-eye');
    const eyeball = eye.querySelector('::before');
    const pupil = eye.querySelector('::after');

    eye.addEventListener('mousemove', (e) => {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = Math.min(
            Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY),
            eyeRect.width / 4
        );

        const eyeballX = Math.cos(angle) * distance / 2;
        const eyeballY = Math.sin(angle) * distance / 2;

        eye.style.setProperty('--eyeball-x', `${eyeballX}px`);
        eye.style.setProperty('--eyeball-y', `${eyeballY}px`);
        eye.style.setProperty('--pupil-x', `${eyeballX * 1.2}px`);
        eye.style.setProperty('--pupil-y', `${eyeballY * 1.2}px`);
    });

    eye.addEventListener('mouseleave', () => {
        eye.style.setProperty('--eyeball-x', '0px');
        eye.style.setProperty('--eyeball-y', '0px');
        eye.style.setProperty('--pupil-x', '0px');
        eye.style.setProperty('--pupil-y', '0px');
    });

    const drone = document.querySelector('.spinner-drone');
    const droneContainer = drone.closest('.spinner');
    let isDroneFollowing = false;

    droneContainer.addEventListener('mouseenter', () => {
        isDroneFollowing = true;
        drone.style.animation = 'none';
    });

    droneContainer.addEventListener('mouseleave', () => {
        isDroneFollowing = false;
        drone.style.animation = 'hover 2s ease-in-out infinite';
        drone.style.top = '50%';
        drone.style.left = '50%';
        drone.style.transform = 'translate(-50%, -50%)';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDroneFollowing) {
            const containerRect = droneContainer.getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            const y = e.clientY - containerRect.top;

            drone.style.top = `${y}px`;
            drone.style.left = `${x}px`;
            drone.style.transform = 'translate(-50%, -50%)';
        }
    });

    // Tilføj denne linje for at sikre, at dronen er synlig og centreret ved start
    drone.style.animation = 'hover 2s ease-in-out infinite';
});
