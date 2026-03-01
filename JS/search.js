// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const cruises = [
    { id: 1, title: 'Premium Cruise Line', desc: 'Holland America, Princess, Disney & more — premium onboard experience.', days: '7 Days / 6 Nights', route: 'Caribbean Islands', price: 1299, img: 'images/Premium-Cruise-Lines.jpg.webp' },
    { id: 2, title: 'Luxury-Ultra-Luxury Cruise Lines', desc: 'Small ships with attentive service and upscale dining.', days: '10 Days / 9 Nights', route: 'Mediterranean Coast', price: 2499, img: 'images/Luxury-Ultra-Luxury-Cruise-Lines.jpg' },
    { id: 3, title: 'Mainstream/Mass-Market Cruise Lines', desc: 'Popular lines for families and value-focused travellers.', days: '9 Days / 8 Nights', route: 'Norway, Iceland', price: 2899, img: 'images/Mainstream_Mass-Market-Cruise-Lines.jpg' },
    { id: 4, title: 'Hotel Barges', desc: 'Canal & river barges across Europe for intimate cruising.', days: '5 Days / 4 Nights', route: 'France & Belgium', price: 2199, img: 'images/Luxury-Hotel-Barges.jpg' },
    { id: 5, title: 'River Cruise Lines', desc: 'Sail into city hearts on sleek river vessels.', days: '6 Days / 5 Nights', route: 'Bali, Indonesia', price: 1499, img: 'images/River-Cruise-Lines.jpg.webp' },
    { id: 6, title: 'Specialty Lines', desc: 'Yacht-like small vessels for peaceful voyages.', days: '8 Days / 7 Nights', route: 'Alaska & Canada', price: 1899, img: 'images/Specialty-Lines.jpg' }
  ];

  const grid = document.getElementById('cruises-grid');
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');
  const searchBtn = document.getElementById('searchBtn');

  function render(list){
    grid.innerHTML = '';
    if(!list.length){
      grid.innerHTML = '<div class="no-results">No cruises found.</div>'; return;
    }
    list.forEach(item=>{
      const div = document.createElement('article');
      div.className = 'card fade-up';
      div.innerHTML = `
        <div class="card-media">
          <img src="${item.img}" alt="${escapeHtml(item.title)}" onerror="this.onerror=null;this.src='images/placeholder.jpg'">
        </div>
        <div class="card-body">
          <div>
            <div class="card-title">${escapeHtml(item.title)}</div>
            <div class="card-desc">${escapeHtml(item.desc)}</div>
          </div>
          <div style="margin-top:auto">
            <div class="card-meta">
              <div class="meta-item"><i class="fa fa-calendar" style="color:#ef4444"></i> ${item.days}</div>
              <div class="meta-item"><i class="fa fa-map-marker-alt" style="color:#f59e0b"></i> ${escapeHtml(item.route)}</div>
              <div class="meta-item"><i class="fa fa-users" style="color:#10b981"></i> ${Math.floor(Math.random()*3000)+200}</div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="price">Starting from<br>$${item.price}</div>
          <button class="view-btn" data-id="${item.id}">View Details</button>
        </div>
      `;
      grid.appendChild(div);
    });
    observeFadeUp();
  }

  // search/filter (debounced)
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(()=>applyFilter(input.value), 180);
    clearBtn.style.display = input.value ? 'inline-flex' : 'none';
  });
  searchBtn.addEventListener('click', ()=>applyFilter(input.value));
  clearBtn.addEventListener('click', ()=>{ input.value=''; clearBtn.style.display='none'; applyFilter(''); });

  function applyFilter(q){
    q = (q||'').trim().toLowerCase();
    if(!q) return render(cruises);
    const filtered = cruises.filter(c => {
      return c.title.toLowerCase().includes(q) || c.route.toLowerCase().includes(q) || c.days.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
    });
    render(filtered);
  }

  // view details
  grid.addEventListener('click', (e)=>{
    const btn = e.target.closest('.view-btn');
    if(!btn) return;
    const id = Number(btn.dataset.id);
    const cruise = cruises.find(c=>c.id===id);
    if(!cruise) return;
    // store selected cruise for details page
    localStorage.setItem('selectedCruise', JSON.stringify(cruise));
    window.location.href = 'cruiseDetails.html';
  });

  // fade-up reveal using IntersectionObserver
  function observeFadeUp(){
    const elems = document.querySelectorAll('.fade-up');
    const io = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add('inview'); io.unobserve(en.target); }
      });
    }, {threshold:0.12});
    elems.forEach(el => io.observe(el));
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

  // initial render
  render(cruises);
});