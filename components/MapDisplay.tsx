import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import type { MapDisplayProps } from "../types/WebSocketTypes";

export default function MapDisplay({ mapData }: MapDisplayProps) {
  // Definir dimensiones del mapa SVG
  const screenWidth = Dimensions.get("window").width - 32; // Margen horizontal total
  const mapHeight = 250;

  // Genera el path SVG a partir de los puntos de la trayectoria
  const generatePathData = (): string => {
    if (!mapData?.path?.length) return "";

    const [start, ...rest] = mapData.path;
    const path = [`M ${start.x} ${start.y}`];

    rest.forEach(point => {
      path.push(`L ${point.x} ${point.y}`);
    });

    return path.join(" ");
  };

  return (
    <View style={styles.container}>
      {!mapData ? (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Esperando datos del mapa...</Text>
        </View>
      ) : (
        <Svg width={screenWidth} height={mapHeight} style={styles.mapSvg}>
          {/* Trazo del recorrido */}
          <Path
            d={generatePathData()}
            stroke="#333"
            strokeWidth={3}
            fill="none"
          />

          {/* Posición actual del carrito */}
          {mapData.currentPosition && (
            <Circle
              cx={mapData.currentPosition.x}
              cy={mapData.currentPosition.y}
              r={8}
              fill="#000"
            />
          )}
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#6b7280",
    fontSize: 14,
  },
  mapSvg: {
    backgroundColor: "#f3f4f6",
  },
});
