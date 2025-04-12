import React, { useEffect } from "react"
import { View, TouchableOpacity } from "react-native"
import { Power } from "react-native-feather"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"
import styles from "../styles/ControlButtonStyles"

interface ControlButtonProps {
  isRunning: boolean
  onToggle: () => void
  disabled?: boolean
}

export default function ControlButton({
  isRunning,
  onToggle,
  disabled = false,
}: ControlButtonProps) {
  const thumbPosition = useSharedValue(isRunning ? 64 : 0)

  useEffect(() => {
    thumbPosition.value = withSpring(isRunning ? 64 : 0, {
      damping: 18,
      stiffness: 160,
    })
  }, [isRunning, thumbPosition])

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbPosition.value }],
    backgroundColor: isRunning ? "#10b981" : "#dc2626", // emerald vs. elegant red
  }))

  return (
    <View style={[styles.container, disabled && { opacity: 0.4 }]}>
      <View style={styles.track} />
      <Animated.View style={[styles.thumb, thumbStyle]}>
        <Power width={30} height={30} color="#ffffff" />
      </Animated.View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onToggle}
        activeOpacity={0.7}
        disabled={disabled}
        accessibilityLabel="Botón de encendido/apagado"
      />
    </View>
  )
}
