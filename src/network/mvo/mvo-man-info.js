import request from '@/utils/request'

export function getCompany(getCompanyVO){
  return request({
    url: 'http://localhost:9020/man/getCompany',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getCompanyVO
  })
}

export function initCompany(initCompanyVO){
  return request({
    url: 'http://localhost:9020/man/initMan',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: initCompanyVO
  })
}

export function updateCompany(CompanyInfoUpdateVO){
  return request({
    url: 'http://localhost:9020/man/updateMan',
    method: 'patch',
    data: CompanyInfoUpdateVO
  })
}
