/* ═══════════════════════════════════════════════════════
   AMARUKI — Blog Admin Panel
   ═══════════════════════════════════════════════════════
   Crea y gestiona artículos desde el frontend.
   Los artículos se guardan en localStorage y se renderizan
   junto con los artículos fijos en el blog.
   ═══════════════════════════════════════════════════════ */

const ADMIN_KEY = 'amaruki_blog_articles';
const ADMIN_PASSWORD = 'amaruki2026';
const GITHUB_OWNER = 'Petri314';
const GITHUB_REPO = 'amaruki';
const GITHUB_PATH = 'data/articulos.json';
const GITHUB_BRANCH = 'master'; // o 'main'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('admin-app');
  if (!app) return;

  let isAuthenticated = sessionStorage.getItem('amaruki_admin_auth') === 'true';
  let localArticles = loadLocalArticles();
  let editingId = null;

  // ── Helpers ──

  function getGitHubToken() {
    return sessionStorage.getItem('amaruki_github_token') || '';
  }

  function setGitHubToken(token) {
    sessionStorage.setItem('amaruki_github_token', token);
  }

  // ── GitHub API ──

  async function getArticulosJsonSha(token) {
    try {
      const resp = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}?ref=${GITHUB_BRANCH}`,
        { headers: { Authorization: 'token ' + token, Accept: 'application/vnd.github.v3+json' } }
      );
      if (!resp.ok) return { sha: null, articles: [] };
      const data = await resp.json();
      const content = atob(data.content.replace(/\n/g, ''));
      const articles = JSON.parse(content);
      return { sha: data.sha, articles: Array.isArray(articles) ? articles : [] };
    } catch (e) {
      return { sha: null, articles: [] };
    }
  }

  async function publicarEnGitHub(article, token) {
    // Obtener estado actual del archivo
    const { sha, articles } = await getArticulosJsonSha(token);
    if (sha === null) {
      throw new Error('No se pudo leer data/articulos.json. Verifica el token y que el archivo exista.');
    }

    // Verificar si ya existe un artículo con el mismo ID
    const exists = articles.findIndex(a => a.id === article.id);
    if (exists >= 0) {
      articles[exists] = article; // Actualizar
    } else {
      articles.unshift(article); // Agregar al inicio (más reciente primero)
    }

    // Codificar a base64
    const jsonStr = JSON.stringify(articles, null, 2);
    const content = btoa(unescape(encodeURIComponent(jsonStr)));

    // Hacer commit
    const resp = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: 'token ' + token,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: '📝 Nuevo artículo: ' + article.titulo,
          content: content,
          sha: sha,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.message || 'Error al publicar en GitHub (HTTP ' + resp.status + ')');
    }

    return true;
  }

  function loadLocalArticles() {
    try {
      return JSON.parse(localStorage.getItem(ADMIN_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveLocalArticles(articles) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(articles));
    localArticles = articles;
  }

  function generateId(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || `articulo-${Date.now()}`;
  }

  function today() {
    const d = new Date();
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    return `${d.getDate()} ${meses[d.getMonth()]}, ${d.getFullYear()}`;
  }

  function previewContent(html) {
    const text = html.replace(/<[^>]*>/g, '');
    return text.slice(0, 150) + (text.length > 150 ? '...' : '');
  }

  // ── Render ──

  function render() {
    if (!isAuthenticated) {
      renderLogin();
      return;
    }
    renderAdmin();
  }

  function renderLogin() {
    app.innerHTML = `
      <div class="admin-login">
        <div class="admin-login-card">
          <div class="admin-login-icon">🔐</div>
          <h2>Panel de Administración</h2>
          <p>Ingresa la contraseña para gestionar los artículos del blog.</p>
          <form id="loginForm">
            <input type="password" id="passwordInput" placeholder="Contraseña" class="admin-input" autofocus />
            <button type="submit" class="admin-btn admin-btn-primary">Ingresar</button>
          </form>
          <p id="loginError" class="admin-error" style="display:none">Contraseña incorrecta</p>
        </div>
      </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const pw = document.getElementById('passwordInput').value;
      if (pw === ADMIN_PASSWORD) {
        isAuthenticated = true;
        sessionStorage.setItem('amaruki_admin_auth', 'true');
        render();
      } else {
        document.getElementById('loginError').style.display = 'block';
      }
    });
  }

  function renderAdmin() {
    const totalArticulos = localArticles.length + window.ARTICULOS.length;

    app.innerHTML = `
      <div class="admin-panel">
        <!-- Header -->
        <div class="admin-header">
          <div>
            <h1 class="admin-title">📝 Administrar Blog</h1>
            <p class="admin-subtitle">${localArticles.length} artículo${localArticles.length !== 1 ? 's' : ''} local${localArticles.length !== 1 ? 'es' : ''} · ${totalArticulos} en total</p>
          </div>
          <div class="admin-header-actions">
            <button id="btnNewArticle" class="admin-btn admin-btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nuevo artículo
            </button>
            <button id="btnLogout" class="admin-btn admin-btn-ghost" title="Cerrar sesión">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>

        <!-- GitHub Token Bar -->
        <div class="admin-github-bar">
          <div class="admin-github-bar-inner">
            <span style="font-size:0.8rem;font-weight:500;color:#475569;white-space:nowrap">🌐 GitHub:</span>
            <input type="password" id="githubTokenInput" class="admin-input" placeholder="Token de GitHub (ghp_...)" value="${getGitHubToken()}" style="flex:1;min-width:120px;font-size:0.75rem;padding:0.4rem 0.7rem" />
            <button id="btnSaveToken" class="admin-btn admin-btn-small admin-btn-ghost" style="white-space:nowrap">💾 Guardar</button>
            <span id="githubStatus" class="admin-github-status"></span>
          </div>
        </div>

        <!-- Tabs: Mis artículos locales / Exportar -->
        <div class="admin-tabs">
          <button class="admin-tab active" data-tab="local">Mis artículos</button>
          <button class="admin-tab" data-tab="export">Exportar / Publicar</button>
        </div>

        <!-- Tab: Local articles list -->
        <div id="tabLocal" class="admin-tab-content">
          ${localArticles.length === 0 ? `
            <div class="admin-empty">
              <span class="admin-empty-icon">📝</span>
              <p>Aún no has creado artículos desde el panel.</p>
              <p style="font-size:0.82rem;color:#94A3B8">Presiona "Nuevo artículo" para empezar.</p>
            </div>
          ` : `
            <div class="admin-list">
              ${localArticles.map((art, i) => `
                <div class="admin-article-item" data-index="${i}">
                  <div class="admin-article-item-left">
                    <span class="admin-article-item-tag" style="background:${getTagColorAdmin(art.tags[0] || '')}20;color:${getTagColorAdmin(art.tags[0] || '')}">${art.tags[0] || 'sin tag'}</span>
                    <div>
                      <strong>${art.titulo}</strong>
                      <span>${art.fecha} · ${previewContent(art.contenido)}</span>
                    </div>
                  </div>
                  <div class="admin-article-item-actions">
                    <button class="admin-btn-icon admin-btn-publish" data-action="publish" data-index="${i}" title="Publicar en GitHub 🌐">🌐</button>
                    <button class="admin-btn-icon" data-action="edit" data-index="${i}" title="Editar">✏️</button>
                    <button class="admin-btn-icon" data-action="delete" data-index="${i}" title="Eliminar">🗑️</button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Tab: Export -->
        <div id="tabExport" class="admin-tab-content" style="display:none">
          <div class="admin-export">
            <h3>Publicar cambios permanentemente</h3>
            <p>Los artículos locales solo se ven en este dispositivo. Para publicarlos en GitHub Pages, copia este código y agrégalo a <code>js/blog-data.js</code>:</p>
            <div class="admin-code-block">
              <pre id="exportCode"></pre>
              <button id="copyCode" class="admin-btn admin-btn-small">📋 Copiar</button>
            </div>
            <div class="admin-export-tips">
              <p>💡 Luego de pegar el código en <code>js/blog-data.js</code>, haz commit y push para publicar.</p>
              <p>⚠️ Las imágenes seleccionadas localmente (base64) son muy grandes para exportar por código. Para publicación permanente, usa una URL externa (Imgur, Instagram, etc.)</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form overlay -->
      <div id="articleFormOverlay" class="admin-overlay" style="display:none">
        <div class="admin-form-container">
          <div class="admin-form-header">
            <h2 id="formTitle">Nuevo artículo</h2>
            <button id="closeForm" class="admin-btn-icon">✕</button>
          </div>
          <form id="articleForm" class="admin-form">
            <div class="admin-form-group">
              <label>Título del artículo</label>
              <input type="text" id="formTitulo" class="admin-input" placeholder="Ej: Cómo la meditación transforma tu cerebro" required />
            </div>
            <div class="admin-form-row">
              <div class="admin-form-group">
                <label>Fecha</label>
                <input type="text" id="formFecha" class="admin-input" value="${today()}" />
              </div>
              <div class="admin-form-group">
                <label>Tags (separados por coma)</label>
                <input type="text" id="formTags" class="admin-input" placeholder="meditación, bienestar" />
              </div>
            </div>
            <div class="admin-form-group">
              <label>Imagen destacada (opcional)</label>
              <div style="display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap">
                <input type="url" id="formImagen" class="admin-input" placeholder="https://ejemplo.com/mi-foto.jpg" style="flex:1;min-width:180px" />
                <button type="button" id="previewImgBtn" class="admin-btn admin-btn-small admin-btn-ghost" style="white-space:nowrap">🔍 Vista URL</button>
                <button type="button" id="browseImgBtn" class="admin-btn admin-btn-small admin-btn-outline" style="white-space:nowrap">📁 Examinar</button>
                <input type="file" id="formImagenFile" accept="image/*" style="display:none" />
                <button type="button" id="removeImgBtn" class="admin-btn admin-btn-small admin-btn-danger" style="white-space:nowrap;display:none">✕ Quitar</button>
              </div>
              <div id="imagenPreview" style="display:none;margin-top:8px;border-radius:8px;overflow:hidden;max-height:150px;position:relative">
                <img id="imagenPreviewSrc" src="" alt="Preview" style="width:100%;height:100%;object-fit:cover" />
              </div>
              <div id="fileInfo" class="admin-form-hint" style="display:none"></div>
              <p class="admin-form-hint">📎 Puedes pegar una URL <strong>o</strong> seleccionar una imagen local</p>
            </div>
            <div class="admin-form-group">
              <label>Extracto (resumen que se ve en la tarjeta)</label>
              <textarea id="formExtracto" class="admin-textarea" rows="2" placeholder="Breve descripción del artículo..."></textarea>
            </div>
            <div class="admin-form-group">
              <label>Contenido del artículo (HTML)</label>
              <p class="admin-form-hint">Puedes usar: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;&lt;li&gt;, &lt;blockquote&gt;</p>
              <textarea id="formContenido" class="admin-textarea admin-textarea-lg" rows="12" placeholder="<p>Escribe aquí el contenido del artículo...</p>"></textarea>
            </div>
            <div class="admin-form-actions">
              <button type="button" id="cancelForm" class="admin-btn admin-btn-ghost">Cancelar</button>
              <button type="submit" id="saveArticle" class="admin-btn admin-btn-primary">💾 Guardar</button>
              <button type="button" id="saveAndPublish" class="admin-btn admin-btn-publish-btn">🌐 Guardar y Publicar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // ── Event listeners ──

    // Logout
    document.getElementById('btnLogout')?.addEventListener('click', () => {
      isAuthenticated = false;
      sessionStorage.removeItem('amaruki_admin_auth');
      render();
    });

    // Tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');
        document.getElementById(`tab${tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1)}`).style.display = 'block';
        if (tab.dataset.tab === 'export') generateExportCode();
      });
    });

    // New article
    document.getElementById('btnNewArticle')?.addEventListener('click', () => openForm(null));

    // Browse local image
    document.getElementById('browseImgBtn')?.addEventListener('click', () => {
      document.getElementById('formImagenFile').click();
    });

    document.getElementById('formImagenFile')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Check size (warn if > 1MB)
      const maxSize = 3 * 1024 * 1024; // 3MB
      if (file.size > maxSize) {
        alert('La imagen es muy grande. El máximo recomendado es 3 MB. La imagen se guardará pero puede ser lenta al cargar.');
      }

      const reader = new FileReader();
      reader.onload = function (ev) {
        const dataUrl = ev.target.result;
        // Set the URL input to the data URL
        document.getElementById('formImagen').value = dataUrl;
        // Show preview
        const preview = document.getElementById('imagenPreview');
        const img = document.getElementById('imagenPreviewSrc');
        img.src = dataUrl;
        preview.style.display = 'block';
        // Show file info
        const fileInfo = document.getElementById('fileInfo');
        fileInfo.textContent = '✅ ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
        fileInfo.style.display = 'block';
        // Show remove button
        document.getElementById('removeImgBtn').style.display = '';
      };
      reader.readAsDataURL(file);
    });

    // Remove image
    document.getElementById('removeImgBtn')?.addEventListener('click', () => {
      document.getElementById('formImagen').value = '';
      document.getElementById('imagenPreview').style.display = 'none';
      document.getElementById('fileInfo').style.display = 'none';
      document.getElementById('formImagenFile').value = '';
      document.getElementById('removeImgBtn').style.display = 'none';
    });

    // Preview image URL
    document.getElementById('previewImgBtn')?.addEventListener('click', () => {
      const url = document.getElementById('formImagen').value.trim();
      const preview = document.getElementById('imagenPreview');
      const img = document.getElementById('imagenPreviewSrc');
      if (url) {
        img.src = url;
        preview.style.display = 'block';
        document.getElementById('removeImgBtn').style.display = '';
      } else {
        preview.style.display = 'none';
      }
    });

    // Close form
    document.getElementById('closeForm')?.addEventListener('click', closeForm);
    document.getElementById('cancelForm')?.addEventListener('click', closeForm);

    // Form submit
    document.getElementById('articleForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveArticleFromForm();
    });

    // Edit/Delete buttons
    document.querySelectorAll('[data-action="edit"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        openForm(localArticles[idx], idx);
      });
    });

    document.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        if (confirm(`¿Eliminar "${localArticles[idx].titulo}"?`)) {
          const articles = loadLocalArticles();
          articles.splice(idx, 1);
          saveLocalArticles(articles);
          render();
        }
      });
    });

    // Copy code
    document.getElementById('copyCode')?.addEventListener('click', () => {
      const code = document.getElementById('exportCode');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
          const btn = document.getElementById('copyCode');
          btn.textContent = '✅ Copiado';
          setTimeout(() => { btn.textContent = '📋 Copiar'; }, 2000);
        });
      }
    });

    // ── GitHub: Save token ──
    document.getElementById('btnSaveToken')?.addEventListener('click', () => {
      const token = document.getElementById('githubTokenInput').value.trim();
      if (!token) {
        showToast('⚠️ Ingresa un token de GitHub', 'error');
        return;
      }
      setGitHubToken(token);
      showToast('✅ Token guardado en esta sesión', 'success');
      document.getElementById('githubStatus').textContent = '✅ Token configurado';
      document.getElementById('githubStatus').className = 'admin-github-status admin-github-ok';
    });

    // Restore token status on load
    if (getGitHubToken()) {
      setTimeout(() => {
        const st = document.getElementById('githubStatus');
        if (st) {
          st.textContent = '✅ Token configurado';
          st.className = 'admin-github-status admin-github-ok';
        }
      }, 100);
    }

    // ── GitHub: Publish article from list ──
    document.querySelectorAll('[data-action="publish"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.dataset.index);
        const article = localArticles[idx];
        if (!article) return;

        const token = getGitHubToken();
        if (!token) {
          showToast('⚠️ Primero configura tu token de GitHub arriba', 'error');
          return;
        }

        btn.textContent = '⏳';
        btn.disabled = true;
        try {
          await handlePublish(article, token);
          showToast('✅ Publicado: ' + article.titulo, 'success');
          btn.textContent = '✅';
          setTimeout(() => { btn.textContent = '🌐'; btn.disabled = false; }, 2000);
        } catch (e) {
          showToast('❌ Error: ' + e.message, 'error');
          btn.textContent = '❌';
          setTimeout(() => { btn.textContent = '🌐'; btn.disabled = false; }, 3000);
        }
      });
    });

    // ── GitHub: Save and Publish ──
    document.getElementById('saveAndPublish')?.addEventListener('click', async () => {
      const article = buildArticleFromForm();
      if (!article) {
        showToast('⚠️ El título es obligatorio', 'error');
        return;
      }

      const token = getGitHubToken();
      if (!token) {
        showToast('⚠️ Primero configura tu token de GitHub arriba', 'error');
        return;
      }

      // Mostrar estado de carga
      const btn = document.getElementById('saveAndPublish');
      btn.textContent = '⏳ Publicando...';
      btn.disabled = true;

      try {
        // Guardar local
        saveArticle(article);

        // Publicar en GitHub mientras el formulario sigue abierto
        await handlePublish(article, token);

        // Cerrar formulario y renderizar
        closeForm();
        render();
        showToast('✅ Guardado y publicado para todos 🌎', 'success');
      } catch (e) {
        // Si falla, el artículo queda guardado localmente
        closeForm();
        render();
        showToast('❌ Guardado local, error al publicar: ' + e.message, 'error');
      }
    });
  }

  // ── Toast Notification ──

  function showToast(msg, type) {
    // Remove existing toasts
    document.querySelectorAll('.admin-toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'admin-toast admin-toast-' + (type || 'info');
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('admin-toast-visible'), 50);
    setTimeout(() => {
      toast.classList.remove('admin-toast-visible');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ── Handle Publish to GitHub ──

  async function handlePublish(article, token) {
    if (article.imagen && article.imagen.startsWith('data:image')) {
      if (article.imagen.length > 500000) {
        throw new Error('La imagen local es muy grande (>500KB). Usa una URL externa (Imgur, Instagram) para publicar.');
      }
      showToast('⚠️ Las imágenes locales grandes no son ideales para GitHub. Se publicará igual pero considera usar URL externa.', 'warning');
    }
    return await publicarEnGitHub(article, token);
  }

  function openForm(article, index) {
    editingId = index !== undefined && index !== null ? index : null;
    const overlay = document.getElementById('articleFormOverlay');
    document.getElementById('formTitle').textContent = editingId !== null ? 'Editar artículo' : 'Nuevo artículo';

    if (article) {
      document.getElementById('formTitulo').value = article.titulo || '';
      document.getElementById('formFecha').value = article.fecha || today();
      document.getElementById('formTags').value = (article.tags || []).join(', ');
      document.getElementById('formImagen').value = article.imagen || '';
      document.getElementById('imagenPreview').style.display = article.imagen ? 'block' : 'none';
      document.getElementById('fileInfo').style.display = 'none';
      if (article.imagen) {
        document.getElementById('imagenPreviewSrc').src = article.imagen;
        document.getElementById('removeImgBtn').style.display = '';
      } else {
        document.getElementById('removeImgBtn').style.display = 'none';
      }
      document.getElementById('formExtracto').value = article.extracto || '';
      document.getElementById('formContenido').value = article.contenido || '';
    } else {
      document.getElementById('formTitulo').value = '';
      document.getElementById('formFecha').value = today();
      document.getElementById('formTags').value = '';
      document.getElementById('formImagen').value = '';
      document.getElementById('formImagenFile').value = '';
      document.getElementById('imagenPreview').style.display = 'none';
      document.getElementById('fileInfo').style.display = 'none';
      document.getElementById('removeImgBtn').style.display = 'none';
      document.getElementById('formExtracto').value = '';
      document.getElementById('formContenido').value = '';
    }

    overlay.style.display = 'flex';
    document.getElementById('formTitulo').focus();
  }

  function closeForm() {
    document.getElementById('articleFormOverlay').style.display = 'none';
    editingId = null;
  }

  // Extrae los datos del formulario como objeto artículo
  function buildArticleFromForm() {
    const titulo = document.getElementById('formTitulo').value.trim();
    if (!titulo) return null;

    const tags = document.getElementById('formTags').value.split(',').map(t => t.trim()).filter(Boolean);
    const imagen = document.getElementById('formImagen').value.trim();
    return {
      id: generateId(titulo),
      titulo,
      extracto: document.getElementById('formExtracto').value.trim() || previewContent(document.getElementById('formContenido').value),
      fecha: document.getElementById('formFecha').value.trim() || today(),
      autor: 'Patricio Almendra',
      imagen: imagen,
      tags: tags.length ? tags : ['general'],
      contenido: document.getElementById('formContenido').value || '<p>Artículo en construcción...</p>',
    };
  }

  // Guarda un artículo en localStorage y actualiza la UI
  function saveArticle(article) {
    const articles = loadLocalArticles();
    if (editingId !== null && editingId < articles.length) {
      article.id = articles[editingId].id; // Preservar ID
      articles[editingId] = article;
    } else {
      articles.push(article);
    }
    saveLocalArticles(articles);
  }

  function saveArticleFromForm() {
    const article = buildArticleFromForm();
    if (!article) return;
    saveArticle(article);
    closeForm();
    render();
  }

  function generateExportCode() {
    var codeEl = document.getElementById('exportCode');
    if (!codeEl) return;

    var articles = loadLocalArticles();
    if (articles.length === 0) {
      codeEl.textContent = '// No hay artículos locales para exportar.\n// Crea algunos desde la pestaña "Mis artículos".';
      return;
    }

    var result = '// ═══ Artículos creados desde el panel admin ═══\n';
    result += '// Copia y pega esto en js/blog-data.js dentro del array ARTICULOS\n\n';

    for (var i = 0; i < articles.length; i++) {
      var art = articles[i];
      result += '  {\n';
      result += "    id: '" + escapeJs(art.id) + "',\n";
      result += "    titulo: '" + escapeJs(art.titulo) + "',\n";
      result += "    extracto: '" + escapeJs(art.extracto) + "',\n";
      result += "    fecha: '" + escapeJs(art.fecha) + "',\n";
      result += "    autor: '" + escapeJs(art.autor) + "',\n";
      result += "    imagen: '" + escapeJs(art.imagen || '') + "',\n";
      result += '    tags: [';
      for (var j = 0; j < art.tags.length; j++) {
        if (j > 0) result += ', ';
        result += "'" + escapeJs(art.tags[j]) + "'";
      }
      result += '],\n';
      result += '    contenido: `\n';
      result += indentHtml(art.contenido || '');
      result += '\n    `,\n  }';
      if (i < articles.length - 1) {
        result += ',\n\n';
      } else {
        result += ',';
      }
    }

    codeEl.textContent = result;
  }

  function escapeJs(str) {
    return (str || '').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/`/g, '\\`');
  }

  function indentHtml(html) {
    if (!html) return '';
    var lines = html.split('\n');
    for (var i = 0; i < lines.length; i++) {
      lines[i] = '      ' + lines[i];
    }
    return lines.join('\n');
  }

  // ── Iniciar ──
  render();

  function getTagColorAdmin(tag) {
    const colors = {
      'mindfulness': '#0D9488',
      'bienestar': '#059669',
      'meditación': '#6366F1',
      'meditacion': '#6366F1',
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
      'sanacion': '#7C3AED',
      'infancia': '#0891B2',
      'heridas emocionales': '#DC2626',
      'terapia regresiva': '#4F46E5',
      'constelaciones': '#8B5CF6',
      'familia': '#EC4899',
      'reiki': '#F59E0B',
      'flores de bach': '#10B981',
      'general': '#64748B',
    };
    return colors[tag.toLowerCase().trim()] || '#64748B';
  }
});
