<script>
  // Responsive nav menu toggle
  function toggleNavMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('open');
  }

  // Wayfinding: highlight current nav link
  document.querySelectorAll('nav a').forEach(link => {
    if (link.href && window.location.href.includes(link.getAttribute('href'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Chamber members data
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

  // --- Member Display Toggle ---
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
    if (!members || !members.length) {
      container.innerHTML = '<p style="margin:1.2rem 0;">No members found.</p>';
      return;
    }
    container.innerHTML = `<div class="members-${currentDisplay}">${members.map(memberCardHTML).join('')}</div>`;
  }

  function filteredMembers() {
    return lastSearchResults;
  }

  function toggleDisplay(view) {
    if (currentDisplay !== view) {
      currentDisplay = view;
      ['grid', 'list'].forEach(type => {
        const btn = document.getElementById(type + 'Btn');
        btn.classList.toggle('active', type === view);
        btn.setAttribute('aria-pressed', type === view);
      });
      renderMembers(filteredMembers());
    }
  }

  document.getElementById('gridBtn').addEventListener('click', () => toggleDisplay('grid'));
  document.getElementById('listBtn').addEventListener('click', () => toggleDisplay('list'));

  // --- Search ---
  function renderSearchResults(results) {
    lastSearchResults = results.length ? results : membersData;
    renderMembers(lastSearchResults);
  }

  document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
      renderSearchResults(membersData);
      return;
    }
    const results = membersData.filter(m =>
      Object.values(m).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(query)
      )
    );
    renderSearchResults(results);
  });

  document.getElementById('clearSearchBtn').addEventListener('click', function () {
    document.getElementById('searchInput').value = '';
    renderSearchResults(membersData);
  });

  // --- Spotlights ---
  function renderSpotlights() {
    const spotlightsDiv = document.getElementById('spotlights');
    spotlightsDiv.innerHTML = '';
    const eligible = membersData.filter(m => m.membership === 2 || m.membership === 3);
    const shuffled = eligible
      .map(m => ({ m, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ m }) => m)
      .slice(0, 3);
    shuffled.forEach(member => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      card.innerHTML = `
        <span class="spotlight-level${member.membership === 2 ? ' silver' : member.membership === 3 ? ' gold' : ''}">
          ${member.membership === 3 ? 'Gold Member' : 'Silver Member'}
        </span>
        ${member.image ? `<img src="images/${member.image}" alt="${member.name} Logo">` : ''}
        <h3>${member.name}</h3>
        <p><strong>Category:</strong> ${member.category || 'N/A'}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, '')}</a></p>
        ${member.info ? `<p>${member.info}</p>` : ''}
      `;
      spotlightsDiv.appendChild(card);
    });
  }

  document.getElementById('refreshSpotlightsBtn').addEventListener('click', renderSpotlights);

  // --- Weather ---
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const kabaleLat = -1.2486;
  const kabaleLon = 29.9897;

  function fetchWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${kabaleLat}&lon=${kabaleLon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('weather-temp').textContent = Math.round(data.main.temp) + '°C';
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconImg = document.getElementById('weather-icon');
        iconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconImg.alt = data.weather[0].description;
        iconImg.style.display = 'inline-block';
      })
      .catch(() => {
        document.getElementById('weather-temp').textContent = '--°C';
        document.getElementById('weather-desc').textContent = 'Weather unavailable';
        document.getElementById('weather-icon').style.display = 'none';
      });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${kabaleLat}&lon=${kabaleLon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = '';
        const days = {};
        data.list.forEach(item => {
          const date = new Date(item.dt_txt);
          const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
          if (!days[day]) days[day] = [];
          days[day].push(item);
        });
        const today = new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        const dayNames = Object.keys(days).filter(d => d !== today);
        dayNames.slice(0, 3).forEach(day => {
          const temps = days[day].map(i => i.main.temp);
          const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
          const icon = days[day][Math.floor(days[day].length / 2)].weather[0].icon;
          const desc = days[day][Math.floor(days[day].length / 2)].weather[0].description;
          forecastDiv.innerHTML += `
            <div class="forecast-day">
              <div>${day}</div>
              <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" title="${desc}">
              <div>${avgTemp}°C</div>
            </div>
          `;
        });
      })
      .catch(() => {
        document.getElementById('forecast').innerHTML = '<div>Forecast unavailable</div>';
      });
  }

  document.getElementById('refreshWeatherBtn').addEventListener('click', fetchWeather);

  // --- Feedback Form ---
  document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const feedback = document.getElementById('feedbackInput').value.trim();
    const msgDiv = document.getElementById('feedbackMsg');
    if (feedback.length < 2) {
      msgDiv.textContent = "Please enter your feedback.";
      msgDiv.style.color = "red";
      return;
    }
    msgDiv.textContent = "Thank you for your feedback!";
    msgDiv.style.color = "green";
    document.getElementById('feedbackInput').value = '';
    setTimeout(() => { msgDiv.textContent = ''; }, 4000);
  });

  // --- Initial renders ---
  renderMembers(membersData);
  renderSpotlights();
  fetchWeather();
</script>