import { StyleSheet } from 'react-native';

// Paleta de colores elegantes (beige/marrón)
const colors = {
  background: "#f5f5f0",       // Beige claro
  primary: "#3e2723",          // Marrón oscuro elegante
  accent: "#5d4037",           // Marrón medio
  cardBackground: "#efebe9",   // Beige claro para tarjetas
  textPrimary: "#3e2723",      // Texto marrón oscuro
  textSecondary: "#5d4037",    // Texto marrón medio
  textLight: "#d7ccc8",        // Texto claro
  highlight: "#8d6e63",        // Marrón para resaltes
  border: "#a1887f",           // Borde marrón
  skillBackground: "#d7ccc8",  // Fondo para barras de habilidad
  skillFill: "#6d4c41",        // Relleno de barras de habilidad
};

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.accent,
    letterSpacing: 0.3,
  },
  memberCard: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: colors.highlight,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    marginRight: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  memberRole: {
    color: colors.highlight,
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '400',
  },
  skillBar: {
    height: 4,
    backgroundColor: colors.skillBackground,
    borderRadius: 2,
    overflow: 'hidden',
  },
  skillFill: {
    height: '100%',
    backgroundColor: colors.skillFill,
    borderRadius: 2,
  },
  teacherCard: {
    backgroundColor: colors.cardBackground,
    padding: 24,
    borderRadius: 12,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  teacherTitle: {
    color: colors.accent,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  teacherName: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  teacherRole: {
    color: colors.highlight,
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});