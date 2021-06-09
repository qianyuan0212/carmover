export default function ({ $axios, redirect }) {
  // $axios.defaults.baseURL = process.env.baseUrl
  $axios.defaults.baseURL = 'http://mc.bofyou.com'

  // request interceptor
  $axios.interceptors.request.use(
    (config) => {
      // do something before request is sent
      return config
    },
    (error) => {
      // do something with request error
      return Promise.reject(error)
    }
  )

  // response interceptor
  $axios.interceptors.response.use(
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
      return response.data
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // $axios.onRequest(config => {
  //   console.log('Making request to ' + config);
  // });

  $axios.onError((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // Something happened in setting up the request that triggered an Error
    }
  })
}
