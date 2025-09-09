export interface WidgetOptions {
  apiKey: string;
  containerId?: string;
  symbol?: string;
  width?: string;
  height?: string;
  onError?: (error: string) => void;
  onEvent?: (event: any) => void;
}

export function initEquityLensWidget(options: WidgetOptions) {
  // 1. Validación de entorno
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('EquityLens Widget solo puede usarse en el navegador.');
  }

  // 2. Validación de opciones
  if (!options.apiKey || typeof options.apiKey !== 'string') {
    throw new Error('Debes proveer un apiKey válido.');
  }

  // 3. Prevención de duplicados
  const containerId = options.containerId || 'equitylens-widget-container';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  } else {
    // Limpia el contenido anterior si existe
    container.innerHTML = '';
  }

  // 4. Crear el iframe
  const iframe = document.createElement('iframe');
  const symbol = options.symbol || 'AAPL';
  const width = options.width || '100%';
  const height = options.height || '600px';

  iframe.src = `https://widget.equitylens.com.ar/chart`;
  iframe.style.width = width;
  iframe.style.height = height;
  iframe.style.border = 'none';
  iframe.setAttribute('title', 'EquityLens Financial Chart');
  container.appendChild(iframe);

  // 5. Enviar el parentDomain por postMessage
  iframe.onload = () => {
    iframe.contentWindow?.postMessage(
      { parentDomain: window.location.hostname, apiKey: options.apiKey, symbol: symbol },
      '*'
    );
  };

  // 6. Escuchar mensajes del widget (errores y eventos)
  const messageHandler = (event: MessageEvent) => {
    if (event.source !== iframe.contentWindow) return;
    if (event.data && event.data.widgetError) {
      if (typeof options.onError === 'function') {
        options.onError(event.data.widgetError);
      } else {
        console.error('EquityLens Widget Error:', event.data.widgetError);
      }
    }
    if (event.data && event.data.widgetEvent) {
      if (typeof options.onEvent === 'function') {
        options.onEvent(event.data.widgetEvent);
      }
    }
  };
  window.addEventListener('message', messageHandler);

  // 7. Retornar métodos para controlar el widget
  return {
    reload: () => iframe.contentWindow?.location.reload(),
    setWidth: (newWidth: string) => {
      iframe.style.width = newWidth;
    },
    setHeight: (newHeight: string) => {
      iframe.style.height = newHeight;
    },
    destroy: () => {
      window.removeEventListener('message', messageHandler);
      if (container) {
        container.removeChild(iframe);
      }
    }
  };
}