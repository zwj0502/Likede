import request from '@/utils/request'

/**
 * 获取验证码
 * @param {*} clientToken
 * @returns
 */
export function Loginimg(clientToken) {
  return request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
    method: 'get',
    responseType: 'blob'
  })
}

/**
 *登录
 * @param {*} data
 * @returns
 */
export function Login(data) {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data
  })
}
