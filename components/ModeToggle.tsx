import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Map, Navigation } from "react-native-feather";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from "react-native-reanimated";
import styles from "../styles/ModeToggleStyles";

interface ModeToggleProps {
  mode: "auto" | "manual";
  onToggle: () => void;
  disabled?: boolean;
}

export default function ModeToggle({ mode, onToggle, disabled = false }: ModeToggleProps) {
  // Estado compartido animado para el desplazamiento del pulgar
  const translateX = useSharedValue(mode === "manual" ? 50 : 0);

  // Actualiza la posición animada al cambiar el modo
  useEffect(() => {
    translateX.value = withSpring(mode === "manual" ? 50 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [mode, translateX]);

  // Estilo animado aplicado al "thumb"
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableOpacity
      style={[styles.container, disabled && { opacity: 0.5 }]}
      onPress={onToggle}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {/* Fondo del interruptor con iconos */}
      <View style={styles.track}>
        <View style={styles.iconContainer}>
          <Map width={20} height={20} color="#4b5563" />
        </View>
        <View style={styles.iconContainer}>
          <Navigation width={20} height={20} color="#4b5563" />
        </View>
      </View>

      {/* Pulgar animado */}
      <Animated.View style={[styles.thumb, animatedThumbStyle]} />

      {/* Etiquetas debajo del switch */}
      <View style={styles.labelContainer}>
        <Text style={[
          styles.label,
          mode === "auto" ? styles.activeLabel : styles.inactiveLabel
        ]}>
          Line
        </Text>
        <Text style={[
          styles.label,
          mode === "manual" ? styles.activeLabel : styles.inactiveLabel
        ]}>
          Manual
        </Text>
      </View>
    </TouchableOpacity>
  );
}
