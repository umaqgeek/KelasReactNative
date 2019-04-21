import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import {
  tarikData
} from './Func';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.terima = this.terima.bind(this);
    this.hantar = this.hantar.bind(this);
    this.klear = this.klear.bind(this);
    this.paparSemua = this.paparSemua.bind(this);
  };

  state = {
    data: {
      nama: '',
      ic: '',
      listPesakit: [],
    }
  };

  paparSemua = () => {
    var self = this;
    tarikData('pesakit', 'GET', {}, function(res) {
      console.log(res);
      var pesakits = [];
      if (res) {
        for (var key in res) {
          pesakits.push(res[key]);
        }
      }
      console.log(pesakits);
      self.setState(prevState => {
        return {
          ...prevState,
          data: {
            ...prevState.data,
            listPesakit: Object.assign([], pesakits),
          }
        };
      });
      console.log('oi!');
      // console.log(self.state.data);
    }, function(err) {
      console.log(err);
    });
  };

  klear = () => {
    this.setState({
      data: {
        nama: '',
        ic: '',
      }
    });
  };

  terima = (val, name) => {
    this.setState(prevState => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          [name]: val,
        }
      };
    });
  };

  hantar = () => {
    tarikData('pesakit', 'POST', this.state.data, function(res) {
      alert('Success add!');
    }, function(err) {
    });
    this.klear();
  };

  render() {
    return (
      <ScrollView>

        <View style={styles.kepala}>
          <Text FlatListstyle={styles.kepalaText}>Main Page</Text>
        </View>

        <TextInput
          style={styles.kotak}
          placeholder="Enter your name here"listPesakit
          onChangeText={(val) => this.terima(val, 'nama')}
          value={this.state.data.nama}
        />

        <TextInput
          style={styles.kotak}
          placeholder="Enter your IC number here"
          onChangeText={(val) => this.terima(val, 'ic')}
          value={this.state.data.ic}
        />

        <TouchableOpacity onPress={this.hantar}>
          <View style={styles.butang}>
            <Text>Submit</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.klear}>
          <View style={styles.butang}>
            <Text>Clear</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.paparSemua}>
          <View style={styles.butang}>
            <Text>View All Data</Text>
          </View>
        </TouchableOpacity>

        <View>
          <Text>{JSON.stringify(this.state.data.listPesakit)}</Text>
        </View>

        <FlatList
          data={this.state.data.listPesakit}
          renderItem={({item}) => (
            <View>
              <Text>Name: {JSON.stringify(item)}</Text>
            </View>
          )}
        />

      </ScrollView>
    );
  };
};

export default MainPage;

const styles = StyleSheet.create({
  kepalaText: {
    fontSize: 20,
    margin: 20,
  },
  kepala: {
    alignItems: 'center',
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  kotak: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 50,
    margin: 20,
    padding: 15,
  },
  butang: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 255, 0.1)",
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
});
