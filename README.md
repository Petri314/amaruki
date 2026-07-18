# Amaruki 🌿✨

**Amaru** (serpiente mítica aimara que renace) + **Ki** (energía vital japonesa)

Landing page profesional para **Terapia Transpersonal & Bienestar Integral** de **Patricio Almendra Zuñiga**, Terapeuta Integral formado en Centro Alma (Santiago, Chile).

🌐 **Publicado en:** https://petri314.github.io/amaruki

---

## 📋 Estado del proyecto

### ✅ Datos configurados

| Dato | Valor |
|------|-------|
| **Nombre** | Patricio Almendra Zuñiga |
| **WhatsApp** | [+569 7234 7776](https://wa.me/56972347776) |
| **Email** | amaruki333@gmail.com |
| **Instagram** | [@amaruki333](https://instagram.com/amaruki333) |
| **Modalidad** | Online vía Zoom |

### ✅ Integraciones activas

- **Formulario de contacto:** Listo para Formspree ([ver activación](#-activar-formulario-formspree))
- **GitHub Pages:** Publicado en `https://petri314.github.io/amaruki`

### ⏳ Pendiente

- Reemplazar testimonios placeholder por reales
- Agregar foto profesional en "Sobre mí"
- Activar Formspree (crear cuenta + reemplazar `TU_FORM_ID`)
- Comprar dominio `.cl` si lo deseas

---

## 🎨 Identidad visual

### Paleta de colores

El diseño honra el significado del nombre **Amaruki**:

```
🌿 Esmeralda  #059669  →  Amaru: la serpiente que renace, transformación
✨ Oro        #D97706  →  Ki: la energía vital, el sol interior
🏺 Terracota  #B45309  →  Raíces andinas, tierra
🌲 Bosque     #064E3B  →  La profundidad, lo sagrado
```

### Tipografía

| Estilo | Fuente |
|--------|--------|
| Títulos | **Playfair Display** (serif elegante) |
| Textos | **Inter** (sans-serif moderna) |

### Animaciones

| Animación | Descripción |
|-----------|-------------|
| 🐍 `serpentineWave` | Línea dorada ondulante en el hero |
| 💫 `scaleIn` | Entrada con escala en elementos destacados |
| 🟢 `glowEmerald` | Brillo pulsante esmeralda |
| 🔄 `morphShape` | Formas orgánicas mutantes en el fondo |
| 📜 Scroll reveal | 5 variantes: `data-aos`, `data-aos-scale`, `data-aos-left`, `data-aos-right`, `data-aos-zoom` |

---

## 📁 Estructura del proyecto

```
amaruki/
├── index.html       → Página principal (estructura y contenido)
├── styles.css       → Estilos completos (paleta, animaciones, responsive)
├── main.js          → Interacciones (nav, scroll, FAQ, formulario, animaciones)
├── images/
│   └── logo.jpg     → Logo de Amaruki
├── .gitignore       → Archivos ignorados por git
└── README.md        → Esta documentación
```

---

## 🔧 Cómo modificar

### Contenido

Todo el texto de la página está en `index.html`. Busca la sección que quieras modificar usando los comentarios HTML:

```html
<!-- ═══ HERO ═══ -->
<!-- ═══ SERVICIOS ═══ -->
<!-- ═══ SOBRE MÍ ═══ -->
```

### Colores

Las variables de color están en `:root` al inicio de `styles.css`. Cambia los valores hex para personalizar:

```css
:root {
  --primary: #059669;       /* Color principal */
  --primary-dark: #047857;  /* Variante oscura */
  --gold: #D97706;         /* Acento dorado */
  --terracotta: #B45309;   /* Acento terracota */
}
```

---

## 🚀 Activar formulario (Formspree)

Para que el formulario de contacto envíe correos de verdad:

1. Ve a [formspree.io](https://formspree.io/) y crea cuenta gratis con `amaruki333@gmail.com`
2. Crea un nuevo formulario
3. Copia el **Form ID** que te dan (ej: `xyzabcde`)
4. En `index.html`, busca `TU_FORM_ID` y reemplázalo:

```html
<form action="https://formspree.io/f/TU_FORM_ID" ...>
<!-- →  https://formspree.io/f/xyzabcde -->
```

**Plan gratuito:** 50 envíos/mes — suficiente para empezar.

---

## 🌐 Publicar cambios

```bash
cd amaruki
git add -A
git commit -m "Descripción del cambio"
git push
```

GitHub Pages se actualiza automáticamente en 1-2 minutos.

---

## 🛠 Tecnologías

- HTML semántico
- CSS moderno (Flexbox, Grid, custom properties, animaciones)
- JavaScript vanilla (Intersection Observer, Fetch API)
- Formspree (backend de formulario)
- GitHub Pages (hosting)
- Google Fonts
