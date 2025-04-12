import { StyleSheet } from "react-native";

// Paleta de colores premium
const colors = {
  track: "#f1f5f9",           // Gris muy claro para el fondo
  thumb: "#ffffff",           // Blanco puro para el control deslizante
  activeText: "#0f172a",      // Azul oscuro para texto activo
  inactiveText: "#94a3b8",    // Gris azulado para texto inactivo
  border: "#e2e8f0",         // Borde sutil
  shadow: "#000",            // Color de sombra
};

const ModeToggleStyles = StyleSheet.create({
  container: {
    width: 104,              // Ancho ligeramente mayor para mejor proporción
    height: 36,              // Altura más compacta
    position: "relative",
  },
  track: {
    ...StyleSheet.absoluteFillObject, // Equivalente a position: absolute + top/left/right/bottom: 0
    backgroundColor: colors.track,
    borderRadius: 18,        // Redondeo más sutil
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,   // Espaciado interno equilibrado
    alignItems: "center",
    borderWidth: 1,          // Borde sutil
    borderColor: colors.border,
  },
  iconContainer: {
    width: 20,               // Iconos más compactos
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,               // Asegura que los iconos estén sobre el thumb
  },
  thumb: {
    position: "absolute",
    width: 52,               // Ancho proporcional al nuevo diseño
    height: 32,              // Altura más delgada
    borderRadius: 16,
    backgroundColor: colors.thumb,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,     // Sombra más sutil
    shadowRadius: 2,
    elevation: 1,            // Elevación mínima
    borderWidth: 1,          // Borde sutil
    borderColor: colors.border,
  },
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,   // Espaciado consistente
    alignItems: "center",
  },
  label: {
    fontSize: 11,            // Texto más pequeño y elegante
    fontWeight: "500",       // Peso medio para mejor legibilidad
    letterSpacing: 0.2,      // Espaciado entre letras sutil
  },
  activeLabel: {
    color: colors.activeText,
  },
  inactiveLabel: {
    color: colors.inactiveText, // Usamos color visible pero discreto
  },
});

export default ModeToggleStyles;