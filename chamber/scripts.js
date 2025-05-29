document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Menu and Wayfinding
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle?.addEventListener('click', () => mainNav?.classList.toggle('open'));

  document.querySelectorAll('nav a').forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // 2. Members Data
  const membersData = [
    {
      name: "ByteFix",
      category: "IT Services",
      address: "123 Tech Lane, Bwindi",
      phone: "+256 712 345678",
      website: "https://bytefix.ug",
      membership: 3,
      image: "bytefix.png",
      info: "Computer repair and IT consulting."
    },
    {
      name: "SolarBright",
      category: "Energy",
      address: "45 Solar Avenue, Bwindi",
      phone: "+256 702 112233",
      website: "https://solarbright.ug",
      membership: 2,
      image: "solarbright.png",
      info: "Solar panel installation and maintenance."
    },
    {
      name: "TechNova",
      category: "Technology",
      address: "Innovation Park, Kabale",
      phone: "+256 776 998877",
      website: "https://technova.ug",
      membership: 1,
      image: "technova.png",
      info: "Tech solutions for modern businesses."
    },
    {
      name: "UrbanFoods",
      category: "Retail",
      address: "Market Street, Bwindi",
      phone: "+256 701 223344",
      website: "https://urbanfoods.ug",
      membership: 2,
      image: "urbanfoods.png",
      info: "Fresh groceries and organic produce."
    },
    {
      name: "Green Harvest",
      category: "Agriculture",
      address: "Harvest Road, Bwindi",
      phone: "+256 703 334455",
      website: "https://greenharvest.ug",
      membership: 3,
      image: "greenharvest.png",
      info: "Sustainable farming and produce supply."
    },
    {
      name: "SafariWheels",
      category: "Transport",
      address: "Safari Drive, Kabale",
      phone: "+256 704 445566",
      website: "https://safariwheels.ug",
      membership: 1,
      image: "safariwheels.png",
      info: "Tour and travel vehicle rentals."
    }
  ];

  let currentDisplay = 'grid';
  let lastSearchResults = membersData;

  const getImagePath = filename => filename ? `images/${filename}` : 'images/default.png';

  function getMembershipLabel(level) {
    if (level === 3) return { label: 'Gold Member', class: 'gold' };
    if (level === 2) return { label: 'Silver Member', class: 'silver' };
    return { label: 'Member', class: '' };
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
    const container = document.getElementById('membersDisplay');
    container.innerHTML = members.length
      ? `<div class="members-${currentDisplay}">${members.map(memberCardHTML).join('')}</div>`
      : '<p style="margin:1.2rem 0;">No members found.</p>';
  }

  function toggleDisplay(view) {
    if (currentDisplay !== view) {
      currentDisplay = view;
      ['grid', 'list'].forEach(type => {
        const btn = document.getElementById(type + 'Btn');
        btn?.classList.toggle('active', type === view);
        btn?.setAttribute('aria-pressed', type === view);
      });
      renderMembers(lastSearchResults);
    }
  }

  document.getElementById('gridBtn')?.addEventListener('click', () => toggleDisplay('grid'));
  document.getElementById('listBtn')?.addEventListener('click', () => toggleDisplay('list'));

  // 3. Search Feature
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

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

  // 4. Spotlight Members
  function renderSpotlights() {
    const spotlightsDiv = document.getElementById('spotlights');
    spotlightsDiv.innerHTML = '';

    const eligible = membersData.filter(m => m.membership >= 2);
    const shuffled = eligible
      .map(m => ({ m, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ m }) => m)
      .slice(0, 3);

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

  document.getElementById('refreshSpotlightsBtn')?.addEventListener('click', renderSpotlights);

  // 5. Weather Integration
  const apiKey = "API_KEY";
  const lat = -1.2483;
  const lon = 29.9897;

  const weatherIcon = document.getElementById("weather-icon");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherDesc = document.getElementById("weather-desc");
  const forecastContainer = document.getElementById("forecast");
  const refreshBtn = document.getElementById("refreshWeatherBtn");

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

  refreshBtn?.addEventListener("click", fetchWeather);

  // 6. Feedback Form
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackMsg = document.getElementById('feedbackMsg');

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

  // Initial Render
  renderMembers(membersData);
  renderSpotlights();
  fetchWeather();
});
