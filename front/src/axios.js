import axios from 'axios';
import { toast } from 'react-toastify';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

Api.interceptors.response.use((res) => {
  return traitResponse(res.data)
}, (error) => {
  traitResponse(error.response.data)
})

const traitResponse = ({ data, response }) => {
  if (!response || typeof (response.code) === 'undefined' || typeof (data) == 'undefined') {
    toast.error('Ocorreu um erro ao conectar ao servidor.')
    return false
  }

  if (response.code !== 0) {
    if (typeof (response.msg) == 'object') {
      for (let i in response.msg) {
        toast.error(response.msg[i])
      }
    } else {
      toast.error(response.msg ?? 'Erro desconhecido')
    }
  }

  switch (response.code) {
    case 1:
      return false
    case 2:
      window.navigate(-1)
      return false
    case 3:
      document.location.href = '/account/login'
      return false
    case 4:
      window.location.href = '/'
      return data;
    default:
      return data
  }
}

export default Api;
