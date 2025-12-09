<template>
  <div class="payment-page">
    <!-- header部分 -->
    <header>
            <p>在线支付</p>
        </header>
    <div class="wrapper">
        
        <!-- 倒计时部分 -->
        <div class="countdown">支付剩余时间：{{ countdownText }}</div>

        <!-- 订单总额部分 -->
         <div class="totalPrice">
            ￥{{orders.orderTotal}}
         </div>
        <!-- 订单信息部分 -->
        
        <div class="order-info">
           <div class="order">
                {{orders.business.businessName}}
                <el-icon @click="detailetShow">
                    <div v-if="isShowDetailet">
                        <ArrowDown />
                    </div>
                    <div v-else>
                        <ArrowLeft />

                    </div>
                </el-icon>
              </div>
        </div>
        <!-- 订单明细部分 -->
        <ul class="order-detailet" v-show="isShowDetailet">
            <li v-for="item in orders.list" :key="item.id">
                <p>{{item.food.foodName}} x {{item.quantity}}</p>
                <p>&#165;{{item.food.foodPrice*item.quantity}}</p>
            </li>
            <li>
                <p>配送费</p>
                <p>&#165;{{orders.business.deliveryPrice}}</p>
            </li>
        </ul>
<!-- 支付方式部分 -->
<div class="payment-type">
  <div class="payment-choose">选择支付方式</div>

  <div class="pay-radio-label" @click="selectPayType('redpacket')">
    <div class="payment">
      <img src="@/assets/redpacket.png" />
      <div class="payment-text">
        <p>红包支付</p>
      </div>
    </div>
    <div class="check-icon" v-if="payType === 'redpacket'">
      <svg t="1758437574786" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14058" width="28" height="28"><path d="M512.2 65.4c-247.1 0-447.5 200.4-447.5 447.5s200.4 447.5 447.5 447.5S959.7 760 959.7 512.9 759.3 65.4 512.2 65.4z m220 348L488.8 656.9c-8.1 8.1-18.8 12.2-29.4 12.2-10.7 0-21.3-4.1-29.4-12.2L292.2 519.2c-6.3-6.3-9.7-14.6-9.7-23.5s3.5-17.2 9.7-23.5c13-13 34.1-13 47 0l120.1 120.1 225.9-225.9c13-13 34-13 47 0 6.3 6.3 9.7 14.6 9.7 23.5 0.1 8.9-3.4 17.2-9.7 23.5z" fill="#09b214" p-id="14059"></path></svg>
    </div>
    <div class="check-icon" v-else>
      <svg t="1758437574786" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14058" width="28" height="28"><path d="M512.2 65.4c-247.1 0-447.5 200.4-447.5 447.5s200.4 447.5 447.5 447.5S959.7 760 959.7 512.9 759.3 65.4 512.2 65.4z m220 348L488.8 656.9c-8.1 8.1-18.8 12.2-29.4 12.2-10.7 0-21.3-4.1-29.4-12.2L292.2 519.2c-6.3-6.3-9.7-14.6-9.7-23.5s3.5-17.2 9.7-23.5c13-13 34.1-13 47 0l120.1 120.1 225.9-225.9c13-13 34-13 47 0 6.3 6.3 9.7 14.6 9.7 23.5 0.1 8.9-3.4 17.2-9.7 23.5z" fill="#C6CCDA" p-id="14059"></path></svg>
    </div>
  </div>

  <div class="pay-radio-label" @click="selectPayType('alipay')">
    <div class="payment">
      <img src="@/assets/alipay.png">
      <p>支付宝支付</p>
    </div> 
    <div class="check-icon" v-if="payType === 'alipay'">
        <svg t="1758437574786" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14058" width="28" height="28"><path d="M512.2 65.4c-247.1 0-447.5 200.4-447.5 447.5s200.4 447.5 447.5 447.5S959.7 760 959.7 512.9 759.3 65.4 512.2 65.4z m220 348L488.8 656.9c-8.1 8.1-18.8 12.2-29.4 12.2-10.7 0-21.3-4.1-29.4-12.2L292.2 519.2c-6.3-6.3-9.7-14.6-9.7-23.5s3.5-17.2 9.7-23.5c13-13 34.1-13 47 0l120.1 120.1 225.9-225.9c13-13 34-13 47 0 6.3 6.3 9.7 14.6 9.7 23.5 0.1 8.9-3.4 17.2-9.7 23.5z" fill="#09b214" p-id="14059"></path></svg>
      </div>
      <div class="check-icon" v-else>
        <svg t="1758437574786" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14058" width="28" height="28"><path d="M512.2 65.4c-247.1 0-447.5 200.4-447.5 447.5s200.4 447.5 447.5 447.5S959.7 760 959.7 512.9 759.3 65.4 512.2 65.4z m220 348L488.8 656.9c-8.1 8.1-18.8 12.2-29.4 12.2-10.7 0-21.3-4.1-29.4-12.2L292.2 519.2c-6.3-6.3-9.7-14.6-9.7-23.5s3.5-17.2 9.7-23.5c13-13 34.1-13 47 0l120.1 120.1 225.9-225.9c13-13 34-13 47 0 6.3 6.3 9.7 14.6 9.7 23.5 0.1 8.9-3.4 17.2-9.7 23.5z" fill="#C6CCDA" p-id="14059"></path></svg>
      </div>
  </div>

  <div class="pay-radio-label" @click="selectPayType('wechat')">  
    <div class="payment">    
      <img src="@/assets/wechat.png">
      <p>微信支付</p>
    </div>
      <div class="check-icon" v-if="payType === 'wechat'">
        <svg t="1758437574786" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14058" width="28" height="28"><path d="M512.2 65.4c-247.1 0-447.5 200.4-447.5 447.5s200.4 447.5 447.5 447.5S959.7 760 959.7 512.9 759.3 65.4 512.2 65.4z m220 348L488.8 656.9c-8.1 8.1-18.8 12.2-29.4 12.2-10.7 0-21.3-4.1-29.4-12.2L292.2 519.2c-6.3-6.3-9.7-14.6-9.7-23.5s3.5-17.2 9.7-23.5c13-13 34.1-13 47 0l120.1 120.1 225.9-225.9c13-13 34-13 47 0 6.3 6.3 9.7 14.6 9.7 23.5 0.1 8.9-3.4 17.2-9.7 23.5z" fill="#09b214" p-id="14059"></path></svg>
      </div>
      <div class="check-icon" v-else>
        <svg t="1758437574786" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14058" width="28" height="28"><path d="M512.2 65.4c-247.1 0-447.5 200.4-447.5 447.5s200.4 447.5 447.5 447.5S959.7 760 959.7 512.9 759.3 65.4 512.2 65.4z m220 348L488.8 656.9c-8.1 8.1-18.8 12.2-29.4 12.2-10.7 0-21.3-4.1-29.4-12.2L292.2 519.2c-6.3-6.3-9.7-14.6-9.7-23.5s3.5-17.2 9.7-23.5c13-13 34.1-13 47 0l120.1 120.1 225.9-225.9c13-13 34-13 47 0 6.3 6.3 9.7 14.6 9.7 23.5 0.1 8.9-3.4 17.2-9.7 23.5z" fill="#C6CCDA" p-id="14059"></path></svg>
      </div>
  </div>
</div>
        <div class="payment-button">
            <button @click="confirm">确认支付</button>
        </div>
        
    </div>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router'
import { ref,computed, onMounted, onBeforeUnmount } from 'vue'
import { ArrowDown,ArrowLeft } from '@element-plus/icons-vue'
import { getOrdersById } from '@/api/order'
import { payment } from '@/api/order'
import { ElMessage } from 'element-plus'
// const order = ref() 
        // mounted() {
        //     //这里的代码是实现:一旦路由到在线支付组件,就不能回到订单确认组件｡
        //     //先将当前url添加到history对象中
        //     history.pushState(null, null, document.URL);
        //     //popstate事件能够监听history对象的变化
        //     window.onpopstate = () => {
        //         this.$router.push({ path: '/index' });
        //     }
        // },
        // unmounted() {
        //     window.onpopstate = null;
        // },
// const orders = ref({})
const payType = ref('redpacket')
const redPacketBalance = ref(0)
// 选择支付方式的方法
const selectPayType = (type) => {
  payType.value = type
}
const orders = ref({
  orderId: "ORD20241201001",
  orderTotal: 68.00,
  business: {
    businessId: "BUS001",
    businessName: "米村拌饭",
    businessAddress: "沈阳市和平区",
    businessExplain: "经典韩式拌饭，营养丰富",
    businessImg: "@/assets/sj04.png",
    starPrice: 15,
    deliveryPrice: 3,
    packAmount: 1,
    status: 1,
    remarks: "营业时间：9:00-21:00",
    rating: 4.8,
    totalSales: 1250
  },
  list: [
    {
      id: 1,
      food: {
        foodId: "FOOD001",
        foodName: "石锅拌饭",
        foodExplain: "经典韩式拌饭，营养丰富",
        foodPrice: 25.00,
        foodImg: "@/assets/food01.jpg"
      },
      quantity: 2
    },
    {
      id: 2,
      food: {
        foodId: "FOOD002",
        foodName: "泡菜汤",
        foodExplain: "酸辣开胃的韩式汤品",
        foodPrice: 18.00,
        foodImg: "@/assets/food02.jpg"
      },
      quantity: 1
    },
    {
      id: 3,
      food: {
        foodId: "FOOD003",
        foodName: "韩式烤肉",
        foodExplain: "香嫩多汁的烤肉",
        foodPrice: 35.00,
        foodImg: "@/assets/food03.jpg"
      },
      quantity: 1
    }
  ],
  // 其他订单信息
  orderStatus: "待支付",
  createTime: "2024-12-01 12:30:00",
  deliveryAddress: "沈阳市和平区中山路123号",
  contactPhone: "13812345678",
  remarks: "请送到3楼，谢谢"
})
const isShowDetailet = ref(true)
const detailetShow = () => {
    isShowDetailet.value = !isShowDetailet.value;
}
const router = useRouter() 
const route = useRoute() 
const orderId = route.query.orderId
const confirm = async () => {
    if (payType.value === 'redpacket') {
      const cost = Number(orders.value.orderTotal || 0)
      if (redPacketBalance.value < cost) {
        ElMessage.warning('红包余额不足')
        return
      }
      // 扣减红包余额
      redPacketBalance.value = +(redPacketBalance.value - cost).toFixed(2)
      localStorage.setItem('redPacketBalance', redPacketBalance.value.toString())

      // 增加积分（示例：按订单金额取整）
      const gainPoints = Math.max(1, Math.floor(cost))
      const pointsBalance = Number(localStorage.getItem('pointsBalance') || '0')
      localStorage.setItem('pointsBalance', (pointsBalance + gainPoints).toString())

      const ledger = JSON.parse(localStorage.getItem('pointsLedger') || '[]')
      ledger.unshift({
        createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
        source: '红包支付返积分',
        change: gainPoints,
        expiresAt: '—',
        remark: `订单 ${orderId || orders.value.orderId || ''}`
      })
      localStorage.setItem('pointsLedger', JSON.stringify(ledger))

      ElMessage.success(`已用红包支付，获得积分 +${gainPoints}`)
    } else {
      await payment(orderId)
    }
    router.push({path:'/success',query:{orderId:orderId}})
}   
const TOTAL = 15 * 60
const remaining = ref(TOTAL)
let timerId = null

const countdownText = computed(() => {
  const m = Math.floor(remaining.value / 60).toString().padStart(2, '0')
  const s = (remaining.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

onMounted(async () => {
  // 初始化红包余额（可改为接口返回），默认 1000
  const cache = localStorage.getItem('redPacketBalance')
  redPacketBalance.value = cache ? Number(cache) : 1000

  timerId = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value--
    } else {
      clearInterval(timerId)
      timerId = null
      // TODO: 超时处理（如禁用按钮/自动返回）
    }
  }, 1000)
  const res = await getOrdersById(orderId)
  orders.value = res.data.data
  
})

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId)
})
</script>

<style scoped>
    /****************** 总容器 */
    .wrapper {
        width: 100%;
        min-height: 100vh;
        background-color: #f2f3f5;
    }

    /****************** header部分 */
     header {
        width: 100%;
        height: 12vw;
        background: #f5f5f5 !important;
        border-bottom: 1px solid #e4e7ed !important;
        color: #000;
        font-size: 4.8vw;
        /* font-weight: 600; */
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: solid 1px #DDD;
    }

    /****************** 订单信息部分 ******************/
    .countdown{
        margin-top: 12vw;
        padding-top: 10vw;
        padding-bottom: 3vw;
        font-size: 4vw; 
        color: #999;
        text-align: center;

    }
    .totalPrice{
        font-size: 7vw;
        font-weight: 600;
        text-align: center;
        margin-bottom: 40px;
    }
    .wrapper h3 {
        /* margin-top: 12vw; */
        box-sizing: border-box;
        padding: 4vw 4vw 0;
        font-size: 4vw;
        font-weight: 300;
        color: #999;
    }

    .wrapper .order-info {
        box-sizing: border-box;
        padding: 4vw;
        font-size: 4vw;
        color: #000;
        
        background-color: #fff;
        margin:10px 10px 0 10px;
        border-radius: 10px 10px 0 0;
        
    }
    .wrapper .order-info .order{
      width:100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

    }


    /****************** 订单明细部分 */
    .wrapper .order-detailet {
        /* width: 100%; */
        background-color: #fff;
        margin:0 10px 0 10px;
        border-radius: 0 0 10px 10px;
    }

    .wrapper .order-detailet li {
        width: 100%;
        box-sizing: border-box;
        padding: 1vw 4vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .wrapper .order-detailet li p {
        font-size: 3vw;
        color: #666;
    }

    /****************** 支付方式部分 ******************/
    .wrapper .payment-type {
    
        box-sizing: border-box;
        background-color: #fff;
        margin:20px 10px;
        padding:20px 10px;
        border-radius: 10px; 
             
    }
    .payment-choose{
      padding-bottom: 5px;
      font-size: medium;
      font-weight: 700;
      color:#000;
    }
    .pay-radio-label{
        display: flex;
        align-items: center;
        justify-content: space-between; /* 两端对齐 */
        /* width: 100%; */
        height:40px;
        padding-top:10px; 
        /* border-bottom: solid 1px #f1f0f0; */
    }

    .payment{
        display: flex;
        gap:10px;
        justify-content: flex-start;
        align-content: center;
        height: 8vw;
    }
    .payment-text p {
      margin: 0;
      line-height: 1.4;
      font-size: 14px;
    }
    .payment-text small {
      color: #888;
      font-size: 12px;
    }
    .payment img {
        width: 7vw;
        height: 7vw;
    }
    .payment p{
        line-height: 8vw;
    }

    .wrapper .payment-button {
        width: 100%;
        box-sizing: border-box;
        padding: 4vw;
        margin-top: 55vw;
    }

    .wrapper .payment-button button {
        width: 100%;
        height: 10vw;
        border: none;
        /*去掉外轮廓线*/
        outline: none;
        border-radius: 10px;
        background-color: #47ade8;
        color: #fff;
    }
    
</style>