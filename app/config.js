
const Config = {
  api: process.env.API_URL ? process.env.API_URL : 'http://localhost:5000',
};

console.log(`API_URL=${process.env.API_URL}`);

export default Config;
