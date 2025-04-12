import { StyleSheet } from "react-native";

// Paleta de colores premium
const colors = {
  background: "#f8fafc",       // Fondo claro y limpio
  primary: "#0f172a",          // Azul oscuro elegante
  accent: "#334155",           // Gris azulado para detalles
  buttonBase: "#ffffff",       // Blanco puro para botones
  trackBg: "#e2e8f0",          // Fondo del track más refinado
  shadow: "rgba(15, 23, 42, 0.08)", // Sombra sutil
  border: "#cbd5e1",           // Borde sutil
};

const ControlButtonStyles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    position: "relative",
    marginVertical: 8,
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.trackBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumb: {
    position: "absolute",
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.buttonBase,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    borderWidth: 1,
    borderColor: colors.border,
  },
  touchable: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  labelContainer: {
    position: "absolute",
    top: -24,
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
    letterSpacing: 0.3,
  },
  disabledTrack: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  disabledThumb: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default ControlButtonStyles;