<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>在线支付</p>
        </header>
        <!-- 倒计时部分 -->
        <div class="countdown">支付剩余时间：{{ countdownText }}</div>

        <!-- 订单总额部分 -->
         <div class="totalPrice">
            ￥{{orders.orderTotal}}
         </div>
        <!-- 订单信息部分 -->
        <h3>订单信息:</h3>
        <div class="order-info">
        
                {{orders.business.businessName}}
                <el-icon @click="detailetShow"><ArrowDown /></el-icon>
            
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
  <div class="pay-radio-label">      
      <img src="@/assets/alipay.png">
      <!-- <input type="radio" name="payType" value="alipay" v-model="payType" style="align-items: center;"> -->
  </div>
  <div class="pay-radio-label">      
      <img src="@/assets/wechat.png">
      <!-- <input type="radio" name="payType" value="alipay" v-model="payType" style="align-items: center;"> -->
  </div>
</div>
        <div class="payment-button">
            <button @click="confirm">确认支付</button>
        </div>
        <!-- 底部菜单部分 -->
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '@/components/PageFooter.vue';
import { useRouter,useRoute } from 'vue-router'
import { ref,computed, onMounted, onBeforeUnmount } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { getOrdersById } from '@/api/order'
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
const orders = ref({})
const isShowDetailet = ref(true)
const detailetShow = () => {
    isShowDetailet.value = !isShowDetailet.value;
}
const router = useRouter() 
const route = useRoute() 
const orderId = route.query.orderId
const confirm = () => {
    router.push('/')
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
        height: 100%;
        background-color: #F5F5F5;
    }

    /****************** header部分 */
    .wrapper header {
        width: 100%;
        height: 12vw;
        background-color: #fff;
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
        padding-top: 3vw;
        padding-bottom: 3vw;
        font-size: 4vw; 
        color: #999;
        text-align: center;

    }
    .totalPrice{
        font-size: 7vw;
        font-weight: 600;
        text-align: center;
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
        color: #666;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        margin:10px 10px 0 10px;
        border-radius: 10px 10px 0 0;
        
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
        /* width: 100%; */
        box-sizing: border-box;
        background-color: #fff;
        margin:10px 10px 0 10px;
        border-radius: 10px; 
             
    }
    .pay-radio-label{
        display: flex;
        align-items: center;
        justify-content: space-between; /* 两端对齐 */
        /* width: 100%; */
        height:40px;
        padding:10px; 
        border-bottom: solid 1px #f1f0f0;
    }

    .pay-radio-label img {
        width: 25vw;
        height: 6vw;
    }

    .wrapper .payment-button {
        width: 100%;
        box-sizing: border-box;
        padding: 4vw;
    }

    .wrapper .payment-button button {
        width: 100%;
        height: 10vw;
        border: none;
        /*去掉外轮廓线*/
        outline: none;
        border-radius: 4px;
        background-color: #47ade8;
        color: #fff;
    }
    
</style>