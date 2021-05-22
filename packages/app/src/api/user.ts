import request from '../utils/request';

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data,
//   });
// }

export function getInfo() {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
  });
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'GET',
  });
}
