import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { X } from 'react-native-feather';

const COLORS = {
  background: '#f8f4e8',
  primary: '#5d4037',
  secondary: '#8d6e63',
  cardBackground: '#efebe9',
  textDark: '#3e2723',
  textMedium: '#5d4037',
  border: '#a1887f',
  accent: '#6d4c41',
  white: '#ffffff'
};

interface MaterialItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface MaterialsScreenProps {
  onClose: () => void;
}

const MATERIALS_DATA: MaterialItem[] = [
  {
    id: '1',
    name: 'Sensor Infrarrojo',
    description: 'Detecta la línea negra sobre superficie blanca',
    imageUrl: 'https://th.bing.com/th/id/OIP.bczv4L1uSr3kEFqbOiNstwHaHa?pid=ImgDet&rs=1',
  },
  {
    id: '2',
    name: 'ESP32',
    description: 'Placa de control principal del carrito',
    imageUrl: 'https://th.bing.com/th/id/OIP.gQaeqcLLcK2nIJzXEI42tQHaGN?pid=ImgDet&rs=1',
  },
  {
    id: '3',
    name: 'Motor DC',
    description: 'Motores para el movimiento del carrito',
    imageUrl: 'https://th.bing.com/th/id/OIP.Rb77YKxs8tnsBiSuaIGZ6QHaHa?pid=ImgDet&rs=1',
  },
  {
    id: '4',
    name: 'Puente H',
    description: 'Controlador para los motores DC',
    imageUrl: 'https://th.bing.com/th/id/OIP.Xzjz4HFjEPAr-9BewPC4zAHaHa?pid=ImgDet&rs=1',
  },
  {
    id: '5',
    name: 'Batería 9V',
    description: 'Fuente de alimentación del sistema',
    imageUrl: 'https://th.bing.com/th/id/OIP.h_HOfAmasyywo-wnMCvQfgHaEK?pid=ImgDet&rs=1',
  },
  {
    id: '6',
    name: 'Sensor de presión',
    description: 'Mide presión atmosférica, altitud y temperatura',
    imageUrl: 'https://th.bing.com/th/id/OIP.ZUVYCrQ3P7eRQg4IYKfjBQHaHa?pid=ImgDet&rs=1',
  },
];

const MaterialCard = ({ item }: { item: MaterialItem }) => (
  <View style={styles.card}>
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="contain"
        onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);

const Materials = ({ onClose }: MaterialsScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Cerrar"
          >
            <X stroke={COLORS.primary} width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Materiales del Proyecto</Text>
          <Text style={styles.subtitle}>Componentes utilizados</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {MATERIALS_DATA.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: COLORS.textMedium,
    lineHeight: 18,
  },
});

export default Materials;