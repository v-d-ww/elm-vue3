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

// 显示订单已提交
export const payment=(orderId)=>{
  return request.get('OrdersController/payment',{
    params:{orderId:orderId}
  })
}

//提交评价
export const addComment=( orderId , rating , commentText)=>{
  return request.post('Comment/addComment',{
    params:{
      orderId:orderId,
      rating:rating,
      commentText:commentText
    }
  })
}




