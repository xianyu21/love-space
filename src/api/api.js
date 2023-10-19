import request from '@/api/request.js'


//个人信息
export const info = data => request('/api/index/getBanner', data)