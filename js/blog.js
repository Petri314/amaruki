/* ═══════════════════════════════════════════════════════
   AMARUKI — Blog JavaScript
   ═══════════════════════════════════════════════════════
   - Renderiza lista de artículos
   - Muestra artículo individual por hash (#/articulo/id)
   - Animaciones, filtros y lectura estimada
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const blogApp = document.getElementById('blog-app');
  if (!blogApp) return;

  // ── Helpers ──

  function formatLectura(html) {
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const min = Math.max(1, Math.ceil(words / 200));
    return `${min} min de lectura`;
  }

  function getTagColor(tag) {
    const colors = {
      'mindfulness': '#0D9488',
      'bienestar': '#059669',
      'práctica diaria': '#6366F1',
      'terapia transpersonal': '#1E3A5F',
      'crecimiento': '#D97706',
      'autoconocimiento': '#7C3AED',
      'ansiedad': '#DC2626',
      'pnl': '#0891B2',
      'herramientas': '#4F46E5',
      'sueño': '#6366F1',
      'rutina': '#059669',
      'salud': '#16A34A',
      'gestalt': '#B45309',
      'terapia': '#1E3A5F',
      'conciencia': '#0D9488',
      'presente': '#D97706',
      'sanación': '#7C3AED',
      'infancia': '#0891B2',
      'heridas emocionales': '#DC2626',
      'terapia regresiva': '#4F46E5',
    };
    return colors[tag.toLowerCase()] || '#64748B';
  }

  // ── Renderizar Lista ──

  function renderLista() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Blog — Amaruki';
    history.replaceState(null, '', window.location.pathname);

    let html = `
      <div class="blog-header">
        <div class="container">
          <div class="blog-label">Blog</div>
          <h1 class="blog-title">Artículos de bienestar<br/>y crecimiento personal</h1>
          <p class="blog-desc">
            Reflexiones, herramientas y guías para tu camino de sanación y autoconocimiento.
            Nuevos artículos cada semana.
          </p>
        </div>
      </div>
      <div class="container">
        <div class="blog-grid">
    `;

    ARTICULOS.forEach((art, idx) => {
      const tag = art.tags[0];
      const tagColor = getTagColor(tag);
      html += `
        <article class="blog-card" data-aos style="transition-delay:${idx * 0.07}s">
          <div class="blog-card-image">
            <div class="blog-card-img-placeholder" style="background:linear-gradient(135deg, ${tagColor}15, ${tagColor}05)">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${tagColor}" stroke-width="1.2">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
              </svg>
            </div>
            <span class="blog-card-tag" style="background:${tagColor}20;color:${tagColor}">${tag}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-card-meta">
              <time>${art.fecha}</time>
              <span class="blog-card-dot">·</span>
              <span>${formatLectura(art.contenido)}</span>
            </div>
            <h2 class="blog-card-title">${art.titulo}</h2>
            <p class="blog-card-excerpt">${art.extracto}</p>
            <button class="blog-card-link" data-id="${art.id}">
              Seguir leyendo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </article>
      `;
    });

    html += `
        </div>
        <div class="blog-footer">
          <p>Nuevos artículos cada semana · Síguenos en <a href="https://instagram.com/amaruki333" target="_blank" rel="noopener">@amaruki333</a></p>
        </div>
      </div>
    `;

    blogApp.innerHTML = html;

    // Observar animaciones AOS
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Click en tarjetas
    document.querySelectorAll('.blog-card-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        renderArticulo(id);
      });
    });
  }

  // ── Renderizar Artículo Individual ──

  function renderArticulo(id) {
    const art = ARTICULOS.find(a => a.id === id);
    if (!art) { renderLista(); return; }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${art.titulo} — Amaruki`;
    history.replaceState(null, '', `#/articulo/${art.id}`);

    const tagColor = getTagColor(art.tags[0]);

    let html = `
      <article class="blog-article">
        <div class="container blog-article-container">
          <!-- Back -->
          <button class="blog-article-back" id="blogBack">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al blog
          </button>

          <!-- Header -->
          <header class="blog-article-header">
            <div class="blog-article-tags">
              ${art.tags.map(t => `<span class="blog-article-tag" style="background:${getTagColor(t)}20;color:${getTagColor(t)}">${t}</span>`).join('')}
            </div>
            <h1 class="blog-article-title">${art.titulo}</h1>
            <div class="blog-article-meta">
              <div class="blog-article-author">
                <div class="blog-article-avatar">PA</div>
                <div>
                  <strong>${art.autor}</strong>
                  <span>Terapeuta Integral</span>
                </div>
              </div>
              <div class="blog-article-meta-right">
                <time>${art.fecha}</time>
                <span class="blog-card-dot">·</span>
                <span>${formatLectura(art.contenido)}</span>
              </div>
            </div>
          </header>

          <!-- Image placeholder -->
          <div class="blog-article-image" style="background:linear-gradient(135deg, ${tagColor}20, ${tagColor}08)">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="${tagColor}" stroke-width="1">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            </svg>
          </div>

          <!-- Content -->
          <div class="blog-article-content">
            ${art.contenido}
          </div>

          <!-- Tags -->
          <div class="blog-article-footer-tags">
            <span class="blog-article-tags-label">Temas:</span>
            ${art.tags.map(t => `<span class="blog-article-tag" style="background:${getTagColor(t)}20;color:${getTagColor(t)}">${t}</span>`).join('')}
          </div>

          <!-- CTA -->
          <div class="blog-article-cta">
            <h3>¿Resuena este tema contigo?</h3>
            <p>Si este artículo te hizo eco y sientes que es momento de iniciar tu proceso, te invito a una sesión exploratoria gratuita. Sin compromiso.</p>
            <a href="https://wa.me/56972347776" class="btn btn-primary" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.298-.347.446-.562.149-.215.223-.4.298-.648.075-.248.024-.467-.025-.62-.05-.155-.51-1.406-.694-1.92-.186-.514-.372-.49-.533-.49-.148 0-.315 0-.481.032-.148.03-.412.186-.537.495-.148.32-1.167 1.14-1.167 2.78 0 1.64 1.194 3.223 1.362 3.445.168.222 2.348 3.587 5.69 5.028 1.233.534 2.193.66 2.954.715.34.025.648-.027.874-.08.277-.064.66-.265.803-.493.14-.222.11-.423.07-.58-.04-.156-.204-.228-.415-.33z"/></svg>
              Agendar sesión gratuita
            </a>
          </div>

          <!-- Navigation -->
          <nav class="blog-article-nav">
            ${(() => {
              const idx = ARTICULOS.findIndex(a => a.id === art.id);
              const prev = idx > 0 ? ARTICULOS[idx - 1] : null;
              const next = idx < ARTICULOS.length - 1 ? ARTICULOS[idx + 1] : null;
              return `
                <div class="blog-article-nav-left">
                  ${prev ? `<a href="#" class="blog-nav-link" data-id="${prev.id}">← ${prev.titulo}</a>` : ''}
                </div>
                <div class="blog-article-nav-right">
                  ${next ? `<a href="#" class="blog-nav-link" data-id="${next.id}">${next.titulo} →</a>` : ''}
                </div>
              `;
            })()}
          </nav>
        </div>
      </article>
    `;

    blogApp.innerHTML = html;

    // Back button
    document.getElementById('blogBack')?.addEventListener('click', (e) => {
      e.preventDefault();
      renderLista();
    });

    // Nav links
    document.querySelectorAll('.blog-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('data-id');
        renderArticulo(id);
      });
    });

    // Animación de entrada
    requestAnimationFrame(() => {
      document.querySelector('.blog-article')?.classList.add('visible');
    });
  }

  // ── Hash Routing ──

  function handleRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#/articulo/')) {
      const id = hash.replace('#/articulo/', '');
      renderArticulo(id);
    } else {
      renderLista();
    }
  }

  // ── Inicializar ──

  handleRoute();
  window.addEventListener('hashchange', handleRoute);
});
