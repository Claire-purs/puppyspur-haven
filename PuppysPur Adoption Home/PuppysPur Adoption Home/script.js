/* ==== NAVBAR SCROLL ==== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

/* ==== PUPPY SEARCH ==== */
const puppyListEl = document.getElementById('puppyList');
const searchInput   = document.getElementById('puppySearch');
const searchBtn     = document.getElementById('searchBtn');

function render(pups) {
  puppyListEl.innerHTML = '';
  if (!pups.length) {
    puppyListEl.innerHTML = '<li style="grid-column:1/-1;text-align:center;color:#ddd;">No puppies found.</li>';
    return;
  }
  pups.forEach(p => {
    const li = document.createElement('li');
    li.className = 'puppy-card';
    li.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <h3>${p.name}</h3>
        <p>${p.breed} – ${p.age}</p>
      </div>
    `;
    puppyListEl.appendChild(li);
  });
}
render(puppies); // initial

function filter() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = puppies.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.breed.toLowerCase().includes(term) ||
    p.age.toLowerCase().includes(term)
  );
  render(filtered);
}
searchBtn.addEventListener('click', filter);
searchInput.addEventListener('input', filter);
searchInput.addEventListener('keyup', e => e.key === 'Enter' && filter());

/* ==== ANIMATED COUNTER ==== */
const counters = document.querySelectorAll('.num');
const speed = 120; // lower = faster

counters.forEach(counter => {
  const target = +counter.dataset.target;
  const suffix = counter.nextElementSibling.textContent;
  const update = () => {
    const count = +counter.innerText.replace(suffix, '');
    const inc = target / speed;
    if (count < target) {
      counter.innerText = Math.ceil(count + inc) + suffix;
      requestAnimationFrame(update);
    } else {
      counter.innerText = target + suffix;
    }
  };
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { update(); observer.unobserve(counter); }
  }, { threshold: 0.5 });
  observer.observe(counter);
});