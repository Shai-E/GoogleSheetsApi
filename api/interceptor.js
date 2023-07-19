import axios from 'axios';

axios.interceptors.response.use(
  async response => {
    // console.log('success: ', response.config.url, response);
    return response;
  },
  error => {
    console.error(error);
    return false;
  },
);

export default axios;
