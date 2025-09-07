import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  Animated, 
  TouchableOpacity, 
  Image, 
  Linking, 
  Pressable 
} from 'react-native';

const alumniList = [
  { name: "Ananya Sharma", batch: "CSE 2019", role: "Software Engineer, Google", college: "ABC College", img: "https://via.placeholder.com/150/FFB6C1", linkedin: "https://www.linkedin.com" },
  { name: "Rohan Menon", batch: "ECE 2020", role: "Hardware Engineer, Intel", college: "XYZ Institute", img: "https://via.placeholder.com/150/87CEFA", linkedin: "https://www.linkedin.com" },
  { name: "Priya Nair", batch: "EEE 2018", role: "Project Manager, Microsoft", college: "LMN University", img: "https://via.placeholder.com/150/FF69B4", linkedin: "https://www.linkedin.com" },
  { name: "Karthik Iyer", batch: "ME 2017", role: "Design Engineer, Tesla", college: "PQR College", img: "https://via.placeholder.com/150/BA55D3", linkedin: "https://www.linkedin.com" },
  { name: "Sneha Rao", batch: "IT 2021", role: "Data Scientist, Amazon", college: "STU Institute", img: "https://via.placeholder.com/150/FFD700", linkedin: "https://www.linkedin.com" },
  { name: "Aditya Verma", batch: "CSE 2020", role: "AI Engineer, OpenAI", college: "VWX University", img: "https://via.placeholder.com/150/FFB6C1", linkedin: "https://www.linkedin.com" },
  { name: "Neha Thomas", batch: "CIVIL 2019", role: "Structural Engineer, L&T", college: "YZA College", img: "https://via.placeholder.com/150/87CEFA", linkedin: "https://www.linkedin.com" },
  { name: "Rahul Krishnan", batch: "CSE 2018", role: "Full Stack Developer, Meta", college: "BCD Institute", img: "https://via.placeholder.com/150/FF69B4", linkedin: "https://www.linkedin.com" },
  { name: "Divya Menon", batch: "ECE 2019", role: "Product Manager, Apple", college: "EFG University", img: "https://via.placeholder.com/150/BA55D3", linkedin: "https://www.linkedin.com" },
  { name: "Vikram Singh", batch: "ME 2018", role: "Aerospace Engineer, ISRO", college: "HIJ College", img: "https://via.placeholder.com/150/FFD700", linkedin: "https://www.linkedin.com" },
];

function AlumniCard({ item, index, onPress }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(15)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay: index * 100, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 600, delay: index * 100, useNativeDriver: true }),
    ]).start();
  }, []);

  const onPressIn = () => Animated.spring(scaleAnim, { toValue: 1.05, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(item)} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View 
        style={[
          styles.card, 
          { opacity: fadeAnim, transform: [{ translateY }, { scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}><Text style={styles.bold}>Batch:</Text> {item.batch}</Text>
        <Text style={styles.info}><Text style={styles.bold}>Role:</Text> {item.role}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState(alumniList);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const titleAnim = useRef(new Animated.Value(-50)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.timing(titleAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFilteredAlumni(
      q ? alumniList.filter(alum => alum.name.toLowerCase().startsWith(q)) : alumniList
    );
  }, [searchQuery]);

  useEffect(() => {
    if (selectedAlumni) {
      Animated.parallel([
        Animated.timing(modalOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(modalScale, { toValue: 1, useNativeDriver: true })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(modalScale, { toValue: 0.8, duration: 200, useNativeDriver: true })
      ]).start();
    }
  }, [selectedAlumni]);

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 150, 300],
    outputRange: ['#FFFACD', '#FFD1DC', '#DDA0DD'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.Text style={[styles.title, { transform: [{ translateY: titleAnim }] }]}>
        Alumni Directory
      </Animated.Text>

      <TextInput
        style={styles.searchBox}
        placeholder="🔍 Search alumni by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredAlumni.length === 0 ? (
        <Text style={styles.noResult}>No alumni found starting with that input.</Text>
      ) : (
        <Animated.FlatList
          data={filteredAlumni}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <AlumniCard item={item} index={index} onPress={setSelectedAlumni} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      )}

      {selectedAlumni && (
        <Animated.View style={[styles.modal, { opacity: modalOpacity }]}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: modalScale }] }]}>
            <Pressable style={styles.closeBtn} onPress={() => setSelectedAlumni(null)}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>X</Text>
            </Pressable>
            <Image source={{ uri: selectedAlumni.img }} style={styles.profileImg} />
            <Text style={styles.modalName}>{selectedAlumni.name}</Text>
            <Text style={styles.modalInfo}><Text style={styles.bold}>College:</Text> {selectedAlumni.college}</Text>
            <Text style={styles.modalInfo}><Text style={styles.bold}>Batch:</Text> {selectedAlumni.batch}</Text>
            <Text style={styles.modalInfo}><Text style={styles.bold}>Role:</Text> {selectedAlumni.role}</Text>
            <Text style={styles.link} onPress={() => Linking.openURL(selectedAlumni.linkedin)}>LinkedIn Profile</Text>
          </Animated.View>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  searchBox: { padding: 10, borderWidth: 2, borderColor: '#ccc', borderRadius: 8, fontSize: 16, marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 2, height: 2 }, shadowRadius: 8, elevation: 3 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  info: { fontSize: 16, color: '#555' },
  bold: { fontWeight: 'bold' },
  noResult: { textAlign: 'center', fontSize: 18, color: 'gray', marginTop: 20 },

  modal: { 
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' 
  },
  modalContent: { 
    width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 15, alignItems: 'center' 
  },
  closeBtn: { position: 'absolute', top: 10, right: 10 },
  profileImg: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  modalName: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  modalInfo: { fontSize: 16, marginBottom: 5 },
  link: { fontSize: 16, color: '#0077B5', textDecorationLine: 'underline', marginTop: 10 }
});
