document.addEventListener("DOMContentLoaded", () => {
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            // Filter only Gold (3) and Silver (2) members
            const eligibleMembers = data.filter(member => member.membershipLevel >= 2);

            if (eligibleMembers.length === 0) {
                console.warn("No eligible members found.");
                document.getElementById("spotlight-container").innerHTML = "<p>No spotlight members available.</p>";
                return;
            }

            shuffleArray(eligibleMembers);

            // Select exactly 2 or 3 members randomly
            const selectedMembers = eligibleMembers.slice(0, Math.floor(Math.random() * 2) + 2); 

            const spotlightContainer = document.getElementById("spotlight-container");
            spotlightContainer.innerHTML = ""; // Clear previous content

            selectedMembers.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("spotlight");

                card.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}" class="spotlight-image">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                `;

                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading members:", error));
});

// Function to shuffle array (Fisher-Yates Algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
