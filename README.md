# Amaruki 🌸

Landing page profesional para **Terapia Transpersonal & Bienestar Integral**.

Sitio web personal para promocionar los servicios de Terapeuta Integral con mención en Psicología Transpersonal, formado en Centro Alma (Santiago, Chile).

## 🚀 Cómo usar

Solo abre `index.html` en tu navegador:

```bash
open index.html
# o simplemente haz doble clic en el archivo
```

## 📋 Antes de publicar

### 1. Tu número de WhatsApp
Reemplaza `569XXXXXXXX` en `main.js` con tu número real:

```js
const WHATSAPP_NUMBER = '569XXXXXXXX'; // → tu número
```

El número aparece en 5 lugares (hero, sección contacto, formulario, footer, botón flotante), pero con la centralización en JS solo necesitas cambiarlo una vez.

### 2. Tu email
Reemplaza `hola@amaruki.cl` en `index.html` con tu correo real. Aparece en:
- Sección de contacto
- Footer

### 3. URL del sitio
Actualiza `https://amaruki.cl` en el meta tag `og:url` del `<head>` si tienes un dominio real.

### 4. Testimonios
Los testimonios actuales son placeholder. Reemplázalos con testimonios reales de tus pacientes (con su autorización).

### 5. Formulario de contacto
El formulario actualmente solo simula el envío exitoso. Para hacerlo funcional puedes:
- Conectarlo a [Formspree](https://formspree.io/) (gratuito)
- Usar un servicio como [Web3Forms](https://web3forms.com/)
- O integrarlo con tu backend

## 🎨 Personalización

- **Colores**: Las variables CSS están en `:root` en `styles.css` — cambia `--primary`, `--sky`, etc.
- **Fuentes**: Inter (textos) + Playfair Display (títulos) desde Google Fonts.
- **Contenido**: Todo el copy está en `index.html`, fácil de editar.

## 📁 Estructura

```
amaruki/
├── index.html    → Página principal
├── styles.css    → Estilos completos
├── main.js       → Interacciones (nav, FAQ, formulario, animaciones)
└── README.md     → Este archivo
```

## 🛠 Hecho con

- HTML semántico
- CSS moderno (flexbox, grid, animaciones, variables)
- JavaScript vanilla (Intersection Observer para scroll)
- Diseño responsive
- Google Fonts
