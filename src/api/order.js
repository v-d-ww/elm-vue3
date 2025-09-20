import request from '@/utils/request'

// 新增用户订单
export const saveDeliveryAddress=(businessId,daId,totalPrice)=>{
  return request.post('OrdersController/createOrders',{
    businessId: businessId,
    daId: daId,
    orderTotal: totalPrice
  })
}

// 获取用户订单
export const getOrdersById=(orderId)=>{
  return request.post('OrdersController/getOrdersById', {
    orderId: orderId
  })
}

// 获取全部订单
export const listOrdersByUserId=()=>{
  return request.post('OrdersController/listOrdersByUserId')
}


// 添加文章分类
export const artAddChannelService=(data)=>{
  return request.post('/my/cate/add',data)
}
// 编辑文章分类
export const artEditChannelService = (data)=>{
  return request.put('/my/cate/info',data)
}
// 删除文章分类
export const artDelChannelService = (id)=>{
  return request.delete('/my/cate/del',{
    params:{id}
  })
}
// 获取文章列表
export const artGetListService=(params)=>{
   return request.get('/my/article/list',{
    params
  })
}

// 添加文章
// data需要是一个formData格式的对象
export const artPublishService = (data)=>request.post('/my/article/add',data)

// 获取文章详情
export const artGetDetailService = (id) => request.get('my/article/info',{
  params:{id}
}) 
// 标记文章
export const artEditService = (data)=>request.put('/my/article/info',data)

// 删除文章
export const artDelService = (id) =>
  request.delete('/my/article/info', { params: { id } })


