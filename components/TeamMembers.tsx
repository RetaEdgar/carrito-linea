import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { X } from 'react-native-feather';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import styles from '../styles/TeamScreenStyles';

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
      scaleValue.value = withSpring(1, {
        damping: 8,
        stiffness: 100,
      });
      opacityValue.value = withSpring(1, {
        damping: 8,
        stiffness: 100,
      });
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

export default function TeamMembers({ onClose }: TeamMembersProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón para cerrar */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={onClose}
      >
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
        <Text style={styles.teacherRole}>Ingeniera en Desarrollo y Gestion de Software.</Text>
      </View>
    </ScrollView>
  );
}