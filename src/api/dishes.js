import request from '@/utils/request'

// 搜索菜品
export const getBusinessFuzzy = ( businessFuzzy ) => {
  return request.get('BusinessController/selectBusinessFuzzy', { params: businessFuzzy } )
}

// 获取菜品
export const getBusinessList = ( order ) => {
  return request.get('BusinessController/listBusiness', { params: order } )
}
// 获取美食菜品
export const getBusinessList1 = ( orderTypeId ) => {
  return request.post('BusinessController/listBusinessByOrderTypeId', { orderTypeId: orderTypeId })
}

// 获取购物车菜品
export const getCartList = (businessId) => {
  return request.post('CartController/listCart', {businessId: businessId})
}

//更新购物车菜品从0到1
export const saveCart = (businessId,foodId) => {
  return request.post('CartController/saveCart',{
    businessId: businessId,
    foodId: foodId
})
}
// 更新购物陈菜品从1到更多
export const updateCart = (businessId,foodId,quantity) => {
  return request.post('CartController/updateCart',{
        businessId: businessId,
        foodId: foodId,
        quantity:quantity
  })
}
// 删除购物车菜品
export const removeCart = (businessId,foodId) => {
  return request.post('CartController/removeCart',{
    businessId: businessId,
    foodId: foodId
})
}

// 获取商家详情
export const getBusinessById = (businessId) => {
  return request.post('BusinessController/getBusinessById', {businessId: businessId}) 
}
// 获取食品信息
export const listFoodByBusinessId = (businessId) => {
  return request.post('FoodController/listFoodByBusinessId', { businessId: businessId })
}


// 注册接口
export const userRegisterService=({email,nickName,password,checkCodeKey,checkCode})=>{
  return request.post('register', null, {
    params: { email,nickName, password, checkCodeKey, checkCode }
  })

}
// 登录接口
export const userLoginService=({email,password,checkCodeKey,checkCode})=>{
  return request.post('login', null, {
    params: { email, password, checkCodeKey, checkCode }
  })

}
