export interface MaterialItem {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    color: string;
  }
  
  export const MATERIALS_DATA: MaterialItem[] = [
    {
      id: '1',
      name: 'Sensor Infrarrojo',
      description: 'Detecta la línea negra sobre superficie blanca',
      imageUrl: 'https://th.bing.com/th/id/OIP.bczv4L1uSr3kEFqbOiNstwHaHa?pid=ImgDet&rs=1',
      color: '#FF6B6B'
    },
    {
      id: '2',
      name: 'ESP32',
      description: 'Placa de control principal del carrito',
      imageUrl: 'https://th.bing.com/th/id/OIP.gQaeqcLLcK2nIJzXEI42tQHaGN?pid=ImgDet&rs=1',
      color: '#4ECDC4'
    },
    {
      id: '3',
      name: 'Motor DC',
      description: 'Motores para el movimiento del carrito',
      imageUrl: 'https://th.bing.com/th/id/OIP.Rb77YKxs8tnsBiSuaIGZ6QHaHa?pid=ImgDet&rs=1',
      color: '#FFE66D'
    },
    {
      id: '4',
      name: 'Puente H',
      description: 'Controlador para los motores DC',
      imageUrl: 'https://th.bing.com/th/id/OIP.Xzjz4HFjEPAr-9BewPC4zAHaHa?pid=ImgDet&rs=1',
      color: '#FF9F1C'
    },
    {
      id: '5',
      name: 'Batería 9V',
      description: 'Fuente de alimentación del sistema',
      imageUrl: 'https://th.bing.com/th/id/OIP.h_HOfAmasyywo-wnMCvQfgHaEK?pid=ImgDet&rs=1',
      color: '#A463F2'
    },
    {
      id: '6',
      name: 'Sensor de presión',
      description: 'Mide presión atmosférica, altitud y temperatura',
      imageUrl: 'https://th.bing.com/th/id/OIP.ZUVYCrQ3P7eRQg4IYKfjBQHaHa?pid=ImgDet&rs=1',
      color: '#6AFF8F'
    },
    {
      id: '7',
      name: 'Sensor Giroscópio',
      description: 'Determina la orientación y mide la rotación',
      imageUrl: 'https://th.bing.com/th/id/OIP.iR3DUHW2da_iohZvEgE2NwHaHa?pid=ImgDet&rs=1',
      color: '#FF8E9E'
    },
    {
      id: '8',
      name: 'Sensor DHT11',
      description: 'Mide humedad y temperatura con salida digital',
      imageUrl: 'https://th.bing.com/th/id/OIP.mfoPmynvbZKNcJiSv0v0DAHaFf?pid=ImgDet&rs=1',
      color: '#7FB3FF'
    }
  ];
  
  export const COLORS = {
    background: '#0A0E21',
    primary: '#00FFAA',
    secondary: '#A0A0A0',
    cardBackground: 'rgba(30, 30, 30, 0.8)',
    textDark: '#E0E0E0',
    textMedium: '#A0A0A0',
    border: '#2A2A2A',
    accent: '#00FFAA',
    white: '#FFFFFF'
  };