import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Dimensions, PanResponder } from 'react-native';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [showNavButtons, setShowNavButtons] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);
  const lastTap = useRef(null);
  const longPressTimer = useRef(null);
  const wasPlayingBeforeLongPress = useRef(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (animationRef.current) {
        animationRef.current.stop();
      }
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [sound]);

  const loadSound = async () => {
    try {
      // Unload existing sound first
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/siren.mp3'),
        { 
          isLooping: true,
          volume: 0.8
        }
      );
      setSound(newSound);
      return newSound;
    } catch (error) {
      console.warn('Sound file not found - running in silent mode');
      return null;
    }
  };

  const startAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ])
    );
    animationRef.current.start();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationValue.setValue(0);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    
    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      setShowNavButtons(!showNavButtons);
      lastTap.current = null; // Reset to prevent triple-tap issues
    } else {
      lastTap.current = now;
    }
  };

  const handleLongPressStart = () => {
    if (isLongPressing) return;
    
    longPressTimer.current = setTimeout(() => {
      setIsLongPressing(true);
      wasPlayingBeforeLongPress.current = isPlaying;
      
      if (isPlaying) {
        if (sound) {
          sound.pauseAsync().catch(() => {});
        }
        stopAnimation();
        setIsPlaying(false);
      }
    }, 500); // Increased delay to avoid conflicts with double-tap
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    if (isLongPressing) {
      setIsLongPressing(false);
      
      if (wasPlayingBeforeLongPress.current) {
        resumePlay();
      }
    }
  };

  const resumePlay = async () => {
    try {
      let currentSound = sound;
      
      // Always reload sound to ensure it's in proper state
      currentSound = await loadSound();
      
      if (currentSound) {
        await currentSound.playAsync();
        startAnimation();
        setIsPlaying(true);
      }
    } catch (error) {
      console.warn('Audio resume error:', error);
      // Still start animation even if audio fails
      startAnimation();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = async () => {
    if (isLongPressing) return;
    
    try {
      if (isPlaying) {
        if (sound) {
          await sound.pauseAsync();
        }
        stopAnimation();
        setIsPlaying(false);
      } else {
        let currentSound = sound;
        if (!currentSound) {
          currentSound = await loadSound();
        }
        
        if (currentSound) {
          // Check if sound is loaded before playing
          const status = await currentSound.getStatusAsync();
          if (status.isLoaded) {
            await currentSound.playAsync();
          } else {
            // Reload if not properly loaded
            currentSound = await loadSound();
            if (currentSound) {
              await currentSound.playAsync();
            }
          }
        }
        startAnimation();
        setIsPlaying(true);
      }
    } catch (error) {
      console.warn('Audio toggle error:', error);
      // Still handle animation even if audio fails
      if (!isPlaying) {
        startAnimation();
        setIsPlaying(true);
      }
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderGrant: (evt) => {
      // Handle single tap for double-tap detection
      handleDoubleTap();
      // Start long press timer
      handleLongPressStart();
    },
    onPanResponderRelease: () => {
      handleLongPressEnd();
    },
    onPanResponderTerminate: () => {
      handleLongPressEnd();
    },
  });

  const backgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FF0000'], // White to Red
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[styles.sirenOverlay, { backgroundColor }]} />
      
      {showNavButtons && (
        <View style={styles.topNavigation}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.navButtonText}>About</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Privacy')}
          >
            <Text style={styles.navButtonText}>Privacy</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.playPauseButton} 
        onPress={togglePlayPause}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
        </Text>
      </TouchableOpacity>
      
      {isLongPressing && (
        <View style={styles.longPressIndicator}>
          <Text style={styles.longPressText}>PAUSED</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  sirenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 1,
  },
  topNavigation: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 3,
  },
  navButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 50,
    left: width / 2 - 60,
    width: 120,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  longPressIndicator: {
    position: 'absolute',
    top: height / 2 - 30,
    left: width / 2 - 50,
    width: 100,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    elevation: 5,
  },
  longPressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});