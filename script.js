// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Publications: load + filter
const pubList = document.getElementById('pub-list');
const pubEmpty = document.getElementById('pub-empty');
const pubSearch = document.getElementById('pub-search');
const pubYear = document.getElementById('pub-year');
const pubType = document.getElementById('pub-type');

let publications = [];

function renderPublications() {
  const q = (pubSearch.value || '').toLowerCase().trim();
  const y = pubYear.value;
  const t = pubType.value;

  const filtered = publications.filter(p => {
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      (p.venue || '').toLowerCase().includes(q);
    const matchY = !y || String(p.year) === y;
    const matchT = !t || p.type === t;
    return matchQ && matchY && matchT;
  });

  pubList.innerHTML = '';
  filtered.forEach(p => {
    const li = document.createElement('li');
    const title = p.url ? `<a href="${p.url}" target="_blank" rel="noopener" class="pub-item-title">${p.title}</a>`
                        : `<span class="pub-item-title">${p.title}</span>`;
    li.innerHTML = `
      ${title}
      <div class="muted">${p.authors} • ${p.venue || ''} • ${p.year}${p.extra ? ' • ' + p.extra : ''}</div>
    `;
    pubList.appendChild(li);
  });

  pubEmpty.hidden = filtered.length > 0;
}

async function loadPublications() {
  try {
    const res = await fetch('publications.json', { cache: 'no-store' });
    const data = await res.json();
    publications = data;

    // Fill years
    const years = Array.from(new Set(publications.map(p => p.year))).sort((a,b)=>b-a);
    years.forEach(y => {
      const opt = document.createElement('option');
      opt.value = String(y);
      opt.textContent = y;
      pubYear.appendChild(opt);
    });

    renderPublications();
  } catch (e) {
    console.error('Failed to load publications.json', e);
    pubEmpty.hidden = false;
    pubEmpty.textContent = 'Failed to load publications.';
  }
}

[pubSearch, pubYear, pubType].forEach(el => el && el.addEventListener('input', renderPublications));
loadPublications();
