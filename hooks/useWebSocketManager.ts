import { useState, useEffect, useRef } from 'react';

import { WebSocketConnection, WebSocketConnections } from '../types/WebSocketTypes';

const useWebSocketManager = (): WebSocketConnections => {
  // Conexión ESP32
  const [esp32Socket, setEsp32Socket] = useState<WebSocket | null>(null);
  const [esp32Connected, setEsp32Connected] = useState<boolean>(false);
  
  // Referencia para mantener URL activa y client ID
  const esp32UrlRef = useRef<string>("");
  const clientIdRef = useRef<string>("");

  // Función para conectar alESP32
  const connectEsp32 = (url: string, clientId: string) => {
    if (esp32Socket) {
      esp32Socket.close();
      setEsp32Socket(null);
    }

    esp32UrlRef.current = url;
    clientIdRef.current = clientId || "auto";
    
    try {
      // Aseguramos que la URL tenga el formato WebSocket correcto
      if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
        url = `ws://${url}`;
      }
      
      // Aseguramos que se use el puerto 8000 (puerto del ESP32)
      if (!url.includes(':')) {
        url = `${url}:8000`;
      }
      
      console.log('Intentando conectar a:', url);
      
      const ws = new WebSocket(url);
      
      ws.onopen = () => {
        console.log('ESP32 WebSocket conectado');
        setEsp32Connected(true);
        
        // Enviar identificación si es necesario (según el código del ESP32)
        // Esto parece no ser requerido por tu ESP32 según el código, pero lo añadimos por si acaso
        try {
          const identificacion = {
            action: "identificacion",
            client_id: clientIdRef.current
          };
          ws.send(JSON.stringify(identificacion));
          console.log("Mensaje de identificación enviado:", identificacion);
        } catch (err) {
          console.error("Error al enviar identificación:", err);
        }
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Mensaje recibido de ESP32:', data);
        } catch (e) {
          console.log('Mensaje recibido (no JSON):', event.data);
        }
      };
      
      ws.onclose = (event) => {
        console.log(`ESP32 WebSocket desconectado. Código: ${event.code}, Razón: ${event.reason}`);
        setEsp32Connected(false);
      };
      
      ws.onerror = (error) => {
        console.error('ESP32 WebSocket error:', error);
        console.log('Intenta revisar la URL y asegúrate de que el ESP32 esté en la misma red');
        setEsp32Connected(false);
      };
      
      setEsp32Socket(ws);
    } catch (error) {
      console.error('Error al crear objeto WebSocket:', error);
    }
  };

  // Función para desconectar ESP32
  const disconnectEsp32 = () => {
    if (esp32Socket) {
      console.log('Cerrando conexión WebSocket manualmente');
      esp32Socket.close();
      setEsp32Socket(null);
      setEsp32Connected(false);
    }
  };

  // Función para enviar mensajes al ESP32
  const sendToEsp32 = (message: any) => {
    if (esp32Socket && esp32Connected) {
      try {
        // Asegurar formato JSON correcto
        const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
        console.log("DEBUG - Mensaje antes de enviar:", messageStr);
        esp32Socket.send(messageStr);
        console.log("Mensaje enviado a ESP32:", messageStr);
      } catch (error) {
        console.error("Error al enviar mensaje a ESP32:", error);
      }
    } else {
      console.warn("ESP32 WebSocket no conectado, estado:", esp32Connected ? "conectado" : "desconectado");
    }
  };

  // Limpieza en desmonte
  useEffect(() => {
    return () => {
      if (esp32Socket) {
        console.log('Limpiando conexión WebSocket en useEffect');
        esp32Socket.close();
      }
    };
  }, []);

  // Mantenemos la estructura WebSocketConnections para minimizar los cambios en el resto de la app
  return {
    esp32: {
      socket: esp32Socket,
      isConnected: esp32Connected,
      connect: connectEsp32,
      disconnect: disconnectEsp32,
      send: sendToEsp32
    },
    server: {
      socket: null,
      isConnected: false,
      connect: () => {}, // Función vacía
      disconnect: () => {}, // Función vacía
      send: () => {} // Función vacía
    }
  };
};

export default useWebSocketManager;