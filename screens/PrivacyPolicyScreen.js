import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export default function PrivacyPolicyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last updated: July 23, 2025</Text>
        
        <Text style={styles.sectionTitle}>Our Commitment to Privacy</Text>
        <Text style={styles.bodyText}>
          Maxrecursion ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how the Ambulance Siren App handles your information.
        </Text>
        
        <Text style={styles.sectionTitle}>Information We Do NOT Collect</Text>
        <Text style={styles.bodyText}>
          The Ambulance Siren App is designed with privacy in mind. We do NOT collect, store, or transmit any personal information, including:
        </Text>
        
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Personal identification information</Text>
          <Text style={styles.bulletItem}>• Device identifiers or location data</Text>
          <Text style={styles.bulletItem}>• Usage analytics or behavior tracking</Text>
          <Text style={styles.bulletItem}>• Audio recordings or microphone access</Text>
          <Text style={styles.bulletItem}>• Contact lists or photo access</Text>
          <Text style={styles.bulletItem}>• Network activity or browsing data</Text>
        </View>
        
        <Text style={styles.sectionTitle}>How the App Works</Text>
        <Text style={styles.bodyText}>
          The Ambulance Siren App operates entirely offline on your device. All features including:
        </Text>
        
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Visual siren light animations</Text>
          <Text style={styles.bulletItem}>• Audio siren sound playback</Text>
          <Text style={styles.bulletItem}>• Play/pause controls</Text>
        </View>
        
        <Text style={styles.bodyText}>
          These functions run locally without requiring internet connectivity or data transmission.
        </Text>
        
        <Text style={styles.sectionTitle}>Permissions</Text>
        <Text style={styles.bodyText}>
          The app requires minimal permissions to function:
        </Text>
        
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Audio playback: To play siren sounds through your device speakers</Text>
        </View>
        
        <Text style={styles.bodyText}>
          No other permissions are requested or required.
        </Text>
        
        <Text style={styles.sectionTitle}>Third-Party Services</Text>
        <Text style={styles.bodyText}>
          This app does not integrate with any third-party analytics, advertising, or data collection services. No data is shared with external parties.
        </Text>
        
        <Text style={styles.sectionTitle}>Data Security</Text>
        <Text style={styles.bodyText}>
          Since we don't collect any personal data, there is no personal information at risk. All app functionality occurs locally on your device.
        </Text>
        
        <Text style={styles.sectionTitle}>Children's Privacy</Text>
        <Text style={styles.bodyText}>
          Our app is safe for users of all ages as we do not collect any personal information from anyone, including children under 13.
        </Text>
        
        <Text style={styles.sectionTitle}>Changes to This Privacy Policy</Text>
        <Text style={styles.bodyText}>
          We may update this Privacy Policy from time to time. Any changes will be reflected in the app update and the "Last updated" date above.
        </Text>
        
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.bodyText}>
          If you have any questions about this Privacy Policy or our privacy practices, please contact us through the app store listing.
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Maxrecursion</Text>
          <Text style={styles.footerText}>Ambulance Siren App v1.0.0</Text>
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
  lastUpdated: {
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
  bulletList: {
    marginLeft: 10,
    marginBottom: 15,
  },
  bulletItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 5,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
});
