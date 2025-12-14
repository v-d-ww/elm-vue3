import request from '@/utils/request'

// 验证码
export const getCheckCode = () => {
  return request.get('UserController/getCheckCode')
}

// 注册接口
export const userRegisterService=({email,nickName,password,checkCodeKey,checkCode})=>{
  return request.post('UserController/register', null, {
    params: { email,nickName, password, checkCodeKey, checkCode }
  })

}
// 登录接口
export const userLoginService=({email,password,checkCodeKey,checkCode})=>{
  return request.post('UserController/login', null, {
    params: { email, password, checkCodeKey, checkCode }
  })
}

// 获取用户地址
export const istDeliveryAddressByUserId=(userId)=>{
  return request.post('DeliveryAddressController/listDeliveryAddressByUserId',{
    userId: userId
  })
}

// 删除用户地址
export const removeDeliveryAddress=(daId)=>{
  return request.post('DeliveryAddressController/removeDeliveryAddress',{
    daId: daId
  })
}
// 新增用户地址
export const saveDeliveryAddress=(deliveryAddress)=>{
  return request.post('DeliveryAddressController/saveDeliveryAddress',deliveryAddress
  )
}

// 获取具体的地址
export const getDeliveryAddressById=(daId)=>{
  return request.post('DeliveryAddressController/getDeliveryAddressById', 
    {
      daId:daId
    })
}

// 编辑用户地址
export const updateDeliveryAddress=(deliveryAddress)=>{
  return request.post('DeliveryAddressController/updateDeliveryAddress',deliveryAddress
  )
}

// 更新用户信息
export const updateUser=(userName,userEmail,userBrief)=>{
  return request.post('UserController/updateUser', null, {
    params: { userName,userEmail,userBrief }
  })
}
