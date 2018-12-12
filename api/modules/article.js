// 文章列表
import axios from '../axios'

export  function articleList (params) {
  return axios.get('/article/articlePage', { params })
  .then((res) => res.data)
  .catch((e) => console.error(e))
}

export  function articleDetail (params) {
  return axios.get('/article/articleDetail', { params })
  .then((res) => res.data)
  .catch((e) => console.error(e))
}