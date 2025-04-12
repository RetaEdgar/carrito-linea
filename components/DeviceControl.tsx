import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Modal,
  SafeAreaView
} from "react-native";
import { ArrowLeft, Settings, Code, Users, Box } from "react-native-feather";

import MapDisplay from "./MapDisplay";
import Timer from "./Timer";
import ControlButton from "./ControlButton";
import ConnectionModal from "./ConnectionModal";
import ModeToggle from "./ModeToggle";
import ManualControls from "./ManualControls";
import TeamMembers from "./TeamMembers";
import Materials from "./Materials";

import DeviceControlStyles, { createAdaptiveStyles } from "../styles/DeviceControlStyles";
import useWebSocketManager from "../hooks/useWebSocketManager";
import { DeviceControlProps } from "../types/WebSocketTypes";

export default function DeviceControl({ isLandscape: isLandscapeProp }: DeviceControlProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [controlMode, setControlMode] = useState<"auto" | "manual">("auto");
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");
  const [serverMode, setServerMode] = useState<string>("auto");
  const [path, setPath] = useState<any[]>([]);
  const [currentPosition, setCurrentPosition] = useState<any>(null);
  const [isModeSynced, setIsModeSynced] = useState(true);
  const [cartName, setCartName] = useState("auto");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sensorData, setSensorData] = useState({ left: 0, center: 0, right: 0 });

  const wsManager = useWebSocketManager();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const isLandscape = isLandscapeProp || screenWidth > screenHeight;
  const styles = createAdaptiveStyles(isLandscape, screenWidth, screenHeight);
  const slideAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setIsRunning(status === "running");
  }, [status]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: controlMode === "manual" ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [controlMode]);

  useEffect(() => {
    if (!wsManager.esp32.socket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log("ESP32 →", data);

        if (data.sensors) {
          setSensorData({
            left: data.sensors.left || 0,
            center: data.sensors.center || 0,
            right: data.sensors.right || 0
          });
          updatePosition(data.sensors);
        }

        if (data.type === "status") {
          setStatus(data.status);
        }

        if (data.type === "mode") {
          setServerMode(data.mode);
          const modeFromDevice = data.mode === "auto" ? "auto" : "manual";
          setIsModeSynced(modeFromDevice === controlMode);
        }
      } catch (err) {
        console.error("Error parsing ESP32 message:", err);
      }
    };

    wsManager.esp32.socket.addEventListener("message", handleMessage);
    return () => wsManager.esp32.socket?.removeEventListener("message", handleMessage);
  }, [wsManager.esp32.socket, controlMode]);

  const updatePosition = useCallback((sensors: { left: number, center: number, right: number }) => {
    const newPosition = {
      x: currentPosition ? currentPosition.x + (Math.random() * 2 - 1) : 0,
      y: currentPosition ? currentPosition.y + 1 : 0,
      timestamp: Date.now()
    };

    setCurrentPosition(newPosition);
    setPath(prev => [...prev, newPosition]);

    if (wsManager.server.isConnected) {
      wsManager.server.send({
        type: "map_data",
        cart_name: cartName,
        position: newPosition,
        path: [...path, newPosition],
        elapsed_time: elapsedTime,
        sensors
      });
    }
  }, [currentPosition, path, wsManager.server, cartName, elapsedTime]);

  useEffect(() => {
    if (wsManager.esp32.isConnected) {
      const modeMsg = {
        action: "modo",
        valor: controlMode
      };
      wsManager.esp32.send(modeMsg);
      console.log("Modo enviado al ESP32:", modeMsg);
    }
  }, [controlMode, wsManager.esp32.isConnected]);

  const handleTimerUpdate = (time: number) => {
    setElapsedTime(time);
    if (wsManager.server.isConnected && isRunning) {
      wsManager.server.send({
        type: "timer_data",
        cart_name: cartName,
        elapsed_time: time
      });
    }
  };

  const handleToggle = () => {
    const newState = !isRunning;
    setIsRunning(newState);
    wsManager.esp32.send({ action: newState ? "empezar" : "parar" });
  };

  const handleModeToggle = () => {
    const nextMode = controlMode === "auto" ? "manual" : "auto";
    setControlMode(nextMode);
    setIsModeSynced(false);
  };

  const mapData = {
    path,
    currentPosition,
    timestamp: Date.now(),
    speed: 0,
    batteryLevel: 0
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton}>
              <ArrowLeft width={isLandscape ? 20 : 24} height={isLandscape ? 20 : 24} color="white" />
            </TouchableOpacity>
            <Image
              source={require("../assets/eva.png")}
              style={{ width: 30, height: 30, marginHorizontal: 8, borderRadius: 6 }}
              resizeMode="contain"
            />
            <Text style={styles.title}>Carrito EVA</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setShowConnectionModal(true)}>
              <Settings width={isLandscape ? 20 : 24} height={isLandscape ? 20 : 24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleModeToggle}>
              <Code width={isLandscape ? 20 : 24} height={isLandscape ? 20 : 24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Animated.View
            style={[
              styles.modeContainer,
              {
                transform: [{
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -screenWidth]
                  })
                }],
                opacity: slideAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0.5, 0]
                }),
                width: screenWidth
              }
            ]}
          >
            <View style={styles.mapContainer}>
              <View style={styles.timerContainer}>
                <Timer
                  isRunning={isRunning && controlMode === "auto"}
                  resetOnStart
                  onUpdate={handleTimerUpdate}
                />
              </View>
              <MapDisplay mapData={mapData} />
              <View style={styles.controlButtonContainer}>
                <ControlButton
                  isRunning={isRunning}
                  onToggle={handleToggle}
                  disabled={!wsManager.esp32.isConnected}
                />
              </View>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.manualContainer,
              {
                transform: [{
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenWidth, 0]
                  })
                }],
                opacity: slideAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 1]
                }),
                width: screenWidth
              }
            ]}
          >
            <ManualControls
              isActive={controlMode === "manual" && wsManager.esp32.isConnected}
              socket={wsManager.esp32.socket}
              sendCommand={(command: string) => {
                if (wsManager.esp32.isConnected && controlMode === "manual") {
                  wsManager.esp32.send({
                    action: "control",
                    comando: command
                  });
                }
              }}
            />
          </Animated.View>
        </View>

        {/* Botón Equipo */}
        <TouchableOpacity
          style={[
            styles.teamButton,
            {
              bottom: isLandscape ? 80 : 90,
              right: isLandscape ? 16 : 24
            }
          ]}
          onPress={() => setShowTeamMembers(true)}
        >
          <Users width={20} height={20} color="#FFFFFF" />
          <Text style={styles.teamButtonText}>Informacion</Text>
        </TouchableOpacity>

        {/* ✅ Botón Materiales */}
        {/* <TouchableOpacity
          style={[
            styles.materialsButton,
            {
              bottom: isLandscape ? 16 : 24,
              right: isLandscape ? 16 : 24
            }
          ]}
          onPress={() => setShowMaterials(true)}
        >
          <Box width={20} height={20} color="#FFFFFF" />
          <Text style={styles.materialsButtonText}>Materiales</Text>
        </TouchableOpacity> */}

        {/* Modales */}
        <Modal visible={showTeamMembers} animationType="slide" onRequestClose={() => setShowTeamMembers(false)}>
          <TeamMembers onClose={() => setShowTeamMembers(false)} />
        </Modal>

        <Modal visible={showMaterials} animationType="slide" onRequestClose={() => setShowMaterials(false)}>
          <Materials onClose={() => setShowMaterials(false)} />
        </Modal>

        {showConnectionModal && (
          <ConnectionModal
            onClose={() => setShowConnectionModal(false)}
            esp32Connection={wsManager.esp32}
            serverConnection={wsManager.server}
            cartName={cartName}
            setCartName={setCartName}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
