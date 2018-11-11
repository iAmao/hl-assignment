const isTest = String(process.env.NODE_ENV) === 'test';
console.log(isTest);
module.exports = {
  presets: [
    ['env', { modules : isTest ? 'commonjs' : false } ],
    'react-app'
  ]
};
