// Tipo base para todos los mensajes
export interface BaseMessage {
  type: string;
  timestamp?: number;
}

// Tipos específicos de mensajes que envía el cliente al servidor
export interface ControlMessage extends BaseMessage {
  type: 'control';
  command: 'forward' | 'back' | 'left' | 'right' | 'stop';
  value?: number; // Para velocidad
}

export interface ModeMessage extends BaseMessage {
  type: 'mode';
  mode: 'auto' | 'manual';
}

export interface StatusRequestMessage extends BaseMessage {
  type: 'statusRequest';
}

// Mensaje para la bocina
export interface HornMessage extends BaseMessage {
  type: 'horn';
  active: boolean;
}

// Tipos específicos de mensajes que envía el servidor al cliente
export interface StatusResponseMessage extends BaseMessage {
  type: 'statusResponse';
  mode: 'auto' | 'manual';
  status: string;
  batteryLevel: number;
  speed: number;
}

export interface MapUpdateMessage extends BaseMessage {
  type: 'mapUpdate';
  path: Array<{x: number, y: number}>;
  currentPosition: {x: number, y: number};
  speed: number;
  batteryLevel: number;
}

export interface Point {
  x: number
  y: number
}

export interface MapData {
  path: Point[]
  currentPosition: Point
  timestamp: number
  speed: number
  batteryLevel?: number
  sensorValues?: number[]
}

export interface MapDisplayProps {
  mapData: MapUpdateMessage | MapData | null
}

export interface ManualControlsProps {
  isActive: boolean;
  sendCommand: (command: string) => void;
  socket: WebSocket | null;
}

export interface ConnectionModalProps {
  onClose: () => void;
  isConnected: boolean;
  connect: (url: string) => void;
  disconnect: () => void;
}

export interface DeviceControlProps {
  isLandscape: boolean;
  esp32Connection: WebSocketConnection;

}

export interface WebSocketConnection {
  socket: WebSocket | null;
  isConnected: boolean;
  connect: (url: string, clientId: string) => void;
  disconnect: () => void;
  send: (message: any) => void;
}

export interface WebSocketConnections {
  esp32: WebSocketConnection;
  server: WebSocketConnection;
}


// Tipos de mensajes que se pueden enviar
export type OutgoingMessage = ControlMessage | ModeMessage | StatusRequestMessage | HornMessage;

// Tipos de mensajes que se pueden recibir
export type IncomingMessage = StatusResponseMessage | MapUpdateMessage;

// Tipo para las funciones de manejo de mensajes
export type MessageHandler<T = IncomingMessage> = (message: T) => void; 