<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>商家信息</p>
        </header>
        <!-- 商家logo部分 -->
        <div class="business-logo">
            <img :src="business.businessImg">
        </div>
        <!-- 商家信息部分 -->
        <div class="business-info">
            <h1>{{ business.businessName }}</h1>
            <p>&#165;{{ business.starPrice }}起送 &#165;{{ business.deliveryPrice }}配送</p>
            <p>{{ business.businessExplain }}</p>
        </div>
        <!-- 食品列表部分 -->
        <ul class="food">
            <li v-for="(item, index) in foodArr" :key="item.id">
                <div class="food-left">
                    <img :src="item.foodImg">
                    <div class="food-left-info">
                        <h3>{{ item.foodName }}</h3>
                        <p>{{ item.foodExplain }}</p>
                        <p>￥{{ item.foodPrice }}</p>
                    </div>
                </div>
                <div class="food-right">
                    <div>
                        <!-- <i class="fa fa-minus-circle" @click="minus(index)" ></i> -->
                        <el-icon @click="minus(index)" v-show="item.quantity != 0"><Minus /></el-icon>
                    </div>
                    <p><span>{{ item.quantity }}</span></p>
                    <div>
                        <el-icon @click="add(index)"><Plus /></el-icon>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 购物车部分 -->
        <div class="cart">
            <div class="cart-left">
                <div class="cart-left-icon"
                    :style="totalQuantity == 0 ? 'background-color:#505051;' : 'background-color:#3190E8;'">
                    <i class="fa fa-shopping-cart"></i>
                    <div class="cart-left-icon-quantity" v-show="totalQuantity != 0">
                        {{ totalQuantity }}</div>
                </div>
                <div class="cart-left-info">
                    <p>￥{{ totalPrice }}</p>
                    <p>另需配送费{{ business.deliveryPrice }}元</p>
                </div>
            </div>
            <div class="cart-right">
                <!-- 不够起送费 -->
                <div class="cart-right-item" v-show="totalSettle < business.starPrice"
                    style="background-color: #535356;cursor: default;">
                    ￥{{ business.starPrice }}起送
                </div>
                <!-- 达到起送费 -->
                <div class="cart-right-item" @click="toOrder" v-show="totalSettle >= business.starPrice">
                    去结算
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { getBusinessById,listFoodByBusinessId,getCartList, saveCart,updateCart,removeCart } from '@/api/dishes'
import { Plus,Minus } from '@element-plus/icons-vue'


const route = useRoute()
const businessId = route.query.businessId
// const business = ref({
//     businessId:businessId,
//     businessName:'米村',
//     businessAddress:'沈阳',
//     businessExplain:'套餐拌饭',
//     businessImg:'@/assets/sj04.png',
//     starPrice:15,
//     deliveryPrice:3,
//     packAmount:1,
//     status:1,
//     remarks:'营业时间',
//     rating:5,
//     totalSales:0
// })


// 食品列表数据
// const foodArr = ref([
//   {
//     id: 1,
//     foodName: '石锅拌饭',
//     foodExplain: '经典韩式拌饭，营养丰富',
//     foodPrice: 25,
//     foodImg: '@/assets/food01.jpg',
//     quantity: 0
//   },
//   {
//     id: 2,
//     foodName: '泡菜汤',
//     foodExplain: '酸辣开胃的韩式汤品',
//     foodPrice: 18,
//     foodImg: '@/assets/food02.jpg',
//     quantity: 0
//   },
//   {
//     id: 3,
//     foodName: '韩式烤肉',
//     foodExplain: '香嫩多汁的烤肉',
//     foodPrice: 35,
//     foodImg: '@/assets/food03.jpg',
//     quantity: 0
//   }
// ])
const foodArr = ref([])
const business = ref({})
const cartArr = ref([])

// 计算总数量
const totalQuantity = computed(() => {
  return foodArr.value.reduce((total, item) => total + item.quantity, 0)

})

// 计算商品总价格
const totalPrice = computed(() => {
  return foodArr.value.reduce((total, item) => total + (item.foodPrice * item.quantity), 0)
})

// 计算总结算金额（商品总价 + 配送费）
const totalSettle = computed(() => {
  return totalPrice.value + business.value?.deliveryPrice
})

// 添加商品
const add = async (index) => {
   //此食品数量要更新为1;
   if(foodArr.value[index].quantity === 0){
    await saveCart(businessId,foodArr.value[index].foodId)
    foodArr.value[index].quantity++
   }
   else {
    foodArr.value[index].quantity++
    await updateCart(businessId,foodArr.value[index].foodId,foodArr.value[index].quantity)
   }
   
}

// 减少商品
const minus = async (index) => {
  if (foodArr.value[index].quantity > 1) {
    foodArr.value[index].quantity--
    await updateCart(businessId,foodArr.value[index].foodId,foodArr.value[index].quantity)
  }else{
    foodArr.value[index].quantity--
    await removeCart(businessId,foodArr.value[index].foodId)
  }
}
const router = useRouter()

// 去结算
const toOrder = async () => {
   
    router.push({ path:'/orders', query: { businessId: businessId}});
    
}

onMounted(async () => {
  try {
    const [res, res1, res2] = await Promise.all([
      getBusinessById(businessId),
      listFoodByBusinessId(businessId),
      getCartList(businessId)
    ])

    business.value = res?.data?.data || {}
    foodArr.value = (res1?.data?.data || []).map(it => ({ ...it, quantity: 0 }))
    cartArr.value = res2?.data?.data || []

    // 同步购物车数量
    for (const foodItem of foodArr.value) {
      const found = cartArr.value.find(c => c.foodId == foodItem.foodId)
      if (found) foodItem.quantity = found.quantity
    }
  } catch (err) {
    console.error('加载商家/菜单/购物车失败:', err)
    business.value = business.value || {}
    foodArr.value = foodArr.value || []
    cartArr.value = cartArr.value || []
  }
})
</script>

<style scoped>
/*总容器*/
.wrapper {
    width: 100%;
    height: 100%;
}

/****************** header部分 ******************/
.wrapper header {
    width: 100%;
    height: 12vw;
    background-color: #fff;
    color: #000;
    font-size: 4.8vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px #DDD;
}

/****************** 商家logo部分 ******************/
.wrapper .business-logo {
    width: 100%;
    height: 35vw;
    /*使用上外边距避开header部分*/
    margin-top: 12vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper .business-logo img {
    width: 40vw;
    height: 30vw;
    border-radius: 5px;
}

/****************** 商家信息部分 */
.wrapper .business-info {
    width: 100%;
    height: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.wrapper .business-info h1 {
    font-size: 5vw;
}

.wrapper .business-info p {
    font-size: 3vw;
    color: #666;
    margin-top: 1vw;
}

/****************** 食品列表部分 ******************/
.wrapper .food {
    width: 100%;
    /*使用下外边距避开footer部分*/
    margin-bottom: 14vw;
}

.wrapper .food li {
    width: 100%;
    box-sizing: border-box;
    padding: 2.5vw;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrapper .food li .food-left {
    display: flex;
    align-items: center;
}

.wrapper .food li .food-left img {
    width: 20vw;
    height: 20vw;
}

.wrapper .food li .food-left .food-left-info {
    margin-left: 3vw;
}

.wrapper .food li .food-left .food-left-info h3 {
    font-size: 3.8vw;
    color: #555;
}

.wrapper .food li .food-left .food-left-info p {
    font-size: 3vw;
    color: #888;
    margin-top: 2vw;
}

.wrapper .food li .food-right {
    width: 16vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrapper .food li .food-right .fa-minus-circle {
    font-size: 5.5vw;
    color: #999;
    cursor: pointer;
}

.wrapper .food li .food-right p {
    font-size: 3.6vw;
    color: #333;
}

.wrapper .food li .food-right .fa-plus-circle {
    font-size: 5.5vw;
    color: #0097EF;
    cursor: pointer;
}

/****************** 购物车部分 ******************/
.wrapper .cart {
    width: 100%;
    height: 14vw;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
}

.wrapper .cart .cart-left {
    flex: 2;
    background-color: #505051;
    display: flex;
}

.wrapper .cart .cart-left .cart-left-icon {
    width: 16vw;
    height: 16vw;
    box-sizing: border-box;
    border: solid 1.6vw #444;
    border-radius: 8vw;
    background-color: #3190E8;
    font-size: 7vw;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -4vw;
    margin-left: 3vw;
    position: relative;
}

.wrapper .cart .cart-left .cart-left-icon-quantity {
    width: 5vw;
    height: 5vw;
    border-radius: 2.5vw;
    background-color: red;
    color: #fff;
    font-size: 3.6vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -1.5vw;
    top: -1.5vw;
}

.wrapper .cart .cart-left .cart-left-info p:first-child {
    font-size: 4.5vw;
    color: #fff;
    margin-top: 1vw;
}

.wrapper .cart .cart-left .cart-left-info p:last-child {
    font-size: 2.8vw;
    color: #AAA;
}

.wrapper .cart .cart-right {
    flex: 1;
}

/*达到起送费时的样式*/
.wrapper .cart .cart-right .cart-right-item {
    width: 100%;
    height: 100%;
    background-color: #38CA73;
    color: #fff;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

/*不够起送费时的样式(只有背景色和鼠标样式的区别)*/
/*
.wrapper .cart .cart-right .cart-right-item{
    width: 100%;
    height: 100%;
    background-color: #535356;
    color: #fff;
    font-size: 4.5vw;
    font-weight: 700;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
}
*/
</style>