"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert
} from "react-native"
import { X } from "react-native-feather"
import styles from "../styles/ConnectionModalStyles"

import { WebSocketConnection } from "../types/WebSocketTypes"

export interface ConnectionModalProps {
  onClose: () => void;
  esp32Connection: WebSocketConnection;
  serverConnection: WebSocketConnection;
  cartName: string;
  setCartName: (name: string) => void;
}

export default function ConnectionModal({ 
  onClose, 
  esp32Connection, 
  serverConnection,
  cartName,
  setCartName
}: ConnectionModalProps) {
  const [ipAddress, setIpAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isConnected = esp32Connection.isConnected;

  useEffect(() => {
    if (isConnected && isConnecting) {
      setIsConnecting(false);
      if (timeoutRef) {
        clearTimeout(timeoutRef);
        setTimeoutRef(null);
      }
      setError(null);
      onClose();
    }
  }, [isConnected, isConnecting, timeoutRef, onClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, [timeoutRef]);

  const initiateConnection = () => {
    if (ipAddress.trim()) {
      setIsConnecting(true);
      setError(null);

      let formattedAddress = ipAddress.trim();
      if (!formattedAddress.startsWith('ws://') && !formattedAddress.startsWith('wss://')) {
        formattedAddress = `ws://${formattedAddress}`;
      }
      if (!formattedAddress.includes(':')) {
        formattedAddress += ':8000';
      }

      console.log("Conectando a:", formattedAddress);
      esp32Connection.connect(formattedAddress, cartName || "auto");

      const timeout = setTimeout(() => {
        if (!esp32Connection.isConnected) {
          setIsConnecting(false);
          setError("No se pudo conectar al ESP32. Verifica la dirección y conexión de red.");
          Alert.alert(
            "Error de conexión",
            "No fue posible conectar al carrito. Revisa la IP y la conexión WiFi.",
            [{ text: "Entendido" }]
          );
        }
      }, 10000);

      setTimeoutRef(timeout);
    }
  }

  const disconnectAndClose = () => {
    if (isConnected) {
      esp32Connection.disconnect();
    }
    onClose();
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                {isConnected ? "Conectado al dispositivo" : "Establecer conexión"}
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X width={22} height={22} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Conexión activa */}
            {isConnected ? (
              <View style={styles.connectedContainer}>
                <Text style={styles.connectedText}>
                  Conexión establecida correctamente
                </Text>
                <TouchableOpacity
                  style={styles.disconnectButton}
                  onPress={disconnectAndClose}
                >
                  <Text style={styles.disconnectButtonText}>Desconectar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {/* Formulario */}
                <View style={styles.form}>
                  <Text style={styles.label}>Nombre del carrito</Text>
                  <TextInput
                    style={styles.input}
                    value={cartName}
                    onChangeText={setCartName}
                    placeholder="Ej: carrito001"
                    autoCapitalize="none"
                    editable={!isConnecting}
                  />

                  <Text style={styles.label}>Dirección IP</Text>
                  <TextInput
                    style={styles.input}
                    value={ipAddress}
                    onChangeText={setIpAddress}
                    placeholder="192.168.0.101"
                    keyboardType="url"
                    autoCapitalize="none"
                    editable={!isConnecting}
                  />

                  {error && (
                    <Text style={[styles.errorText, { marginTop: 8 }]}>
                      {error}
                    </Text>
                  )}

                  <Text style={styles.helperText}>
                    Solo ingresa la IP (ej. 192.168.0.101)
                  </Text>
                </View>

                {/* Botones */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}
                    disabled={isConnecting}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>

                  {isConnecting ? (
                    <View style={styles.connectButton}>
                      <ActivityIndicator size="small" color="#fff" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.connectButton}
                      onPress={initiateConnection}
                      disabled={!ipAddress.trim() || !cartName.trim()}
                    >
                      <Text style={styles.connectButtonText}>Conectar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
