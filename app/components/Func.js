
const kira = (num1, num2) => {
  return parseInt(num1) + parseInt(num2);
};

const darab = (num1, num2) => {
  return parseInt(num1) * parseInt(num2);
};

const tarikData = (name, data, type) => {
  const BASE_URL = 'https://kelasreactnative.firebaseio.com/';

  // add data
  if(type == 'POST') {
    fetch(BASE_URL + name + '.json', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      alert('Add success');
    })
    .catch(err => {
      alert('Add error: '+err);
    });
  }

  // get all data
  if(type == 'GET') {
    fetch(BASE_URL + name + '.json')
    .then(res => res.json())
    .then(res => {
      alert(JSON.stringify(Object.entries(res)));
    })
    .catch(err => {
      alert('Add error: '+err);
    });
  }
};

export {
  kira,
  darab,
  tarikData
};
