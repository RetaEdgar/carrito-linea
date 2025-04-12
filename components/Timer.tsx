import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

interface TimerProps {
  isRunning: boolean;
  resetOnStart?: boolean;
  onUpdate?: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ isRunning, resetOnStart = false, onUpdate }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Iniciar temporizador
    if (isRunning) {
      if (resetOnStart) setElapsedTime(0);

      lastUpdateTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const delta = now - lastUpdateTimeRef.current;
        lastUpdateTimeRef.current = now;

        setElapsedTime((prev) => {
          const updatedTime = prev + delta;

          // Notificar al componente padre (si corresponde)
          onUpdate?.(updatedTime);

          return updatedTime;
        });
      }, 100); // Frecuencia de actualización: 100 ms
    } else {
      // Detener temporizador si ya estaba en ejecución
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Limpieza al desmontar o cambiar estado
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, resetOnStart, onUpdate]);

  // Convertir el tiempo en milisegundos al formato mm:ss.cs
  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },
  timeText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
});

export default Timer;
