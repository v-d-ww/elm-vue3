<template>
    <div class="wrapper">
        <!-- 商家部分 -->
        <div class="business">
            <!-- 商家广告部分 -->
             <div class="business-ad">
                <img :src="business.adImage">
                <!-- <img src="@/assets/sj04.png"> -->
             </div>
            <!-- 商家logo部分 -->
            <div class="business-logo">
                <img :src="business.businessImg">
                <!-- <img src="@/assets/sj04.png"> -->
            
                <!-- 商家信息部分 -->
                <div class="business-info">
                    <div style="font-size: 20px;font-weight: 700;">{{ business.businessName }}</div>
                    <div style="display: flex; gap: 8px;padding-top: 10px;">
                        <div class="delivery-item">
                            <div class="des">起送</div><div class="price">￥{{ business.starPrice }}</div>
                        </div>
                        <div class="delivery-item">
                            <div class="des">配送</div><div class="price">￥{{ business.deliveryPrice }}</div>
                        </div>
                        <div class="delivery-item">
                            <div class="des">美食描述</div><div class="price">{{ business.businessExplain }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        <!-- 菜品部分  -->
        <!-- <el-row style="flex:1;background-color: #fff;"> -->
            <el-tabs
                v-model="activeName"
                type="card"
                class="demo-tabs"
                @tab-click="handleClick"
            >
                <!-- 点菜部分 -->
                <el-tab-pane label="点菜" name="点菜" style="height: 100%;">
                    <!-- 分类部分 -->
                    <el-row style="height: 100%;">
                        <el-col :span="4" class="category">
                            <el-menu
                            :default-active="activeCategory"
                            @select="handleSelect"
                            >
                                <el-menu-item 
                                    v-for="cate in category"
                                    :key="cate.id"
                                    :index="cate.id"
                                >
                                    {{ cate.name}}
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                        <!-- 食品列表部分 -->
                        <el-col :span="20">
                            <!-- 分割线 -->
                            <el-divider style="padding:0;margin:3px 0 10px 0;">
                                <span style="color:#959090;font-size: smaller;">温馨提示：请适量点餐</span>
                            </el-divider>
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
                                        <el-icon 
                                            @click="minus(index)" 
                                            v-show="item.quantity != 0"
                                            style="background-color: #959090; color: white; padding: 4px; border-radius: 50%;"
                                        ><Minus /></el-icon>
                                    </div>
                                    <p><span>{{ item.quantity }}</span></p>
                                    <div>
                                        <el-icon 
                                            @click="add(index)" 
                                            style="background-color: #409EFF; color: white; padding: 4px; border-radius: 50%;"
                                        ><Plus /></el-icon>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="评价" name="评价" style="height: 100%;margin-bottom: 8vh;">
                    <div v-for="item in evalList" :key="item.id" class="user-info">
                        <div class="user-header">
                            <!-- <img class="mine-avatar" :src="item.userImg"> -->
                            <img class="mine-avatar" src="@/assets/sj04.png">
                            <div style="font-weight: 700;line-height: 10vw;white-space: nowrap;">{{ item.userName }}</div>
                            <el-rate style="margin-left: 40vw;" v-model="item.rating" :max="5" />

                        </div>
                        <div class="evalContent">{{ item.commentText }}</div>
                        <div style="color: #959090;">{{ item.createTime }}</div>
                    </div>

                </el-tab-pane>
            </el-tabs>
            

            
        <!-- </el-row> -->
        <!-- 评价页面 -->

        
    </div>
    <!-- 购物车部分 -->
    <div class="cart">
            <div class="cart-left">
                <div class="cart-left-icon">
                    <div v-if="totalQuantity == 0">
                        <svg t="1758438275746" class="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15859" width="32" height="32"><path d="M332.8 790.528q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zM758.784 792.576q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM930.816 210.944q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832t-49.664 15.872l-35.84 0-65.536 0-86.016 0-96.256 0-253.952 0 14.336 92.16 517.12 0q49.152 0 49.152 41.984 0 20.48-9.728 35.84t-38.4 14.336l-49.152 0-94.208 0-118.784 0-119.808 0-99.328 0-55.296 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-12.288l103.424 0q20.48 0 32.768 6.144t19.456 15.36 10.24 18.944 5.12 16.896q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0zM892.928 302.08l-641.024-2.048 35.84 185.344 535.552 1.024z" p-id="15860"></path></svg>
                    </div>
                    <div v-else>
                        <svg t="1758438275746" class="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15859" width="32" height="32"><path d="M332.8 790.528q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zM758.784 792.576q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM930.816 210.944q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832t-49.664 15.872l-35.84 0-65.536 0-86.016 0-96.256 0-253.952 0 14.336 92.16 517.12 0q49.152 0 49.152 41.984 0 20.48-9.728 35.84t-38.4 14.336l-49.152 0-94.208 0-118.784 0-119.808 0-99.328 0-55.296 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-12.288l103.424 0q20.48 0 32.768 6.144t19.456 15.36 10.24 18.944 5.12 16.896q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0zM892.928 302.08l-641.024-2.048 35.84 185.344 535.552 1.024z" p-id="15860" fill="#1296db"></path></svg>
                    </div>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { getBusinessById,listFoodByBusinessId,getCartList, saveCart,updateCart,removeCart,listCategoryByBusinessId,listFoodByCategoryId ,getComment } from '@/api/dishes'
import { Plus,Minus } from '@element-plus/icons-vue'


const route = useRoute()
const businessId = route.query.businessId
const category = ref([])
// const category = ref([
//   { id: 1, name: '主食系列' },
//   { id: 2, name: '汤品' },
//   { id: 3, name: '小菜' },
//   { id: 4, name: '饮品' }
// ])
const activeCategory = ref()
const activeName = ref('点菜')
const handleClick = (tab) => {
    activeName.value = tab.props.name
}

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
//     id: 1,
//     foodName: '石锅拌饭',
//     foodExplain: '经典韩式拌饭，营养丰富',
//     foodPrice: 25,
//     foodImg: '@/assets/food01.jpg',
//     quantity: 0
//   },
//   {
//     id: 1,
//     foodName: '石锅拌饭',
//     foodExplain: '经典韩式拌饭，营养丰富',
//     foodPrice: 25,
//     foodImg: '@/assets/food01.jpg',
//     quantity: 0
//   },
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
const evalList = ref([])
const business = ref({})
const cartArr = ref([])
// const evalList = ref([
// {
//     id: 1,
//     userImg: '@/assets/sj04.png',
//     nickName: '阿明',
//     content: '口味不错，分量很足，配送也很快！',
//     time: '2025-09-21 14:32'
//   },
//   {
//     id: 2,
//     userImg: 'https://i.pravatar.cc/80?img=2',
//     nickName: '小李',
//     content: '环境干净，打包严实，推荐牛肉面。',
//     time: '2025-09-22 09:15'
//   },
//   {
//     id: 3,
//     userImg: 'https://i.pravatar.cc/80?img=3',
//     nickName: 'Grace',
//     content: '甜度刚好，奶茶不腻，回购。',
//     time: '2025-09-22 18:47'
//   },
//   {
//     id: 4,
//     userImg: 'https://i.pravatar.cc/80?img=4',
//     nickName: '木子',
//     content: '送达时还是热的，商家态度很好。',
//     time: '2025-09-23 12:03'
//   }

// ])


const handleSelect = async (index) =>{
    activeCategory.value = index
    const res = await listFoodByCategoryId(activeCategory.value,businessId)

    foodArr.value = (res.data.data || []).map(item => ({ 
            ...item, 
            quantity: 0  // 初始化为0
    }))
    // foodArr.value = res.data.data
    await getCart(businessId)
}
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
//    foodArr.value[index].quantity++
   
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

// 获取购物车信息
const getCart = async (businessId) =>{
    const res = await getCartList(businessId)
    cartArr.value = res?.data?.data || []
    for (const foodItem of foodArr.value) {
      const found = cartArr.value.find(c => c.foodId == foodItem.foodId)
      if (found) foodItem.quantity = found.quantity
    }
}
onMounted(async () => {
  try {
    const [res, res1, res2, res3,res4] = await Promise.all([
      getBusinessById(businessId),
      listFoodByBusinessId(businessId),
      getCartList(businessId),
      listCategoryByBusinessId(businessId),
      getComment(businessId)
    ])

    business.value = res?.data?.data || {}
    foodArr.value = (res1?.data?.data || []).map(it => ({ ...it, quantity: 0 }))
    cartArr.value = res2?.data?.data || []
    category.value = res3?.data?.data || []
    evalList.value = res4?.data?.data || []

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
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #f2f3f5;
}

/****************** header部分 ******************/
header {
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
    border-bottom: solid 1px #DDD;
}

/****************** 商家logo部分 ******************/
.wrapper .business{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap:10px;
}
.business-ad{
    width: 100%;
    height: 40vw;
    background-color: #0097EF;
}
.business-ad img {
    width: 100%;
    height: 100%;
    object-fit: fill; 
}
.business-logo{
    width: 100%;
    display: flex;
    gap: 20px;
    align-items: center;
    
}
.wrapper .business-logo img {
    width: 20vw;
    height: 20vw;
    border-radius: 10px;
}

/****************** 商家信息部分 */
.wrapper .business-info {
    width: 100%;
    height: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    /* background-color: red; */
    margin-top: 10px;
}
.delivery-item{
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-right: 20px;
    /* border-right: 1px solid #DDD; */
    justify-content: center;
    align-items: center;
    position: relative;

}

.delivery-item::after{
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 60%; /* 调整这里，变短或变长 */
    background: #DDD;
}

.delivery-item:last-child::after{
    display: none; /* 最后一个不显示右侧线 */
}
.delivery-item .des{
    font-size: small;
    white-space: nowrap;
}
.delivery-item .price{
    font-size: small;
    font-weight: 700;
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
.category{
    padding:0;
    margin:0;
    height:100%;
    width:100%;
    background-color: #f5f5f5;
    overflow-y: auto;
    border: none;
    /* background-color: red; */

}
:deep(.el-menu){
    padding: 0;
    margin:0;
    background-color: #f5f5f5;
    border-radius: 10px !important;
}
:deep(.el-menu-item){
    text-align: center !important;
    padding: 0 !important;
    margin:0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    border-radius: 10px !important;
}
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
    margin: 0;
    padding: 0;
    width:78%;
}

.wrapper .food li .food-left img {
    width: 20vw;
    height: 20vw;
    border-radius: 20px;
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
    padding: 0;
    margin:0;
    flex: 1;
    box-sizing:border-box;
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
.cart {
    width: 100%;
    height: 14vw;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
}

.cart .cart-left {
    flex: 2;
    background-color: #fff;
    display: flex;
}

.cart .cart-left .cart-left-icon {
    width: 16vw;
    height: 16vw;
    box-sizing: border-box;
    border: solid 1.6vw #f5f5f5;
    border-radius: 8vw;
    background-color: #fff;
    font-size: 7vw;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -4vw;
    margin-left: 3vw;
    position: relative;
}

.cart .cart-left .cart-left-icon-quantity {
    width: 5vw;
    height: 5vw;
    border-radius: 2.5vw;
    background-color: red;
    color: #000;
    font-size: 3.6vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -1.5vw;
    top: -1.5vw;
}

.cart .cart-left .cart-left-info p:first-child {
    font-size: 4.5vw;
    color: #000;
    margin-top: 1vw;
}

.cart .cart-left .cart-left-info p:last-child {
    font-size: 2.8vw;
    color: #AAA;
}

.cart .cart-right {
    flex: 1;
}

/*达到起送费时的样式*/
.cart .cart-right .cart-right-item {
    width: 100%;
    height: 100%;
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
.demo-tabs{
    background-color: #fff;
    flex:1;
    border-radius: 10px;
}
.user-info{
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap:20px;
    border-bottom: 1px solid #DDD;
    border-radius: 10px;
}
.user-header{
    display: flex;
    gap:10px;
    align-content: center;
    /* background-color: red; */
}
.mine-avatar{
    border-radius: 50%;
    height:10vw;
    width:10vw;
        
}
</style>