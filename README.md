# equitylens-widget

Widget instalable para integrar gráficos financieros de EquityLens en cualquier web o aplicación.  
Incluye validación segura de dominio, manejo de errores y métodos para interactuar con el widget.

---

## Instalación

```bash
npm install equitylens-widget
```

---

## Uso básico

```js
import { initEquityLensWidget } from 'equitylens-widget';

initEquityLensWidget({
  apiKey: 'TU_API_KEY',
  containerId: 'mi-div-widget', // opcional, se crea si no existe
  symbol: 'AAPL',               // opcional, símbolo inicial
});
```

---

## Opciones disponibles

| Opción        | Tipo                | Descripción                                                                 |
|---------------|---------------------|-----------------------------------------------------------------------------|
| apiKey        | string (requerido)  | Tu API Key de EquityLens.                                                   |
| containerId   | string (opcional)   | ID del div donde se renderiza el widget. Si no existe, se crea automáticamente. |
| symbol        | string (opcional)   | Símbolo financiero inicial (ej: 'AAPL').                                   |
| width         | string (opcional)   | Ancho del iframe (ej: '100%', '800px').                                    |
| height        | string (opcional)   | Alto del iframe (ej: '600px', '100%').                                     |
| onError       | function (opcional) | Callback para manejar errores del widget.                                   |
| onEvent       | function (opcional) | Callback para manejar eventos personalizados del widget.                    |

---

## Métodos avanzados

La función retorna un objeto con utilidades para interactuar con el widget:

```js
const widget = initEquityLensWidget({
  apiKey: '...',
  containerId: 'mi-div-widget'
});

// Recargar el widget
widget.reload();

// Destruir el widget y limpiar listeners
widget.destroy();
```

---

## Ejemplo completo en React / Next.js

```jsx
import { useEffect } from 'react';
import { initEquityLensWidget } from 'equitylens-widget';

export default function MiComponente() {
  useEffect(() => {
    const widget = initEquityLensWidget({
      apiKey: 'TU_API_KEY',
      containerId: 'equitylens-container',
      symbol: 'AAPL',
      onError: (error) => {
        alert('Error en el widget: ' + error);
      },
      onEvent: (event) => {
        console.log('Evento del widget:', event);
      }
    });

    // Opcional: limpiar al desmontar
    return () => widget.destroy();
  }, []);

  return <div id="equitylens-container" style={{ width: '100%', height: '600px' }} />;
}
```

---

## Seguridad y validación

- El widget valida el dominio padre vía postMessage y la API Key contra los dominios permitidos en tu cuenta [EquityLens](https://equitylens.com.ar).
- Solo puede usarse en el navegador (no SSR).  
- Si usas Next.js, llama a la función dentro de un `useEffect`.

---

## Preguntas frecuentes

**¿Puedo usarlo en vanilla JS, React, Vue, Angular, Svelte?**  
Sí, el core es agnóstico. Para React puedes crear un wrapper, para otros frameworks puedes usar la función directamente.

**¿Qué pasa si llamo la función en SSR?**  
Lanzará un error. Solo debe usarse en el navegador.

**¿Cómo manejo errores del widget?**  
Usa la opción `onError` para recibir mensajes de error y mostrarlos como prefieras.

---

## Soporte

Para soporte técnico, dirigite a [nuestro sitio](https://equitylens.com.ar) y abre un tiket en soporte. o abre un issue en el repositorio.

---
