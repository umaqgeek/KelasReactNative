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

  componentWillMount() {
    this.paparSemua();
  };

  paparSemua = () => {
    var self = this;
    tarikData('pesakit', 'GET', {}, function(res) {
      var pesakits = [];
      if (res) {
        for (var key in res) {
          res[key].key = key;
          pesakits.push(res[key]);
        }
      }
      self.setState(prevState => {
        return {
          ...prevState,
          data: {
            ...prevState.data,
            listPesakit: Object.assign([], pesakits),
          }
        };
      });
      // console.log(self.state.data);
    }, function(err) {
      alert('Error! '+JSON.stringify(err));
    });
  };

  klear = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          nama: '',
          ic: '',
        }
      };
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
    if (this.state.data.ic.length > 0 && this.state.data.nama.length > 0) {
      tarikData('pesakit', 'POST', {
        ic: this.state.data.ic,
        nama: this.state.data.nama,
      }, function(res) {
        alert('Success add!');
      }, function(err) {
        alert('Error! '+JSON.stringify(err));
      });
      this.klear();
    } else {
      alert('Do not leave blank!');
    }
    this.paparSemua();
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

      <View style={styles.listButang}>
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
      </View>

        <View>
          <FlatList
            data={this.state.data.listPesakit}
            renderItem={({item}) => (
              <View id={item.key} style={styles.datalist}>
                <Text>Name: {item.nama}</Text>
                <Text>I/C No.: {item.ic}</Text>
              </View>
            )}
          />
        </View>

      </ScrollView>
    );
  };
};

export default MainPage;

const styles = StyleSheet.create({
  listButang: {
    flex: 1,
    alignItems: 'center',
  },
  datalist: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 15,
    borderRadius: 10,
  },
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
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 255, 0.1)",
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
});
