import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  Animated, 
  TouchableOpacity 
} from 'react-native';

const alumniList = [
  { name: "Ananya Sharma", batch: "CSE 2019", role: "Software Engineer, Google" },
  { name: "Rohan Menon", batch: "ECE 2020", role: "Hardware Engineer, Intel" },
  { name: "Priya Nair", batch: "EEE 2018", role: "Project Manager, Microsoft" },
  { name: "Karthik Iyer", batch: "ME 2017", role: "Design Engineer, Tesla" },
  { name: "Sneha Rao", batch: "IT 2021", role: "Data Scientist, Amazon" },
  { name: "Aditya Verma", batch: "CSE 2020", role: "AI Engineer, OpenAI" },
  { name: "Neha Thomas", batch: "CIVIL 2019", role: "Structural Engineer, L&T" },
  { name: "Rahul Krishnan", batch: "CSE 2018", role: "Full Stack Developer, Meta" },
  { name: "Divya Menon", batch: "ECE 2019", role: "Product Manager, Apple" },
  { name: "Vikram Singh", batch: "ME 2018", role: "Aerospace Engineer, ISRO" },
];

function AlumniCard({ item, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(15)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // staggered fade-in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 1.05, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <TouchableOpacity activeOpacity={1} onPressIn={onPressIn} onPressOut={onPressOut}>
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

  const titleAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.timing(titleAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFilteredAlumni(
      q ? alumniList.filter(alum => alum.name.toLowerCase().startsWith(q)) : alumniList
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
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
        <FlatList
          data={filteredAlumni}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <AlumniCard item={item} index={index} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  searchBox: { padding: 10, borderWidth: 2, borderColor: '#ccc', borderRadius: 8, fontSize: 16, marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 2, height: 2 }, shadowRadius: 8, elevation: 3 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  info: { fontSize: 16, color: '#555' },
  bold: { fontWeight: 'bold' },
  noResult: { textAlign: 'center', fontSize: 18, color: 'gray', marginTop: 20 },
});