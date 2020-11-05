import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-52c1d.firebaseio.com/'
});

export default instance;