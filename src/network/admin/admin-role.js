import request from '@/utils/request'

export function getAllRole(getAllRoleVO) {
  return request({
    url: 'http://localhost:9010/admin/roles',
    method: 'get',
  })
}

export function getPermissionMenuList(roleId) {
  return request({
    url: 'http://localhost:9010/admin/getRoleMenu',
    method: 'get',
    params: roleId
  })
}

export function addRole(addRoleVO) {
  return request({
    url: 'http://localhost:9010/admin/addNewRole',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addRoleVO
  })
}

export function deleteRole(roleId) {
  return request({
    url: 'http://localhost:9010/admin/deleteRole',
    method: 'delete',
    params: roleId
  })
}

export function getMenuWhenUpdateRole(roleId) {
  return request({
    url: 'http://localhost:9010/admin/getMenuWhenUpdateRole',
    method: 'get',
    params:roleId
  })
}

export function updateRole(updateRoleVO) {
  return request({
    url: 'http://localhost:9010/admin/updateRole',
    method: 'patch',
    data: updateRoleVO
  })
}
