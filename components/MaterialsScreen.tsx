import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text,  
  ScrollView, 
  Image, 
  Animated, 
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import { X } from 'react-native-feather';
import { MaterialItem, MATERIALS_DATA, COLORS } from '../types/materials';

const { width } = Dimensions.get('window');

interface MaterialsScreenProps {
  onClose: () => void;
}

const MaterialCard = ({ item, index }: { item: MaterialItem, index: number }) => {
  const position = useRef(new Animated.Value(index * 100)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(position, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
        delay: index * 100,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
        delay: index * 100,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: index * 100,
      })
    ]).start();
  }, []);

  const rotate = position.interpolate({
    inputRange: [-100, 0],
    outputRange: ['-10deg', '0deg'],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View 
      style={[ 
        styles.card, 
        { 
          backgroundColor: item.color + '20',
          borderLeftColor: item.color,
          transform: [{ translateY: position }, { scale }, { rotate }],
          opacity
        }
      ]}
    >
      <View style={[styles.imageWrapper, { backgroundColor: item.color + '40' }]}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.image} 
          resizeMode="contain"
          onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: item.color }]}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Animated.View>
  );
};

export const MaterialsScreen = ({ onClose }: MaterialsScreenProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, -50],
            extrapolate: 'clamp'
          })
        }],
        opacity: scrollY.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0.7],
          extrapolate: 'clamp'
        })
      }]}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose}
          accessibilityLabel="Cerrar"
        >
          <X stroke={COLORS.primary} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Materiales del Proyecto</Text>
        <Text style={styles.subtitle}>Componentes utilizados</Text>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.componentsContainer}>
          {MATERIALS_DATA.map((item, index) => (
            <MaterialCard key={item.id} item={item} index={index} />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 25,
    backgroundColor: COLORS.background,
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 255, 170, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  componentsContainer: {
    padding: 15,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: COLORS.textDark,
    fontSize: 14,
    lineHeight: 20,
  },
});