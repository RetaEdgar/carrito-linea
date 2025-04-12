import { StyleSheet } from "react-native";

// Paleta de colores premium
const colors = {
  background: "#ffffff",       // Blanco puro
  textPrimary: "#0f172a",      // Azul oscuro elegante
  textSecondary: "#64748b",    // Gris azulado
  highlight: "#f1f5f9",        // Resaltado sutil
  shadow: "rgba(0, 0, 0, 0.05)" // Sombra muy tenue
};

const TimerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 18,    // Mayor espaciado horizontal
    paddingVertical: 12,      // Mayor espaciado vertical
    borderRadius: 24,         // Bordes más redondeados
    borderWidth: 1,           // Borde sutil
    borderColor: colors.highlight,
    shadowColor: colors.shadow,
    shadowOffset: { 
      width: 0, 
      height: 1 
    },
    shadowOpacity: 1,         // Más consistente
    shadowRadius: 3,
    elevation: 1,             // Sombra más sutil
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: "monospace",
    fontSize: 16,             // Tamaño más elegante
    fontWeight: "500",        // Peso medio para mejor legibilidad
    color: colors.textPrimary,
    letterSpacing: 0.5,       // Espaciado entre caracteres
    marginLeft: 10,           // Espaciado consistente
  },
  timeUnit: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
    letterSpacing: 0.3,
  }
});

export default TimerStyles;