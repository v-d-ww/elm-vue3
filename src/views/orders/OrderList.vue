<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>我的订单</p>
        </header>
        <!-- 选项 -->
         <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="全部" name="全部"></el-tab-pane>
            <el-tab-pane label="未支付" name="未支付"></el-tab-pane>
            <el-tab-pane label="已支付" name="已支付"></el-tab-pane>
            <el-tab-pane label="已接单" name="已接单"></el-tab-pane>
            <el-tab-pane label="配送中" name="配送中"></el-tab-pane>   
         </el-tabs>
        <!-- 全部订单 -->
        <ul class="order" v-if="activeName === '全部'">
                <li v-for="item in orderArr" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                    <div class="order-info">
                        <p>
                            {{item.business.businessName}}
                        </p>
                    <div class="order-info-right">
                        <div class="order-info-right-icon" v-if="item.orderState === 0">未支付</div>
                    </div>
                </div>
                <!-- 具体食品的信息 -->
                <ul class="order-detailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <img :src="odItem.food.foodImg">
                        <!-- <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p> -->
                        <p>{{odItem.food.foodName}} ￥{{ odItem.food.foodPrice }} x {{odItem.quantity}}</p>
                    </li>
                    <div class="payment">&#165;{{item.orderTotal}}</div>
                </ul>
                <div class="but-container">
                    <el-button size="medium" @click="toggleReview(item)">评价</el-button>
                    <el-button type="primary" v-if="item.orderState === 0" size="medium"  @click="goPayment(item)">支付</el-button>
                    <el-button type="primary" v-else size="medium">确认收货</el-button>
                </div>
                <div v-if="item.showReview" class="review-panel">
                    <div class="review-row">
                        <span>评分：</span>
                        <el-rate v-model="item.reviewRating" :max="5" />
                    </div>
                    <div class="review-row">
                        <el-input
                          v-model="item.reviewText"
                          type="textarea"
                          :rows="3"
                          maxlength="200"
                          show-word-limit
                          placeholder="说说你对本次订单的看法吧"
                        />
                    </div>
                    <div class="review-actions">
                        <el-button @click="toggleReview(item)">取消</el-button>
                        <el-button type="primary" @click="submitReview(item)">提交</el-button>
                    </div>
                </div>
            </li>
        </ul>

        <!-- 已支付订单 -->
        <ul class="order" v-if="activeName === '已支付'">
                <li v-for="item in paidOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                    <div class="order-info">
                        <p>
                            {{item.business.businessName}}
                        </p>
                    <div class="order-info-right">
                        <div class="order-info-right-icon" v-if="item.orderState === 0">未支付</div>
                    </div>
                </div>
                <!-- 具体食品的信息 -->
                <ul class="order-detailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <img :src="odItem.food.foodImg">
                        <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p>
                    </li>
                    <div class="payment">&#165;{{item.orderTotal}}</div>
                </ul>
                <div class="but-container">
                    <el-button size="medium" @click="toggleReview(item)">评价</el-button>
                    <el-button type="primary" size="medium">确认收货</el-button>
                </div>
                <div v-if="item.showReview" class="review-panel">
                    <div class="review-row">
                        <span>评分：</span>
                        <el-rate v-model="item.reviewRating" :max="5" />
                    </div>
                    <div class="review-row">
                        <span>评价：</span>
                        <el-input
                          v-model="item.reviewText"
                          type="textarea"
                          :rows="3"
                          maxlength="200"
                          show-word-limit
                          placeholder="说说你对本次订单的看法吧"
                        />
                    </div>
                    <div class="review-actions">
                        <el-button @click="toggleReview(item)">取消</el-button>
                        <el-button type="primary" @click="submitReview(item)">提交</el-button>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 配送中订单 -->
        <ul class="order" v-if="activeName === '配送中'">
                <li v-for="item in deliveryOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                    <div class="order-info">
                        <p>
                            {{item.business.businessName}}
                        </p>
                    <div class="order-info-right">
                        <div class="order-info-right-icon" v-if="item.orderState === 0">未支付</div>
                    </div>
                </div>
                <!-- 具体食品的信息 -->
                <ul class="order-detailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <img :src="odItem.food.foodImg">
                        <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p>
                    </li>
                    <div class="payment">&#165;{{item.orderTotal}}</div>
                </ul>
                <div class="but-container">
                    <el-button size="medium" @click="toggleReview(item)">评价</el-button>
                    <el-button type="primary" size="medium" >确认收货</el-button>
                </div>
                <div v-if="item.showReview" class="review-panel">
                    <div class="review-row">
                        <span>评分：</span>
                        <el-rate v-model="item.reviewRating" :max="5" />
                    </div>
                    <div class="review-row">
                        <span>评价：</span>
                        <el-input
                          v-model="item.reviewText"
                          type="textarea"
                          :rows="3"
                          maxlength="200"
                          show-word-limit
                          placeholder="说说你对本次订单的看法吧"
                        />
                    </div>
                    <div class="review-actions">
                        <el-button @click="toggleReview(item)">取消</el-button>
                        <el-button type="primary" @click="submitReview(item)">提交</el-button>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 已接单订单 -->
        <ul class="order" v-if="activeName === '已接单'">
                <li v-for="item in receiveOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                    <div class="order-info">
                        <p>
                            {{item.business.businessName}}
                        </p>
                    <div class="order-info-right">
                        <div class="order-info-right-icon" v-if="item.orderState === 0">未支付</div>
                    </div>
                </div>
                <!-- 具体食品的信息 -->
                <ul class="order-detailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <img :src="odItem.food.foodImg">
                        <p>{{odItem.food.foodName}} x {{odItem.quantity}}</p>
                    </li>
                    <div class="payment">&#165;{{item.orderTotal}}</div>
                </ul>
                <div class="but-container">
                    <el-button size="medium" @click="toggleReview(item)">评价</el-button>
                    <el-button type="primary" size="medium"  >确认收货</el-button>
                </div>
                <div v-if="item.showReview" class="review-panel">
                    <div class="review-row">
                        <span>评分：</span>
                        <el-rate v-model="item.reviewRating" :max="5" />
                    </div>
                    <div class="review-row">
                        <span>评价：</span>
                        <el-input
                          v-model="item.reviewText"
                          type="textarea"
                          :rows="3"
                          maxlength="200"
                          show-word-limit
                          placeholder="说说你对本次订单的看法吧"
                        />
                    </div>
                    <div class="review-actions">
                        <el-button @click="toggleReview(item)">取消</el-button>
                        <el-button type="primary" @click="submitReview(item)">提交</el-button>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 已取消订单 -->
        <ul class="order" v-if="activeName === '未支付'">
                <li v-for="item in cancleOrders" :key="item.orderId" style="border: 1px solid #e4e7ed;">
                    <div class="order-info">
                        <p>
                            {{item.business.businessName}}
                        </p>
                    <div class="order-info-right">
                        <div class="order-info-right-icon" v-if="item.orderState === 0">未支付</div>
                    </div>
                </div>
                <!-- 具体食品的信息 -->
                <ul class="order-detailet">
                    <li v-for="odItem in item.list" :key="odItem.id">
                        <img :src="odItem.food.foodImg">
                        <p>{{odItem.food.foodName}} ￥{{ odItem.food.foodPrice }} x {{odItem.quantity}}</p>
                    </li>
                    <div class="payment">&#165;{{item.orderTotal}}</div>
                </ul>
                <div class="but-container">
                    <el-button size="medium" @click="toggleReview(item)">评价</el-button>
                    <el-button type="primary" size="medium" v-if="item.orderState === 0">去支付</el-button>
                </div>
                <div v-if="item.showReview" class="review-panel">
                    <div class="review-row">
                        <span>评分：</span>
                        <el-rate v-model="item.reviewRating" :max="5" />
                    </div>
                    <div class="review-row">
                        <el-input
                          v-model="item.reviewText"
                          type="textarea"
                          :rows="3"
                          maxlength="200"
                          show-word-limit
                          placeholder="说说你对本次订单的看法吧"
                        />
                    </div>
                    <div class="review-actions">
                        <el-button @click="toggleReview(item)">取消</el-button>
                        <el-button type="primary" @click="submitReview(item)">提交</el-button>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 底部菜单部分 -->
        <Footer></Footer>
    </div>
</template>
<script setup>
import Footer from '@/components/PageFooter.vue';
import { useRouter } from 'vue-router'
import { ref,computed } from 'vue'
import { listOrdersByUserId,addComment } from '@/api/order'

const router = useRouter()
// const orderArr = ref([])
const paidOrders = computed(() => orderArr.value.filter(o => o.orderState === 1))
const deliveryOrders = computed(() => orderArr.value.filter(o => o.orderState === 3))
const receiveOrders = computed(() => orderArr.value.filter(o => o.orderState === 7))
const cancleOrders = computed(() => orderArr.value.filter(o => o.orderState === 0))
const activeName = ref('全部')
const handleClick = (tab)=>{
    activeName.value = tab.props.name

}

const goPayment = (order) => {
    router.push({ path: '/payment', query: { orderId: order.orderId } });
}
// onMounted(async()=>{
//     const res = await listOrdersByUserId()
//     orderArr.value=res.data.data
// })    
const orderArr =ref( [
  {
    orderId: 10001,
    orderState: 0, // 未支付
    orderTotal: 38.5,
    isShowDetailet: false,
    business: {
      businessName: "汉堡王（人民广场店）",
      deliveryPrice: 5
    },
    list: [
      {
        id: 1,
        quantity: 2,
        food: {
          foodImg: "https://example.com/img/burger.jpg",
          foodName: "皇堡",
          foodPrice: 15
        }
      },
      {
        id: 2,
        quantity: 1,
        food: {
          foodImg: "https://example.com/img/coke.jpg",
          foodName: "可乐",
          foodPrice: 3.5
        }
      },
      {
        id: 1,
        quantity: 2,
        food: {
          foodImg: "https://example.com/img/burger.jpg",
          foodName: "皇堡",
          foodPrice: 15
        }
      },
      {
        id: 1,
        quantity: 2,
        food: {
          foodImg: "https://example.com/img/burger.jpg",
          foodName: "皇堡",
          foodPrice: 15
        }
      },
    ]
  },
  {
    orderId: 10002,
    orderState: 1, // 已支付
    orderTotal: 52,
    isShowDetailet: false,
    business: {
      businessName: "肯德基（淮海路店）",
      deliveryPrice: 4
    },
    list: [
      {
        id: 3,
        quantity: 1,
        food: {
          foodImg: "https://example.com/img/chicken.jpg",
          foodName: "吮指原味鸡",
          foodPrice: 18
        }
      },
      {
        id: 4,
        quantity: 2,
        food: {
          foodImg: "https://example.com/img/icecream.jpg",
          foodName: "冰淇淋",
          foodPrice: 5
        }
      }
    ]
  },
  {
    orderId: 10003,
    orderState: 3, // 配送中
    orderTotal: 27,
    isShowDetailet: false,
    business: {
      businessName: "兰州拉面",
      deliveryPrice: 3
    },
    list: [
      {
        id: 5,
        quantity: 1,
        food: {
          foodImg: "https://example.com/img/noodle.jpg",
          foodName: "牛肉面",
          foodPrice: 24
        }
      }
    ]
  },
  {
    orderId: 10004,
    orderState: 7, // 已接单
    orderTotal: 66,
    isShowDetailet: false,
    business: {
      businessName: "全家便利店",
      deliveryPrice: 2
    },
    list: [
      {
        id: 6,
        quantity: 6,
        food: {
          foodImg: "https://example.com/img/riceball.jpg",
          foodName: "饭团",
          foodPrice: 8
        }
      }
    ]
  },
  {
    orderId: 10005,
    orderState: 6, // 已取消
    orderTotal: 0,
    isShowDetailet: false,
    business: {
      businessName: "披萨店",
      deliveryPrice: 6
    },
    list: []
  }
] )   

const ensureReviewFields = (order) => {
    if (order.showReview === undefined) order.showReview = false;
    if (order.reviewRating === undefined) order.reviewRating = 0;
    if (order.reviewText === undefined) order.reviewText = '';
}
const toggleReview = (order) => {
    ensureReviewFields(order)
    order.showReview = !order.showReview
}
const submitReview = async (order) => {
    ensureReviewFields(order)
    addComment(order.orderId,order.reviewRating,order.reviewText)
    console.log('submit review', {
        orderId: order.orderId,
        rating: order.reviewRating,
        content: order.reviewText
    })
    order.showReview = false
}
   
 </script>
 <style scoped>
 /****************** 总容器 ******************/
 .wrapper {
    width: 100%;
    height: 100%;
    background: #fff
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
 .demo-tabs{
    margin: 12vw auto 0 auto;
    background-color: #fff;
    overflow-x: auto ;
    padding: 0;
    display: flex;
    justify-content: center;
 }
 :deep(.el-tabs__nav-wrap) {
    display: flex;
    justify-content: center;
}
 .wrapper h3 {
    
    box-sizing: border-box;
    padding: 4vw;
    font-size: 4vw;
    font-weight: 300;
    color: #000;
 }
 .wrapper .order {
    width: 95%;
    border-radius:20px;
    margin:0 auto;
    background: #fff;
 }
 .wrapper .order li {
    padding:10px;
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;
 }
 .wrapper .order li .order-info {
    box-sizing: border-box;
    padding: 2vw 4vw;
    font-size: 4vw;
    font-weight: 700;
    color: #000;
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
    width: 75%;
    display: flex;
    /* gap:10px; */
    /* justify-content: flex-start; */
    /* background-color: red; */
    overflow-x: auto;
    flex-wrap: nowrap;
 }
 .payment{
    color: #000;
    font-weight: 700;
    font-size: large;
    position: absolute;
    padding: 30px 20px 0 20px ;
    right: 0;

    background-color: #fff;
    height: 98px;
    /* line-height: 98px; */
    text-align: center;
    box-sizing: border-box;

 }
 .wrapper .order li .order-detailet li {
    
    box-sizing: border-box;
    padding: 1vw;
    color: #666;
    font-size: 3vw;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
 }
 .wrapper .order li .order-detailet li img{
    width:80px;
    height:80px;
    border-radius: 10px;
    box-sizing: border-box;
 }
 .but-container{
    display: flex;
    gap: 10px;
    margin-left: 45vw;
    margin-top: 2px;
 }
.review-panel{
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
    background: #fafafa;
}
.review-row{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.review-actions{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
 </style>