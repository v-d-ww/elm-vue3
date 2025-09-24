<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>确认订单</p>
        </header>
        <!-- 订单信息部分 -->
        <div class="order-info">
            <h5>订单配送至:</h5>
            <div class="order-info-address" @click="toUserAddress">
                <p>{{ deliveryaddress ? deliveryaddress.address : '请选择送货地址' }}</p>
            </div>
            <p v-if="deliveryaddress">{{ deliveryaddress.contactName }}{{  sexFilter(deliveryaddress.contactSex) }}</p>
        </div>
        <div class="order-container">
            <h3>{{ business.businessName }}</h3>
            <!-- 订单明细部分 -->
            <ul class="order-detailed">
                <li v-for="item in cartArr" :key="item.id">
                    <div class="order-detailed-left">
                        <img :src="item.food.foodImg">
                        <p>{{ item.food.foodName }} x {{ item.quantity }}</p>
                    </div>
                    <p>&#165;{{ item.food.foodPrice * item.quantity }}</p>
                </li>
            </ul>
            <div class="order-deliveryfee">
                <p>配送费</p>
                <p>&#165;{{ business.deliveryPrice }}</p>
            </div>
        </div>
        <!-- 合计部分 -->
        <div class="total">
            <div class="total-left">
                &#165;{{ totalSettle }}
            </div>
            <div class="total-right" @click="toPayment">
                去支付
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router'
import { ref,computed,onMounted } from 'vue'
import { saveDeliveryAddress } from '@/api/order'
import { getCartList,getBusinessById } from '@/api/dishes'
import { ElMessage } from 'element-plus'
import { getDeliveryAddressById } from '@/api/user'

const router = useRouter()
const route = useRoute()
const cartArr = ref([])
const business = ref({})
const deliveryaddress = ref(null)
const businessId = route.query.businessId
const daId = route.query.daId
// const daId = '1'
// const businessId = '1001'
const toUserAddress = () => {
    router.push({ path: '/userAddress', query: { businessId: businessId,isChoose:true } });
}

const toPayment = async () => {
    if(!daId){
        ElMessage.warning('请选择送货地址')
        return
    }
    // 创建订单
    const res = await saveDeliveryAddress(businessId,daId,totalSettle.value)
    
    if(res.data.code === 200){
        const orderId = res.data.data
        ElMessage.success('创建订单成功')
        router.push({ path: '/payment', query: { orderId: orderId } })
       
    }
            
}
const sexFilter = (value) => {
    return value == 1 ? '先生' : '女士';
}
const totalPrice = computed(()=>{
    return cartArr.value.reduce((total, item) => total + (item.food.foodPrice * item.quantity), 0)
})
const totalSettle = computed(()=>{
    return totalPrice.value + business.value.deliveryPrice
})
onMounted(async()=>{
    const res = await getCartList(businessId)
    const res2 = await getBusinessById(businessId)
    cartArr.value = res.data.data
   
    business.value = res2.data.data
    if (daId) {
            const res1 = await getDeliveryAddressById(daId)
            deliveryaddress.value = res1.data.data
        } else {
            deliveryaddress.value = null
        }
})
// cartArr.value =[ {
//       id: 1,
//       food: {
//         foodId: 1001,
//         foodName: "宫保鸡丁",
//         foodPrice: 28.00,
//         foodImg: "https://example.com/images/gongbaojiding.jpg",
//         foodDescription: "经典川菜，鸡肉嫩滑，花生香脆"
//       },
//       quantity: 2,
//       businessId: "1001"
//     },
//     {
//       id: 2,
//       food: {
//         foodId: 1002,
//         foodName: "麻婆豆腐",
//         foodPrice: 18.00,
//         foodImg: "https://example.com/images/mapodoufu.jpg",
//         foodDescription: "麻辣鲜香，豆腐嫩滑"
//       },
//       quantity: 1,
//       businessId: "1001"
//     },]
// deliveryaddress.value = {
//     daId: "1",
//     contactName: "张三",
//     contactSex: 1,  // 1-男，0-女
//     contactTel: "13800138000",
//     address: "北京市朝阳区建国路88号SOHO现代城A座1205室",
//     userId: "10001",
//     createTime: "2024-01-15 10:30:00",
//     updateTime: "2024-01-15 10:30:00"
//   }
// business.value = {
//     businessId: "1001",
//     businessName: "川味小厨",
//     businessAddress: "北京市朝阳区三里屯街道工体北路8号",
//     businessExplain: "正宗川菜，麻辣鲜香",
//     businessImg: "https://example.com/images/chuancai.jpg",
//     orderTypeId: 1,
//     starPrice: 20.00,  // 起送价
//     deliveryPrice: 5.00,  // 配送费
//     remarks: "营业时间：10:00-22:00",
//     businessPhone: "010-12345678",
//     businessStatus: 1,  // 1-营业中，0-休息中
//     businessHours: "10:00-22:00",
//     createTime: "2024-01-01 00:00:00",
//     updateTime: "2024-01-15 15:30:00"
//   }

</script>

<style scoped>
/****************** 总容器 */
.wrapper {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}

/****************** header 部分 ******************/
.wrapper header {
    width: 100%;
    height: 12vw;
    background: #179eec !important;
    /* border-bottom: 1px solid #e4e7ed !important; */
    color: #fff;
    font-size: 4.8vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

/****************** 订单信息部分 ******************/
.wrapper .order-info {
    /*注意这里,不设置高,靠内容撑开｡因为地址有可能折行*/
    width: 100%;
    margin-top: 12vw;
    background: linear-gradient(to bottom, #179eec, #d6e8fa);;
    box-sizing: border-box;
    padding: 10vw 2vw;
    color: #fff;
    min-height: 50vw ;
}

.wrapper .order-info h5 {
    font-size: 3vw;
    font-weight: 300;
}

.wrapper .order-info .order-info-address {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    user-select: none;
    cursor: pointer;
    margin: 1vw 0;
}

.wrapper .order-info .order-info-address p {
    width: 90%;
    font-size: 5vw;
}

.wrapper .order-info .order-info-address i {
    font-size: 6vw;
}

.wrapper .order-info p {
    font-size: 3vw;
}

.wrapper h3 {
    box-sizing: border-box;
    padding: 3vw;
    font-size: 4vw;
    color: #666;
    border-bottom: solid 1px #DDD;
}

/****************** 订单明细部分 ******************/
.wrapper .order-detailed {
    width: 100%;
}

.wrapper .order-detailed li {
    width: 100%;
    height: 16vw;
    box-sizing: border-box;
    padding: 3vw;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrapper .order-detailed li .order-detailed-left {
    display: flex;
    align-items: center;
}

.wrapper .order-detailed li .order-detailed-left img {
    width: 10vw;
    height: 10vw;
}

.wrapper .order-detailed li .order-detailed-left p {
    font-size: 3.5vw;
    margin-left: 3vw;
}

.wrapper .order-detailed li p {
    font-size: 3.5vw;
}

.wrapper .order-deliveryfee {
    width: 100%;
    height: 16vw;
    box-sizing: border-box;
    padding: 3vw;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3.5vw;
}
.order-container{
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 20px 20px 0 0 ;
    transform: translateY(-5vh);
}

/****************** 订单合计部分 */
.wrapper .total {
    width: 100%;
    height: 14vw;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
}

.wrapper .total .total-left {
    flex: 2;
    background-color: #fff;
    color: #000;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper .total .total-right {
    flex: 1;
    background-color: #47ade8;
    color: #fff;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>