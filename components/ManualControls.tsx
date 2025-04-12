import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  StopCircle
} from "react-native-feather";

import { createManualControlsStyles } from "../styles/ManualControlsStyles";

interface ManualControlsProps {
  isActive: boolean;
  sendCommand: (command: string) => void;
  socket: WebSocket | null;
}

const ManualControls = ({ isActive, sendCommand, socket }: ManualControlsProps) => {
  const [speed, setSpeed] = useState(50);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [isLandscape, setIsLandscape] = useState(dimensions.width > dimensions.height);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
      setIsLandscape(window.width > window.height);
    });
    return () => subscription.remove();
  }, []);

  const styles = createManualControlsStyles(isLandscape, dimensions.width, dimensions.height);

  const handlePress = (command: string) => {
    if (isActive && socket?.readyState === WebSocket.OPEN) {
      const message = {
        type: "control",
        command,
        speed
      };
      sendCommand(JSON.stringify(message));
    }
  };

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
    if (isActive && socket?.readyState === WebSocket.OPEN) {
      sendCommand(JSON.stringify({
        type: "control",
        command: "set_speed",
        speed: value
      }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        {/* Adelante / Atrás */}
        <View style={styles.upDownContainer}>
          <TouchableOpacity
            style={[styles.directionButton, !isActive && styles.disabledButton]}
            onPress={() => handlePress("forward")}
            disabled={!isActive}
            activeOpacity={0.7}
          >
            <ArrowUp
              stroke={isActive ? "#10b981" : "#9ca3af"}
              width={buttonSize(isLandscape, dimensions) * 0.6}
              height={buttonSize(isLandscape, dimensions) * 0.6}
            />
          </TouchableOpacity>

          <View style={styles.spacer} />

          <TouchableOpacity
            style={[styles.directionButton, !isActive && styles.disabledButton]}
            onPress={() => handlePress("backward")}
            disabled={!isActive}
            activeOpacity={0.7}
          >
            <ArrowDown
              stroke={isActive ? "#10b981" : "#9ca3af"}
              width={buttonSize(isLandscape, dimensions) * 0.6}
              height={buttonSize(isLandscape, dimensions) * 0.6}
            />
          </TouchableOpacity>
        </View>

        {/* STOP en lugar de horn */}
        <View style={styles.centerColumn}>
          <View style={styles.centerBottom}>
            <TouchableOpacity
              style={[styles.hornButton, !isActive && styles.disabledHornButton]}
              onPress={() => handlePress("stop")}
              disabled={!isActive}
              activeOpacity={0.7}
            >
              <StopCircle
                stroke="white"
                width={buttonSize(isLandscape, dimensions) * 0.6}
                height={buttonSize(isLandscape, dimensions) * 0.6}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Izquierda / Derecha */}
        <View style={styles.leftRightContainer}>
          <View style={styles.horizontalButtonsContainer}>
            <TouchableOpacity
              style={[styles.horizontalButton, !isActive && styles.disabledButton]}
              onPress={() => handlePress("left")}
              disabled={!isActive}
              activeOpacity={0.7}
            >
              <ArrowLeft
                stroke={isActive ? "#10b981" : "#9ca3af"}
                width={buttonSize(isLandscape, dimensions) * 0.6}
                height={buttonSize(isLandscape, dimensions) * 0.6}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.horizontalButton, !isActive && styles.disabledButton]}
              onPress={() => handlePress("right")}
              disabled={!isActive}
              activeOpacity={0.7}
            >
              <ArrowRight
                stroke={isActive ? "#10b981" : "#9ca3af"}
                width={buttonSize(isLandscape, dimensions) * 0.6}
                height={buttonSize(isLandscape, dimensions) * 0.6}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {!isActive && (
        <View style={styles.disabledOverlay}>
          <Text style={styles.disabledText}>
            Tsss, parece que algo salio mal... Verifica la conexion de la ESP32
          </Text>
        </View>
      )}
    </View>
  );
};

const buttonSize = (
  isLandscape: boolean,
  dimensions: { width: number; height: number }
): number => {
  return isLandscape
    ? Math.min(dimensions.height * 0.35, 120)
    : Math.min(dimensions.width * 0.3, 110);
};

export default ManualControls;
