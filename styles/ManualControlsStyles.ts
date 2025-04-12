import { StyleSheet, Dimensions } from "react-native";

// Paleta de colores premium
const colors = {
  background: "#f8fafc",       // Fondo claro y limpio
  primary: "#0f172a",          // Azul oscuro elegante
  accent: "#334155",           // Gris azulado para detalles
  buttonBase: "#ffffff",       // Blanco puro para botones
  buttonAccent: "#1e293b",     // Azul oscuro para botón especial
  textPrimary: "#0f172a",      // Texto oscuro
  textLight: "#f1f5f9",        // Texto claro
  highlight: "#e2e8f0",        // Resaltado sutil
  disabled: "#cbd5e1",         // Estado desactivado
};

export const createManualControlsStyles = (isLandscape: boolean, screenWidth: number, screenHeight: number) => {
  const buttonSize = isLandscape 
    ? Math.min(screenHeight * 0.22, 90)  // Más compacto en landscape
    : Math.min(screenWidth * 0.2, 80);   // Tamaño más refinado

  const hornButtonSize = buttonSize * 0.85;  // Más proporcional

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: isLandscape ? 12 : 20,
      justifyContent: "center",
      width: "100%",
      backgroundColor: colors.background,
    },
    sliderContainer: {
      marginBottom: isLandscape ? 60 : 120,
      paddingHorizontal: 20,
      width: "100%",
    },
    sliderLabel: {
      fontSize: isLandscape ? 15 : 17,
      fontWeight: "500",
      color: colors.textPrimary,
      textAlign: "center",
      marginBottom: 8,
      letterSpacing: 0.3,
    },
    slider: {
      height: 36,  // Más delgado
      width: "100%",
    },
    sliderValue: {
      fontSize: isLandscape ? 15 : 17,
      fontWeight: "500",
      color: colors.textPrimary,
      textAlign: "center",
      marginTop: 4,
    },
    controlsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: isLandscape ? screenHeight * 0.7 : 380,
      width: "100%",
    },
    upDownContainer: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    centerColumn: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    centerTop: {
      alignItems: "center",
      width: "100%",
      position: "absolute",
      top: isLandscape ? 30 : 60,
    },
    centerBottom: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: isLandscape ? 30 : 60,
    },
    leftRightContainer: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    horizontalButtonsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    directionButton: {
      width: buttonSize,
      height: buttonSize,
      backgroundColor: colors.buttonBase,
      borderRadius: buttonSize / 2,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.highlight,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
      marginVertical: 12,
    },
    horizontalButton: {
      width: buttonSize,
      height: buttonSize,
      backgroundColor: colors.buttonBase,
      borderRadius: buttonSize / 2,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.highlight,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
      marginHorizontal: 8,
    },
    hornButton: {
      width: hornButtonSize,
      height: hornButtonSize,
      backgroundColor: colors.buttonAccent,
      borderRadius: hornButtonSize / 2,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    disabledOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    disabledText: {
      color: colors.textPrimary,
      fontSize: 15,
      fontWeight: "500",
      textAlign: "center",
      paddingHorizontal: 20,
    },
    disabledButton: {
      backgroundColor: colors.highlight,
      borderColor: colors.disabled,
    },
    disabledHornButton: {
      backgroundColor: colors.disabled,
    },
    spacer: {
      height: 16,
    },
  });
};