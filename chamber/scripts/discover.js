document.addEventListener("DOMContentLoaded", () => {
    loadTourismData(); // Load the tourism data from location.json
    checkLastVisit();   // Check for the last visit and show the appropriate message
    setupHamburgerMenu(); // Setup the hamburger menu functionality
});

// Load Tourism Data from location.json
function loadTourismData() {
    fetch("data/location.json") // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tourismGrid = document.getElementById("tourismGrid");
            if (!tourismGrid) {
                console.error("Tourism grid element not found");
                return;
            }

            tourismGrid.innerHTML = ""; // Clear previous content

            // Loop through each item in the JSON data
            data.location.forEach((place, index) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.id = `card${index + 1}`;

                // Insert the place data into the card's HTML structure
                card.innerHTML = `
                    <h2>${place.title}</h2>
                    <figure>
                        <img src="${place.image}" alt="${place.title}" loading="lazy">
                    </figure>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <a href="${place.url}" target="_blank">
                        <button>Learn More</button>
                    </a>
                `;

                tourismGrid.appendChild(card); // Append the card to the grid
            });
        })
        .catch(error => {
            console.error("Error loading tourism data:", error);
            const tourismGrid = document.getElementById("tourismGrid");
            if (tourismGrid) {
                tourismGrid.innerHTML = `<p>Failed to load tourism data. Please try again later.</p>`;
            }
        });
}

// Local Storage for Visit Tracking
function checkLastVisit() {
    let lastVisit = localStorage.getItem("lastVisit");
    let message = document.getElementById("visitMessage");

    if (!message) {
        console.error("Visit message element not found");
        return;
    }

    let currentDate = Date.now();
    
    if (!lastVisit) {
        // If no previous visit, it's the user's first time
        message.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Convert lastVisit to a number
        lastVisit = Number(lastVisit);
        // Calculate how many days since the last visit
        let daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            message.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            message.textContent = `You last visited 1 day ago.`;
        } else {
            message.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }

    // Update the last visit date in localStorage
    localStorage.setItem("lastVisit", currentDate.toString());
}

// Setup Hamburger Menu
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) {
        console.error("Hamburger menu elements not found");
        return;
    }

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    navMenu.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
}
