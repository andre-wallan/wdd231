document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Menu and Wayfinding
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('mainNav')?.classList.toggle('open');
  });

  document.querySelectorAll('nav a').forEach(link => {
    if (window.location.href.includes(link.getAttribute('href'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // 2. Members Data
  const membersData = [
    // ... (members array unchanged)
    // [Keep your membersData array here]
  ];
  let currentDisplay = 'grid';
  let lastSearchResults = membersData;

  function memberCardHTML(member) {
    return `
      <div class="member-card">
        <span class="spotlight-level${member.membership === 2 ? ' silver' : member.membership === 3 ? ' gold' : ''}">
          ${member.membership === 3 ? 'Gold Member' : member.membership === 2 ? 'Silver Member' : 'Member'}
        </span>
        ${currentDisplay === 'grid' && member.image ? `<img src="images/${member.image}" alt="${member.name} Logo">` : ''}
        <div class="member-name">${member.name}</div>
        <div><strong>Category:</strong> ${member.category || 'N/A'}</div>
        <div><strong>Address:</strong> ${member.address}</div>
        <div><strong>Phone:</strong> ${member.phone}</div>
        <div><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, '')}</a></div>
        ${member.info ? `<div>${member.info}</div>` : ''}
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
  document.getElementById('searchForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const results = membersData.filter(m =>
      Object.values(m).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(query)
      )
    );
    lastSearchResults = results.length ? results : membersData;
    renderMembers(lastSearchResults);
  });

  document.getElementById('clearSearchBtn')?.addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
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

    shuffled.forEach(member => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      card.innerHTML = `
        <span class="spotlight-level${member.membership === 2 ? ' silver' : ' gold'}">
          ${member.membership === 3 ? 'Gold Member' : 'Silver Member'}
        </span>
        ${member.image ? `<img src="images/${member.image}" alt="${member.name} Logo">` : ''}
        <h3>${member.name}</h3>
        <p><strong>Category:</strong> ${member.category}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, '')}</a></p>
        ${member.info ? `<p>${member.info}</p>` : ''}
      `;
      spotlightsDiv.appendChild(card);
    });
  }

  document.getElementById('refreshSpotlightsBtn')?.addEventListener('click', renderSpotlights);

  // 5. Weather Integration
  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
  const lat = -1.2483;
  const lon = 29.9897;

  const weatherIcon = document.getElementById("weather-icon");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherDesc = document.getElementById("weather-desc");
  const forecastContainer = document.getElementById("forecast");
  const refreshBtn = document.getElementById("refreshWeatherBtn");

  async function fetchWeather() {
    try {
      // Fetch current weather
      const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      const currentData = await currentRes.json();

      const { temp } = currentData.main;
      const description = currentData.weather[0].description;
      const icon = currentData.weather[0].icon;

      weatherTemp.textContent = `${Math.round(temp)}°C`;
      weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      weatherIcon.style.display = "inline";

      // Fetch 5-day forecast
      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      const forecastData = await forecastRes.json();

      // Clear old forecast
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
      console.error("Error fetching weather data:", error);
      weatherTemp.textContent = "23°C";
      weatherDesc.textContent = "Loading...";
      forecastContainer.innerHTML = '<div>Forecast Loading...</div>';
    }
  }

  refreshBtn?.addEventListener("click", fetchWeather);

  // 6. Feedback Form
  document.getElementById('feedbackForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const feedback = document.getElementById('feedbackInput').value.trim();
    const msgDiv = document.getElementById('feedbackMsg');
    if (feedback.length < 2) {
      msgDiv.textContent = "Please enter your feedback.";
      msgDiv.style.color = "red";
    } else {
      msgDiv.textContent = "Thank you for your feedback!";
      msgDiv.style.color = "green";
      document.getElementById('feedbackInput').value = '';
      setTimeout(() => { msgDiv.textContent = ''; }, 4000);
    }
  });

  // Initial Render Calls
  renderMembers(membersData);
  renderSpotlights();
  fetchWeather();
});
