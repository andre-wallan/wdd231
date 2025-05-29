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
    {
      name: "Green Hills Coffee",
      category: "Coffee Shop",
      address: "12 Main Street, Kabale",
      phone: "+256 712 345 678",
      website: "https://greenhillscoffe.ug",
      image: "",
      membership: 1,
      info: ""
    },
    {
      name: "Rwenzori Tech Solutions",
      category: "IT Services",
      address: "8 Tech Park, Kabale",
      phone: "+256 702 112 233",
      website: "https://rwenzoritec.ug",
      image: "",
      membership: 1,
      info: ""
    },
    {
      name: "TechNova Ltd",
      category: "Software Company",
      address: "Plot 45, Kampala Road, Uganda",
      phone: "+256 701 123456",
      website: "https://www.technova.ug",
      image: "technova.jpg",
      membership: 3,
      info: "Leading software company specializing in fintech solutions."
    },
    {
      name: "Green Harvest",
      category: "Agriculture",
      address: "Mbale, Eastern Uganda",
      phone: "+256 712 334455",
      website: "https://greenharvest.ug",
      image: "greenharvest.jpg",
      membership: 2,
      info: "Organic farming and agricultural consultancy."
    },
    {
      name: "Safari Wheels",
      category: "Tourism",
      address: "Entebbe Highway, Uganda",
      phone: "+256 755 987654",
      website: "https://safariwheels.ug",
      image: "safariwheels.jpg",
      membership: 1,
      info: "Tour company offering guided safaris."
    },
    {
      name: "EduSmart",
      category: "Education",
      address: "Kira Road, Kampala",
      phone: "+256 770 554433",
      website: "https://edusmart.ug",
      image: "edusmart.jpg",
      membership: 3,
      info: "E-learning solutions for schools and universities."
    },
    {
      name: "ByteFix",
      category: "IT Services",
      address: "Industrial Area, Kampala",
      phone: "+256 786 112233",
      website: "https://bytefix.ug",
      image: "bytefix.jpg",
      membership: 1,
      info: "Computer repair and IT maintenance services."
    },
    {
      name: "Urban Foods",
      category: "Restaurant",
      address: "Gulu City, Uganda",
      phone: "+256 758 667788",
      website: "https://urbanfoods.ug",
      image: "urbanfoods.jpg",
      membership: 2,
      info: "Fast food restaurant with local cuisine focus."
    },
    {
      name: "SolarBright",
      category: "Renewable Energy",
      address: "Jinja Road, Uganda",
      phone: "+256 701 998877",
      website: "https://solarbright.ug",
      image: "solarbright.jpg",
      membership: 3,
      info: "Renewable energy company specializing in solar panels."
    }
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
  const apiKey = "https://api.openweathermap.org/data/2.5/weather?lat={-1.2483}&lon={29.9897}&appid={API key}"; // Replace with your actual API key
//api.openweathermap.org/data/2.5/weather?lat=${kabaleLat}&lon=${kabaleLon}&appid=${apiKey}&units=metric"; // <-- Replace with your actual API key
  const kabaleLat = -1.2483;
  const kabaleLon = 29.9897;

  const weatherIcon = document.getElementById("weather-icon");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherDesc = document.getElementById("weather-desc");
  const forecastContainer = document.getElementById("forecast");
  const refreshBtn = document.getElementById("refreshWeatherBtn");

  async function fetchWeather() {
    try {
      // Fetch current weather
      const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${kabaleLat}&lon=${kabaleLon}&appid=${apiKey}&units=metric`);
      const currentData = await currentRes.json();

      const { temp } = currentData.main;
      const description = currentData.weather[0].description;
      const icon = currentData.weather[0].icon;

      weatherTemp.textContent = `${Math.round(temp)}°C`;
      weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      weatherIcon.style.display = "inline";

      // Fetch 5-day forecast
      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${kabaleLat}&lon=${kabaleLon}&appid=${apiKey}&units=metric`);
      const forecastData = await forecastRes.json();

      // Clear old forecast
      forecastContainer.innerHTML = "";

      const dailyMap = new Map();

      // Get one forecast per day (around noon)
      forecastData.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        const hour = item.dt_txt.split(" ")[1].split(":")[0];

        if (hour === "12" && !dailyMap.has(date)) {
          dailyMap.set(date, item);
        }
      });

      dailyMap.forEach((item, date) => {
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        const temp = Math.round(item.main.temp);
        const desc = item.weather[0].description;

        const forecastEl = document.createElement("div");
        forecastEl.classList.add("forecast-day");
        forecastEl.innerHTML = `
          <div><strong>${new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}</strong></div>
          <img src="${iconUrl}" alt="${desc}">
          <div>${temp}°C</div>
        `;
        forecastContainer.appendChild(forecastEl);
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      weatherTemp.textContent = "--°C";
      weatherDesc.textContent = "Unavailable";
    }
  }

  // Load weather on page load and button click
  document.addEventListener("DOMContentLoaded", fetchWeather);
  refreshBtn.addEventListener("click", fetchWeather);

      function displayWeather() {
        const { temperature, condition } = getRandomWeather();
        const tempEl = document.getElementById('weather-temp');
        const descEl = document.getElementById('weather-desc');
        const iconEl = document.getElementById('weather-icon');

        tempEl.textContent = `${temperature}°C`;
        descEl.textContent = condition.description;
        iconEl.src = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
        iconEl.alt = condition.description;
        iconEl.style.display = 'inline-block';
      }

      displayWeather();
    });
  function fetchWeather() {
    const tempEl = document.getElementById('weather-temp');
    const descEl = document.getElementById('weather-desc');
    const iconEl = document.getElementById('weather-icon');
    const forecastDiv = document.getElementById('forecast');

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        tempEl.textContent = Math.round(data.main.temp) + '°C';
        descEl.textContent = data.weather[0].description;
        iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        iconEl.alt = data.weather[0].description;
        iconEl.style.display = 'inline-block';
      })
      .catch(() => {
        tempEl.textContent = '--°C';
        descEl.textContent = 'Weather unavailable';
        iconEl.style.display = 'none';
      });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        const days = {};
        data.list.forEach(item => {
          const date = new Date(item.dt_txt);
          const key = date.toLocaleDateString();
          if (!days[key]) days[key] = [];
          days[key].push(item);
        });

        const dayKeys = Object.keys(days).slice(1, 4);
        forecastDiv.innerHTML = dayKeys.map(key => {
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
      })
      .catch(() => {
        forecastDiv.innerHTML = '<div>Forecast unavailable</div>';
      });
  }

  document.getElementById('refreshWeatherBtn')?.addEventListener('click', fetchWeather);

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
