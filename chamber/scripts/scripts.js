document.addEventListener('DOMContentLoaded', () => {
  // ==== DOM Elements ====
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const membersDisplay = document.getElementById('membersDisplay');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const spotlightsDiv = document.getElementById('spotlights');
  const refreshSpotlightsBtn = document.getElementById('refreshSpotlightsBtn');
  const weatherIcon = document.getElementById("weather-icon");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherDesc = document.getElementById("weather-desc");
  const forecastContainer = document.getElementById("forecast");
  const refreshWeatherBtn = document.getElementById("refreshWeatherBtn");
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackMsg = document.getElementById('feedbackMsg');

  // ==== Navigation Menu and Wayfinding ====
  menuToggle?.addEventListener('click', () => mainNav?.classList.toggle('open'));
  document.querySelectorAll('nav a').forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ==== Members Data ====
  const membersData = [
  {
    name: "ByteFix Solutions",
    image: "bytefix.jpg",
    category: "IT Services",
    address: "123 Tech Lane, Kigali",
    phone: "+250 788 123 456",
    website: "https://bytefix.rw",
    membership: 3,
    info: "Expert computer repair and IT consulting."
  },
  {
    name: "EduSmart Academy",
    image: "edusmart.jpg",
    category: "Education",
    address: "45 Learning Ave, Kigali",
    phone: "+250 788 234 567",
    website: "https://edusmart.rw",
    membership: 2,
    info: "Innovative e-learning solutions for all ages."
  },
  {
    name: "GreenHarvest Farms",
    image: "greenharvest.jpg",
    category: "Agriculture",
    address: "78 Farm Road, Musanze",
    phone: "+250 788 345 678",
    website: "https://greenharvest.rw",
    membership: 1,
    info: "Organic produce and sustainable farming."
  },
  {
    name: "SafariWheels Tours",
    image: "safariwheels.jpg",
    category: "Tourism",
    address: "12 Safari St, Rubavu",
    phone: "+250 788 456 789",
    website: "https://safariwheels.rw",
    membership: 2,
    info: "Adventure tours and travel packages."
  },
  {
    name: "SolarBright Energy",
    image: "solarbright.jpg",
    category: "Energy",
    address: "99 Solar Park, Huye",
    phone: "+250 788 567 890",
    website: "https://solarbright.rw",
    membership: 3,
    info: "Affordable solar solutions for homes and businesses."
  },
  {
    name: "TechNova Labs",
    image: "technova.jpg",
    category: "Research & Development",
    address: "5 Innovation Dr, Kigali",
    phone: "+250 788 678 901",
    website: "https://technova.rw",
    membership: 1,
    info: "Cutting-edge technology research."
  },
  {
    name: "UrbanFoods Market",
    image: "urbanfoods.jpg",
    category: "Retail",
    address: "34 City Mall, Kigali",
    phone: "+250 788 789 012",
    website: "https://urbanfoods.rw",
    membership: 2,
    info: "Fresh groceries and gourmet foods."
  }
];
  
  let currentDisplay = 'grid';
  let lastSearchResults = membersData;

  const getImagePath = filename => filename ? `images/${filename}` : 'images/default.png';

  function getMembershipLabel(level) {
    return level === 3
      ? { label: 'Gold Member', class: 'gold' }
      : level === 2
      ? { label: 'Silver Member', class: 'silver' }
      : { label: 'Member', class: '' };
  }

  function memberCardHTML(member) {
    const { label, class: levelClass } = getMembershipLabel(member.membership);
    return `
      <div class="member-card">
        <span class="spotlight-level${levelClass ? ' ' + levelClass : ''}">${label}</span>
        ${currentDisplay === 'grid' ? `<img src="${getImagePath(member.image)}" alt="${member.name} Logo">` : ''}
        <div class="member-details">
          <div class="member-name">${member.name}</div>
          <div><strong>Category:</strong> ${member.category || 'N/A'}</div>
          <div><strong>Address:</strong> ${member.address}</div>
          <div><strong>Phone:</strong> ${member.phone}</div>
          <div><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, '')}</a></div>
          ${member.info ? `<div>${member.info}</div>` : ''}
        </div>
      </div>
    `;
  }

  function renderMembers(members) {
    membersDisplay.innerHTML = members.length
      ? `<div class="members-${currentDisplay}">${members.map(memberCardHTML).join('')}</div>`
      : '<p style="margin:1.2rem 0;">No members found.</p>';
  }

  function toggleDisplay(view) {
    if (currentDisplay !== view) {
      currentDisplay = view;
      [gridBtn, listBtn].forEach(btn => {
        if (btn) {
          const isActive = btn.id === view + 'Btn';
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-pressed', isActive);
        }
      });
      renderMembers(lastSearchResults);
    }
  }

  gridBtn?.addEventListener('click', () => toggleDisplay('grid'));
  listBtn?.addEventListener('click', () => toggleDisplay('list'));

  // ==== Search Feature ====
  function doSearch() {
    const query = searchInput.value.trim().toLowerCase();
    lastSearchResults = membersData.filter(m =>
      Object.values(m).some(val =>
        (typeof val === 'string' || typeof val === 'number') &&
        val.toString().toLowerCase().includes(query)
      )
    );
    renderMembers(lastSearchResults);
  }

  searchForm?.addEventListener('submit', e => {
    e.preventDefault();
    doSearch();
  });

  clearSearchBtn?.addEventListener('click', () => {
    searchInput.value = '';
    lastSearchResults = membersData;
    renderMembers(lastSearchResults);
  });

  // ==== Spotlight Members ====
  function shuffleArray(arr) {
    return arr
      .map(m => ({ m, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ m }) => m);
  }

  function renderSpotlights() {
    spotlightsDiv.innerHTML = '';
    const eligible = membersData.filter(m => m.membership >= 2);
    const shuffled = shuffleArray(eligible).slice(0, 3);

    if (shuffled.length) {
      spotlightsDiv.innerHTML += `<div class="spotlight-names">Spotlight Members: ${shuffled.map(m => m.name).join(', ')}</div>`;
    }

    shuffled.forEach(member => {
      const { label, class: levelClass } = getMembershipLabel(member.membership);
      spotlightsDiv.innerHTML += `
        <div class="spotlight-card reflect">
          <span class="spotlight-level${levelClass ? ' ' + levelClass : ''}">${label}</span>
          <img src="${getImagePath(member.image)}" alt="${member.name} Logo">
          <h3>${member.name}</h3>
          <p><strong>Category:</strong> ${member.category || 'N/A'}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, '')}</a></p>
          ${member.info ? `<p>${member.info}</p>` : ''}
        </div>
      `;
    });
  }

  refreshSpotlightsBtn?.addEventListener('click', renderSpotlights);

  // ==== Weather Integration ====
  const apiKey = "API_KEY";
  const lat = -1.2483;
  const lon = 29.9897;

  async function fetchWeather() {
    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      ]);
      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();

      const { temp } = currentData.main;
      const description = currentData.weather[0].description;
      const icon = currentData.weather[0].icon;

      weatherTemp.textContent = `${Math.round(temp)}°C`;
      weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      weatherIcon.style.display = "inline";

      // Forecast
      forecastContainer.innerHTML = "";
      const days = {};
      forecastData.list.forEach(item => {
        const date = new Date(item.dt_txt);
        const key = date.toLocaleDateString();
        if (!days[key]) days[key] = [];
        days[key].push(item);
      });

      const dayKeys = Object.keys(days).slice(1, 4);
      forecastContainer.innerHTML = dayKeys.map(key => {
        const items = days[key];
        const avgTemp = Math.round(items.reduce((a, b) => a + b.main.temp, 0) / items.length);
        const icon = items[0].weather[0].icon;
        const desc = items[0].weather[0].description;
        const label = new Date(items[0].dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

        return `
          <div class="forecast-day">
            <div>${label}</div>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" title="${desc}">
            <div>${avgTemp}°C</div>
          </div>
        `;
      }).join('');
    } catch (error) {
      weatherTemp.textContent = "23°C";
      weatherDesc.textContent = "Weather loading...";
      forecastContainer.innerHTML = '<div>Forecast Loading...</div>';
    }
  }

  refreshWeatherBtn?.addEventListener("click", fetchWeather);

  // ==== Feedback Form ====
  feedbackForm?.addEventListener('submit', e => {
    e.preventDefault();
    const feedback = feedbackInput.value.trim();
    if (feedback.length < 2) {
      feedbackMsg.textContent = "Please enter your feedback.";
      feedbackMsg.style.color = "red";
    } else {
      feedbackMsg.textContent = "Thank you for your feedback!";
      feedbackMsg.style.color = "green";
      feedbackInput.value = '';
      setTimeout(() => { feedbackMsg.textContent = ''; }, 4000);
    }
  });

  // ==== Initial Render ====
  renderMembers(membersData);
  renderSpotlights();
  fetchWeather();
});
