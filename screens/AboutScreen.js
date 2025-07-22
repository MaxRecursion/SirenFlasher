import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Ambulance Siren App</Text>
        <Text style={styles.version}>Version 1.0.0 by Maxrecursion</Text>
        
        <Text style={styles.sectionTitle}>Purpose</Text>
        <Text style={styles.bodyText}>
          Ambulance Siren App turns your device into a lifelike ambulance warning system, complete with authentic Indian red-and-white flashing lights and a looping siren sound.
        </Text>
        
        <Text style={styles.sectionTitle}>Designed For:</Text>
        
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <View style={styles.bulletText}>
            <Text style={styles.bulletTitle}>Safety drills & training:</Text>
            <Text style={styles.bulletDescription}>Simulate emergency scenarios for first responders, schools, and public events.</Text>
          </View>
        </View>
        
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <View style={styles.bulletText}>
            <Text style={styles.bulletTitle}>Awareness demonstrations:</Text>
            <Text style={styles.bulletDescription}>Illustrate the importance of yielding to emergency vehicles.</Text>
          </View>
        </View>
        
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <View style={styles.bulletText}>
            <Text style={styles.bulletTitle}>Fun & novelty:</Text>
            <Text style={styles.bulletDescription}>Add dramatic effect to parties, performances, or pranks.</Text>
          </View>
        </View>
        
        <Text style={styles.bodyText}>
          With a simple Play/Pause control and streamlined design, the app delivers a realistic, immersive experience while respecting user privacy—no data collection, just pure, powerful siren simulation.
        </Text>
        
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.bodyText}>
          • Authentic Indian ambulance siren sound{'\n'}
          • Red and white flashing light animation{'\n'}
          • Simple Play/Pause controls{'\n'}
          • No data collection or tracking{'\n'}
          • Offline functionality{'\n'}
          • Optimized for performance
        </Text>
        
        <Text style={styles.sectionTitle}>Disclaimer</Text>
        <Text style={styles.disclaimerText}>
          This app is for simulation and entertainment purposes only. Do not use this app to impersonate emergency vehicles or services. Users are responsible for complying with local laws and regulations regarding emergency vehicle sounds and signals.
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Maxrecursion</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    paddingVertical: 5,
  },
  backButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 25,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingRight: 10,
  },
  bullet: {
    fontSize: 16,
    color: '#FF0000',
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
  },
  bulletTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  bulletDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    fontStyle: 'italic',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});
