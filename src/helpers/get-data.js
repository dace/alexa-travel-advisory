const fetch = require('node-fetch');

const getData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        res.status === 200 ? resolve(res.text()) : reject(res.status);
      });
  });
};

module.exports = { getData };
