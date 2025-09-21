<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>我的订单</p>
        </header>
        <!-- 订单列表部分 -->
            <h3>未支付订单信息：</h3>
            <ul class="order">
                <li v-for="item in unpaidOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                    <div class="order-info">
                        <p>
                            {{item.business.businessName}}
                        </p>
                    <div class="order-info-right">
                        <p>&#165;{{item.orderTotal}}</p>
                        <div class="order-info-right-icon" @click="goPayment(item)">去支付</div>
                    </div>
                </div>
                <!-- 具体食品的信息 -->
                <ul class="order-detailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <img :src="odItem.food.foodImg">
                        <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <h3>已支付订单信息：</h3>
        <ul class="order">
            <li v-for="item in paidOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                <div class="order-info">
                    <p>
                        {{item.business.businessName}}
                        <i class="fa fa-caret-down" @click="detailetShow(item)"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;{{item.orderTotal}}</p>
                    </div>
                </div>
                <ul class="order-detailet" v-show="item.isShowDetailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p>
                        <p>&#165;{{odItem.food.foodPrice*odItem.quantity}}</p>
                    </li>
                    <li>
                        <p>配送费</p>
                        <p>&#165;{{item.business.deliveryPrice}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <h3>配送中订单信息：</h3>
        <ul class="order">
            <li v-for="item in deliveryOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                <div class="order-info">
                    <p>
                        {{item.business.businessName}}
                        <i class="fa fa-caret-down" @click="detailetShow(item)"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;{{item.orderTotal}}</p>
                    </div>
                </div>
                <ul class="order-detailet" v-show="item.isShowDetailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p>
                        <p>&#165;{{odItem.food.foodPrice*odItem.quantity}}</p>
                    </li>
                    <li>
                        <p>配送费</p>
                        <p>&#165;{{item.business.deliveryPrice}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <h3>已接单订单信息：</h3>
        <ul class="order">
            <li v-for="item in receiveOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                <div class="order-info">
                    <p>
                        {{item.business.businessName}}
                        <i class="fa fa-caret-down" @click="detailetShow(item)"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;{{item.orderTotal}}</p>
                    </div>
                </div>
                <ul class="order-detailet" v-show="item.isShowDetailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p>
                        <p>&#165;{{odItem.food.foodPrice*odItem.quantity}}</p>
                    </li>
                    <li>
                        <p>配送费</p>
                        <p>&#165;{{item.business.deliveryPrice}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <h3>已取消订单信息：</h3>
        <ul class="order">
            <li v-for="item in cancleOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                <div class="order-info">
                    <p>
                        {{item.business.businessName}}
                        <i class="fa fa-caret-down" @click="detailetShow(item)"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;{{item.orderTotal}}</p>
                    </div>
                </div>
                <ul class="order-detailet" v-show="item.isShowDetailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p>
                        <p>&#165;{{odItem.food.foodPrice*odItem.quantity}}</p>
                    </li>
                    <li>
                        <p>配送费</p>
                        <p>&#165;{{item.business.deliveryPrice}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 底部菜单部分 -->
        <Footer></Footer>
    </div>
</template>
<script setup>
import Footer from '@/components/PageFooter.vue';
import { useRouter } from 'vue-router'
import { ref,onMounted,computed } from 'vue'
import { listOrdersByUserId } from '@/api/order'

const router = useRouter()
const orderArr = ref([])
const unpaidOrders = computed(() => orderArr.value.filter(o => o.orderState == 0))
const paidOrders = computed(() => orderArr.value.filter(o => o.orderState == 1))
const deliveryOrders = computed(() => orderArr.value.filter(o => o.orderState == 3))
const receiveOrders = computed(() => orderArr.value.filter(o => o.orderState == 7))
const cancleOrders = computed(() => orderArr.value.filter(o => o.orderState == 6))
const detailetShow = (orders) => {
    orders.isShowDetailet = !orders.isShowDetailet;
}
const goPayment = (order) => {
    router.push({ path: '/payment', query: { orderId: order.orderId } });
}
onMounted(async()=>{
    const res = await listOrdersByUserId()
    orderArr.value=res.data.data
})    
     
   
 </script>
 <style scoped>
 /****************** 总容器 ******************/
 .wrapper {
    width: 100%;
    height: 100%;
    background: #f5f5f5
 }
 /****************** header部分 ******************/
 .wrapper header {
    width: 100%;
    height: 12vw;
    background: #f5f5f5 !important;
    border-bottom: 1px solid #e4e7ed !important;
    color: #000;
    font-size: 4.8vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
 }
 /****************** 历史订单列表部分 ******************/
 .wrapper h3 {
    margin-top: 12vw;
    box-sizing: border-box;
    padding: 4vw;
    font-size: 4vw;
    font-weight: 300;
    color: #666f72;
 }
 .wrapper .order {
    width: 95%;
    border-radius:20px;
    margin:0 auto;
    background: #fff;
 }
 .wrapper .order li {
    width: 100%;
 }
 .wrapper .order li .order-info {
    box-sizing: border-box;
    padding: 2vw 4vw;
    font-size: 4vw;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
 }
 .wrapper .order li .order-info .order-info-right {
    display: flex;
 }
 .wrapper .order li .order-info .order-info-right .order-info-right-icon {
    background-color: #f90;
    color: #fff;
    border-radius: 3px;
    margin-left: 2vw;
    user-select: none;
    cursor: pointer;
 }
 .wrapper .order li .order-detailet {
    width: 100%;
 }
 .wrapper .order li .order-detailet li {
    overflow-x: auto;
    box-sizing: border-box;
    padding: 1vw 4vw;
    color: #666;
    font-size: 3vw;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
 }
 .wrapper .order li .order-detailet li img{
    width:80px;
    height:80px;
    border-radius: 2px;
 }
 </style>