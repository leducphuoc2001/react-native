import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {colors, fontSizes} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {convertDateTimeToString} from '../utilies/DateTime';
import {
  user as UseRepository,
  population as PopulationRepository,
  population,
} from '../repositories';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1.0,
  color: opacity => colors.primary,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional
};
const Profile = props => {
  const [user, setUser] = useState({});
  const [populations, setPopulations] = useState([]);
  //call when component loaded => componentDidMount
  useEffect(() => {
    UseRepository.getUserDetail().then(responseUser => setUser(responseUser));
    
    PopulationRepository.getPopulation({
      drilldowns: 'Nation',
      measures: 'Population',
    }).then(responsePopulations =>
        setPopulations(responsePopulations));
  }, []);
  // useEffect(() => {
  //   console.log(populations)
  // },[populations])
  //UseRepository.getUserDetail()
  const {
    email,
    dateOfBirth,
    gender,
    userId,
    address,
    username,
    url,
    phone,
    registeredDate,
  } = user;
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        paddingStart: 20,
      }}>
      {url != null &&<Image
        style={styles.image}
        source={{
           uri: url,
        }}
      />}
      <View style={styles.container}>
        <Text style={styles.text}>UserName: </Text>
        <Text>{username}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Email: </Text>
        <Text>{email}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>DOB: </Text>
        <Text>{convertDateTimeToString(dateOfBirth)}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Gender: </Text>
        <Text>{gender}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Address: </Text>
        <Text>{address}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Phone: </Text>
        <Text>{phone}</Text>
      </View>
      <View>
        {/* <LineChart
          data={{
            labels: populations.map(item => item.population),
            datasets: [
              {
                data:[1,4,3,4,5],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2, // optional
              },
            ],
            legend: ['Population/Year'], // optional
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        /> */}
        {populations.length!=0 && <LineChart
          data={{
            labels: populations
              .sort((a, b) => parseInt(a.year) - parseInt(b.year))
              .map(item => item.year),
            datasets: [
              {
                data: populations.map(item=> Math.floor(item.population/1000000, 0)),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2, // optional
              },
            ],
            legend: ['Population/Year'], // optional
          }}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          bezier
        />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    color:'black',
    fontSize: fontSizes.h5,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
export default Profile;
