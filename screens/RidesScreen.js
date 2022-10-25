import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

export default function RidesScreen() {
  // const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const user = useSelector((state) => state.user.value);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>En courses</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.form}>
            <Switch
              trackColor={{ false: '#767577', true: '#FFA62B' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.label}>Sélection automatique</Text>
          </View>
          <FontAwesome name="cog" color="#FFA62B" size={24} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28272A',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  settingsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 24,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
});
