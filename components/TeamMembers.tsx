import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'react-native-feather';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import styles from '../styles/TeamScreenStyles';

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

interface TeamMemberProps {
  name: string;
  role: string;
  delay: number;
  image: any;
}

interface TeamMembersProps {
  onClose: () => void;
}

const TeamMember = ({ name, role, delay, image }: TeamMemberProps) => {
  const scaleValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  React.useEffect(() => {
    setTimeout(() => {
      scaleValue.value = withSpring(1, { damping: 8, stiffness: 100 });
      opacityValue.value = withSpring(1, { damping: 8, stiffness: 100 });
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  return (
    <Animated.View style={[styles.memberCard, animatedStyle]}>
      <View style={styles.avatarContainer}>
        <Image
          source={image}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{name}</Text>
        <Text style={styles.memberRole}>{role}</Text>
        <View style={styles.skillBar}>
          <View style={[styles.skillFill, { width: '90%' }]} />
        </View>
      </View>
    </Animated.View>
  );
};

const MATERIALS_DATA = [
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

const MaterialCard = ({ item }: { item: typeof MATERIALS_DATA[0] }) => (
  <View style={materialStyles.card}>
    <View style={materialStyles.imageWrapper}>
      <Image
        source={{ uri: item.imageUrl }}
        style={materialStyles.image}
        resizeMode="contain"
      />
    </View>
    <View style={materialStyles.textContainer}>
      <Text style={materialStyles.name}>{item.name}</Text>
      <Text style={materialStyles.description}>{item.description}</Text>
    </View>
  </View>
);

export default function TeamMembers({ onClose }: TeamMembersProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X width={24} height={24} color="#4b5563" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Equipo EVA</Text>
        <Text style={styles.subtitle}>Proyecto desarrollado por:</Text>
      </View>

      <TeamMember
        name="Reta Ravelo Edgar Jesus"
        role="Ingeniero de Software"
        delay={400}
        image={require('../assets/reta_formal.jpg')}
      />

      <TeamMember
        name="Mendoza Gonzalez Cecilia Gabriela"
        role="Ingeniero de Sistemas"
        delay={300}
        image={require('../assets/gaby.jpg')}
      />

      <TeamMember
        name="Valles Lugo Ricardo Manuel"
        role="Ingeniero Frontend"
        delay={100}
        image={require('../assets/lugo.jpg')}
      />

      <View style={styles.teacherCard}>
        <Text style={styles.teacherTitle}>Docente encargado:</Text>
        <Text style={styles.teacherName}>Ing. Ana Laura Lara Chairez</Text>
        <Text style={styles.teacherRole}>Ingeniera en Desarrollo y Gestión de Software.</Text>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Text style={materialStyles.sectionTitle}>Materiales del Proyecto</Text>
        <Text style={materialStyles.sectionSubtitle}>Componentes utilizados:</Text>
        {MATERIALS_DATA.map((item) => (
          <MaterialCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const materialStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 16,
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
