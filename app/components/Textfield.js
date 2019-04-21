import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

class Textfield extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styleAku.kepung}>
        <Text>{this.props.label} : </Text>
        <TextInput name={this.props.name} style={styleAku.kotak} />
      </View>
    );
  }
};

export default Textfield;

const styleAku = StyleSheet.create({
  kepung: {
    marginTop: 5,
    paddingTop: 0,
  },
  kotak: {
    borderWidth: 1,
  }
});
