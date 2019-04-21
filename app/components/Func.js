
const kira = (num1, num2) => {
  return parseInt(num1) + parseInt(num2);
};

const darab = (num1, num2) => {
  return parseInt(num1) * parseInt(num2);
};

const tarikData = (name, data, type) => {
  const BASE_URL = 'https://kelasreactnative.firebaseio.com/';
  if(type == 'POST') {
    fetch(BASE_URL + name + '.json', {
      body: JSON.stringify(data)
    })
    .done(res => res.json())
    .done(res => {
      alert(res);
    })
    .catch(err => {
      alert(err);
    });
  }
};

export {
  kira,
  darab,
  tarikData
};
