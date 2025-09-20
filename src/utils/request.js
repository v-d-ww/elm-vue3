import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = '/api/elm/user/'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const useStore = useUserStore()
    if (useStore.token) {
      const t = useStore.token
      // 保留原来的，兼容其他接口
      config.headers.Authorization = t.startsWith('Bearer ') ? t : `Bearer ${t}`
      config.headers.token = t
      // 关键：按后端常量名发送
      config.headers.TOKEN_WEB = t
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    const ct = res.headers?.['content-type'] || ''
    const isJson = ct.includes('application/json')
    const hasCode = res.data && typeof res.data === 'object' && 'code' in res.data

    // 兼容后端两种成功规范：code===0 或 code===200 或 status==='success'
    const bizOk =
      (hasCode && (res.data.code === 0 || res.data.code === 200)) ||
      (typeof res.data?.status === 'string' && res.data.status.toLowerCase() === 'success')

    if ((isJson && hasCode && bizOk) || (!hasCode && res.status === 200)) {
      return res
    }

    ElMessage.error(res.data?.message || res.data?.info || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    if (err.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error(err.response?.data?.message || err.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
