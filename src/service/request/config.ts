//根据环境变量区分baseurl和basename
let BASE_URL = ''

const TIME_OUT = 5000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://139.155.46.86/railway/'
} else {
  BASE_URL = ''
}
export { BASE_URL, TIME_OUT }
