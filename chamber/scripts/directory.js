const directoryContainer = document.getElementById('directory');
const searchInput = document.getElementById('searchInput');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

let members = [];

// Fetch members from JSON
fetch('data/members.json')
  .then(response => response.json())
  .then(data => {
    members = data.members;
    displayMembers(members);
  })
  .catch(error => {
    console.error('Error loading member data:', error);
    directoryContainer.innerHTML = '<p>Failed to load directory.</p>';
  });

// Display members
function displayMembers(list) {
  directoryContainer.innerHTML = '';
  list.forEach(member => {
    const card = document.createElement('div');
    card.className = 'directory-card';
    card.innerHTML = `
      <img src="${member.logo}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${member.membership}</p>
    `;
    directoryContainer.appendChild(card);
  });
}

// Search filter
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(query) ||
    m.address.toLowerCase().includes(query) ||
    m.membership.toLowerCase().includes(query)
  );
  displayMembers(filtered);
});

// View toggle
gridViewBtn.addEventListener('click', () => {
  directoryContainer.classList.add('directory-cards');
  directoryContainer.classList.remove('directory-list');
  gridViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
  directoryContainer.classList.remove('directory-cards');
  directoryContainer.classList.add('directory-list');
  listViewBtn.classList.add('active');
  gridViewBtn.classList.remove('active');
});
