import { StyleSheet } from "react-native";

// Luxury color palette
const colors = {
  overlay: "rgba(15, 23, 42, 0.7)",  // Deep blue overlay
  surface: "#ffffff",                 // Pure white surface
  primary: "#0f172a",                 // Deep navy
  secondary: "#64748b",               // Soft slate
  success: "#047857",                 // Deep emerald (more luxurious than bright green)
  error: "#b91c1c",                   // Deep ruby red
  border: "#e2e8f0",                  // Subtle border
  subtleText: "#94a3b8",              // Muted text
  highlight: "#f1f5f9"                // Highlight background
};

const ConnectionModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "78%",                   // Slightly narrower for elegance
    backgroundColor: colors.surface,
    borderRadius: 12,               // Smoother corners
    padding: 24,                    // Generous padding
    elevation: 0,                   // No shadow - we'll use border
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",           // Better vertical alignment
    marginBottom: 16,               // More breathing room
    paddingBottom: 12,              // Subtle separation
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  title: {
    fontSize: 17,                   // Slightly larger
    fontWeight: "500",              // Medium weight for elegance
    color: colors.primary,
    letterSpacing: 0.3,             // Improved readability
  },
  closeButton: {
    padding: 4,
    borderRadius: 12,               // Circular touch area
    backgroundColor: colors.highlight,
  },
  form: {
    marginBottom: 24,               // More spacing
  },
  label: {
    fontSize: 14,                  // Slightly larger
    color: colors.primary,
    marginBottom: 8,
    fontWeight: "500",             // Medium weight
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,            // More comfortable touch area
    fontSize: 15,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,                  // More spacing
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 14,                   // Slightly larger
    color: colors.secondary,
    fontWeight: "500",
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.highlight,
  },
  connectButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.success,          // Using our success color
  },
  connectedContainer: {
    paddingVertical: 20,            // More vertical space
    alignItems: "center",
  },
  connectedText: {
    fontSize: 16,                  // Slightly larger
    color: colors.success,
    textAlign: "center",
    marginBottom: 16,               // More spacing
    fontWeight: "500",
  },
  disconnectButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.highlight,
  },
  disconnectButtonText: {
    fontSize: 14,
    color: colors.error,
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",           // Better alignment
    marginBottom: 16,
    paddingVertical: 8,
  },
  toggleContainer: {
    marginVertical: 16,             // More spacing
    alignItems: "center",
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 8,                   // More spacing
    textAlign: "center",
  },
  helperText: {
    color: colors.subtleText,
    fontSize: 12,
    marginTop: 8,                   // Consistent spacing
    fontStyle: "italic",            // Subtle differentiation
  },
});

export default ConnectionModalStyles;