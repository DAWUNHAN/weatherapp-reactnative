import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Weather from './Weather';

const API_KEY = '90fcd607e36770864b3afdb54495e849';

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null,
  };
  componentDidMount () {
    navigator.geolocation.getCurrentPosition (position => {
      this._getWeather (position.coords.latitude, position.coords.longitude);
    });
  }
  _getWeather = (lat, long) => {
    fetch (
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`
    )
      .then (response => response.json ())
      .then (json => {
        this.setState ({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true,
        });
      });
  };
  render () {
    const {isLoaded, temperature, name} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded
          ? <Weather
              weatherName={name}
              temp={Math.floor (temperature - 273.15)}
            />
          : <View style={styles.loading}>
              <Text style={styles.loadingText}>Getting the weather</Text>
            </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24,
  },
});
