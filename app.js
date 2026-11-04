const nav = document.getElementById('nav');

document.getElementById('menu').addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(a => {
  a.onclick = () => nav.classList.remove('open');
});

document.getElementById('year').textContent = new Date().getFullYear();

const KEY = 'towals-special-listings-v1';
let data = JSON.parse(localStorage.getItem(KEY) || '[]');

const grid = document.getElementById('listings');
const search = document.getElementById('search');

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function renderListings() {
  const term = search.value.toLowerCase().trim();

  const rows = data.filter(item =>
    `${item.title} ${item.description} ${item.category}`
      .toLowerCase().includes(term)
  );

  if (!rows.length) {
    grid.innerHTML = `<div class="empty">${
      data.length
        ? 'No listings match your search.'
        : 'No community listings yet. Be the first to post one.'
    }</div>`;
    return;
  }

  grid.innerHTML = rows.map(item => `
    <article class="listing">
      ${item.image
        ? `<img src="${item.image}" alt="">`
        : '<div class="tile orange">✦</div>'}
      <div class="body">
        <small>${escapeHTML(item.category)}</small>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
        <a href="${item.url}" target="_blank" rel="noopener">
          View listing ↗
        </a>
      </div>
    </article>
  `).join('');
}

search.addEventListener('input', renderListings);

document.getElementById('form').addEventListener('submit', async event => {
  event.preventDefault();

  const form = event.currentTarget;
  const fields = new FormData(form);

  let destination;

  try {
    destination = new URL(fields.get('url'));

    if (!['http:', 'https:'].includes(destination.protocol)) {
      throw new Error();
    }
  } catch {
    document.getElementById('message').textContent =
      'Enter a valid web link.';
    return;
  }

  let image = '';
  const file = fields.get('image');

  if (file && file.size) {
    if (!file.type.startsWith('image/') || file.size > 1200000) {
      document.getElementById('message').textContent =
        'Image must be under 1.2 MB.';
      return;
    }

    image = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  data.unshift({
    title: fields.get('title'),
    category: fields.get('category'),
    description: fields.get('description'),
    url: destination.href,
    image
  });

  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    form.reset();

    document.getElementById('message').textContent =
      'Listing saved in this browser.';

    renderListings();

  } catch {
    data.shift();

    document.getElementById('message').textContent =
      'Storage is full. Try a smaller image.';
  }
});

renderListings();
