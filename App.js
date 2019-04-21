import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import Textfield from './app/components/Textfield';

class App extends Component {

  constructor(props) {
    super(props);
    this.terimaAku = this.terimaAku.bind(this);
  }

  state = {
    perkiraan: {
      num1: 0,
      num2: 0,
      total: 0
    },
  };

  terimaAku = (val, name) => {

    this.setState(function(prevState) {
      return {
        ...prevState,
        perkiraan: {
          ...prevState.perkiraan,
          [name]: val,
        }
      }
    });

    this.setState(function(prevState) {
      return {
        ...prevState,
        perkiraan: {
          ...prevState.perkiraan,
          total: parseInt(prevState.perkiraan.num1)
          + parseInt(prevState.perkiraan.num2)
        }
      }
    });

  };

  render() {
    return (
      <View style={{padding: 50}}>

        <Textfield label="Number 1" name="num1" />
        <Textfield label="Number 2" name="num2" />

        <View style={styleAku.kepung}>
          <Button title="Kira Aku" onPress={this.panggilAku} />
        </View>
        <Text>Total = {this.state.perkiraan.total}</Text>

      </View>
    );
  };
};

const styleAku = StyleSheet.create({
  kepung: {
    marginTop: 5,
    paddingTop: 0,
  },
});

export default App;
