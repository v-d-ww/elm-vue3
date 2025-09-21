<template>
  <header>
 <div class="icon-location-box">
  <svg t="1757910717169" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6202" width="25" height="25">
    <path d="M512 512a136.533333 136.533333 0 1 1 136.533333-136.533333 136.533333 136.533333 0 0 1-136.533333 136.533333z m0-219.272533a81.92 81.92 0 1 0 81.92 81.92 81.92 81.92 0 0 0-81.92-81.92z" fill="#000000" p-id="6203"></path>
    <path d="M512 831.214933a27.306667 27.306667 0 0 1-19.2512-8.055466l-214.493867-214.357334a330.5472 330.5472 0 1 1 467.490134 0l-214.357334 214.357334a27.306667 27.306667 0 0 1-19.387733 8.055466z m0-732.091733a275.933867 275.933867 0 0 0-195.106133 471.04L512 765.269333l195.106133-195.106133A275.933867 275.933867 0 0 0 512 99.1232z" fill="#000000" p-id="6204"></path>
    <path d="M514.321067 979.490133c-147.456 0-306.107733-37.000533-306.107734-118.3744 0-45.602133 51.746133-81.92 145.681067-102.4a27.306667 27.306667 0 1 1 11.605333 53.384534c-78.370133 17.066667-102.673067 41.915733-102.673066 49.015466 0 18.432 88.064 63.761067 251.4944 63.761067s251.4944-45.192533 251.4944-63.761067c0-7.3728-25.258667-32.768-106.496-49.834666a27.306667 27.306667 0 1 1 11.195733-53.384534c96.6656 20.343467 150.186667 56.9344 150.186667 103.2192-0.273067 80.964267-158.9248 118.3744-306.3808 118.3744z" fill="#000000" p-id="6205"></path>
  </svg>
 <div class="location-text">天津市津南区<el-icon><ArrowDown /></el-icon></div>
</div>
 <!-- search部分 -->
<div class="search">
    <el-input type="text" style="margin:10px,10px" placeholder="搜索饿了么商家名称" v-model="searchContent"/>
    <el-button style="background-color:#47ade8;color: #fff;" @click="search(searchContent)">搜素</el-button>
</div>
</header>
 <div class="wrapper">
 <!-- header部分 -->
 
 <!-- 点餐分类部分 -->
 <ul class="foodtype">
 <li @click="toBusinessList(1)">
 <img src="@/assets/dcfl01.png">
 <p>美食</p>
 </li>
 <li @click="toBusinessList(2)">
 <img src="@/assets/dcfl02.png">
 <p>早餐</p>
 </li>
 <li @click="toBusinessList(3)">
 <img src="@/assets/dcfl03.png">
 <p>跑腿代购</p>
 </li>
 <li @click="toBusinessList(4)">
 <img src="@/assets/dcfl04.png">
 <p>汉堡披萨</p>
 </li>
 <li @click="toBusinessList(5)">
 <img src="@/assets/dcfl05.png">
 <p>甜品饮品</p>
 </li>
 <li @click="toBusinessList(6)">
 <img src="@/assets/dcfl06.png">
 <p>速食简餐</p>
 </li>
 <li @click="toBusinessList(7)">
 <img src="@/assets/dcfl07.png">
 <p>地方小吃</p>
 </li>
 <li @click="toBusinessList(8)">
 <img src="@/assets/dcfl08.png">
 <p>米粉面馆</p>
 </li>
 <li @click="toBusinessList(9)">
 <img src="@/assets/dcfl09.png">
 <p>包子粥铺</p>
 </li>
 <li @click="toBusinessList(10)">
 <img src="@/assets/dcfl10.png">
 <p>炸鸡炸串</p>
 </li>
 </ul>
 <!-- 横幅广告部分（注意：此处有背景图片） -->
 <div class="banner">
 <h3>品质套餐</h3>
 <p>搭配齐全吃得好</p>
 <a>立即抢购 &gt;</a>
 </div>
 <!-- 超级会员部分 -->
 <div class="supermember">
 <div class="left">
 <img src="@/assets/super_member.png">
 <h3>超级会员</h3>
 <p>&#8226; 每月享超值权益</p>
 </div>
 <div class="right">
 立即开通 &gt;
 </div>
 </div>
 <!-- 推荐商家部分 -->
 <div class="recommend">
 <div class="recommend-line"></div>
 <p>推荐商家</p>
 <div class="recommend-line"></div>
 </div>
 <!-- 推荐方式部分 -->
 <!-- <ul class="recommendtype">
 <li>综合排序<i class="fa fa-caret-down"></i></li>
 <li>距离最近</li>
 <li>销量最高</li>
 <li>筛选<i class="fa fa-filter"></i></li>
 </ul> -->
 <div class="menu-container">
 <el-menu 
 class="recommendtype"
 :default-active="selectedSort"
 @select="onSortSelect"
 >
  <el-menu-item index='0'>好评排序</el-menu-item>
  <el-menu-item index='1'>销量排序</el-menu-item>
  <el-menu-item index='2'>配送费排序</el-menu-item>
  <el-menu-item index='3'>起送费排序</el-menu-item>
 </el-menu>
</div>
 <!-- 推荐商家列表部分 -->
 <ul class="business">
 <!-- <li>
 <img src="@/assets/sj01.png">
 <div class="business-info">
 <div class="business-info-h">
 <h3>万家饺子（软件园E18店）</h3>
 <div class="business-info-like">&#8226;</div>
 </div>
 <div class="business-info-star">
 <div class="business-info-star-left">
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <p>4.9 月售345单</p>
 </div>
 <div class="business-info-star-right">
 蜂鸟专送
 </div>
 </div>
 <div class="business-info-delivery">
 <p>&#165;15起送 | &#165;3配送</p>
 <p>3.22km | 30分钟</p>
 </div>
 <div class="business-info-explain">
 <div>各种饺子</div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">新</div>
 <p>饿了么新用户首单立减9元</p>
 </div>
 <div class="business-info-promotion-right">
 <p>2个活动</p>
 <i class="fa fa-caret-down"></i>
 </div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon" style="background-color: #F1884F;">特</div>
 <p>特价商品5元起</p>
 </div>
 </div>
 </div>
 </li>
 <li>
 <img src="@/assets/sj02.png">
 <div class="business-info">
 <div class="business-info-h">
 <h3>小锅饭豆腐馆（全运店）</h3>
 <div class="business-info-like">&#8226;</div>
 </div>
 <div class="business-info-star">
 <div class="business-info-star-left">
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <p>4.9 月售345单</p>
 </div>
 <div class="business-info-star-right">
 蜂鸟专送
 </div>
 </div>
 <div class="business-info-delivery">
 <p>&#165;15起送 | &#165;3配送</p>
 <p>3.22km | 30分钟</p>
 </div>
 <div class="business-info-explain">
 <div>各种饺子</div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">新</div>
 <p>饿了么新用户首单立减9元</p>
 </div>
 <div class="business-info-promotion-right">
 <p>2个活动</p>
 <i class="fa fa-caret-down"></i>
 </div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">特</div>
 <p>特价商品5元起</p>
 </div>
 </div>
 </div>
 </li>
 <li>
 <img src="@/assets/sj03.png">
 <div class="business-info">
 <div class="business-info-h">
 <h3>麦当劳麦乐送（全运路店）</h3>
 <div class="business-info-like">&#8226;</div>
 </div>
 <div class="business-info-star">
 <div class="business-info-star-left">
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <p>4.9 月售345单</p>
 </div>
 <div class="business-info-star-right">
 蜂鸟专送
 </div>
 </div>
 <div class="business-info-delivery">
 <p>&#165;15起送 | &#165;3配送</p>
 <p>3.22km | 30分钟</p>
 </div>
 <div class="business-info-explain">
 <div>各种饺子</div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">新</div>
 <p>饿了么新用户首单立减9元</p>
 </div>
 <div class="business-info-promotion-right">
 <p>2个活动</p>
 <i class="fa fa-caret-down"></i>
 </div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">特</div>
 <p>特价商品5元起</p>
 </div>
 </div>
 </div>
 </li>
 <li>
 <img src="@/assets/sj04.png">
 <div class="business-info">
 <div class="business-info-h">
 <h3>米村拌饭（浑南店）</h3>
 <div class="business-info-like">&#8226;</div>
 </div>
 <div class="business-info-star">
 <div class="business-info-star-left">
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <p>4.9 月售345单</p>
 </div>
 <div class="business-info-star-right">
 蜂鸟专送
 </div>
 </div>
 <div class="business-info-delivery">
 <p>&#165;15起送 | &#165;3配送</p>
 <p>3.22km | 30分钟</p>
 </div>
 <div class="business-info-explain">
 <div>各种饺子</div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">新</div>
 <p>饿了么新用户首单立减9元</p>
 </div>
 <div class="business-info-promotion-right">
 <p>2个活动</p>
 <i class="fa fa-caret-down"></i>
 </div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">特</div>
 <p>特价商品5元起</p>
 </div>
 </div>
 </div>
 </li> -->
 <!-- <li>
 <img src="@/assets/sj05.png">
 <div class="business-info">
 <div class="business-info-h">
 <h3>申记串道（中海康城店）</h3>
 <div class="business-info-like">&#8226;</div>
 </div>
 <div class="business-info-star">
 <div class="business-info-star-left">
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <p>4.9 月售345单</p>
 </div>
 <div class="business-info-star-right">
 蜂鸟专送
 </div>
 </div>
 <div class="business-info-delivery">
 <p>&#165;15起送 | &#165;3配送</p>
 <p>3.22km | 30分钟</p>
 </div>
 <div class="business-info-explain">
 <div>各种饺子</div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">新</div>
 <p>饿了么新用户首单立减9元</p>
 </div>
 <div class="business-info-promotion-right">
 <p>2个活动</p>
 <i class="fa fa-caret-down"></i>
 </div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">特</div>
 <p>特价商品5元起</p>
 </div>
 </div>
 </div>
 </li> -->
<li v-for="dish in dishes" :key="dish.bussinessId" @click="toBusinessInfo(dish.businessId)">
 <img :src="dish.businessImg">
 <div class="business-info">
 <div class="business-info-h">
 <h3>{{dish.businessName}}</h3>
 <div class="business-info-like">&#8226;</div>
 </div>
 <div class="business-info-star">
 <div class="business-info-star-left">
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <i class="fa fa-star"></i>
 <p>{{dish.rating}} 月售{{ dish.totalSales }}单</p>
 </div>
 <div class="business-info-star-right">
 蜂鸟专送
 </div>
 </div>
 <div class="business-info-delivery">
 <p>￥{{ dish.starPrice }}起送 | ￥{{ dish.deliveryPrice}}配送</p>
 <p>3.22km | 30分钟</p>
 </div>
 <div class="business-info-explain">
 <div>{{ dish.businessExplain }}</div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">新</div>
 <p>饿了么新用户首单立减9元</p>
 </div>
 <div class="business-info-promotion-right">
 <p>2个活动</p>
 <i class="fa fa-caret-down"></i>
 </div>
 </div>
 <div class="business-info-promotion">
 <div class="business-info-promotion-left">
 <div class="business-info-promotion-left-incon">特</div>
 <p>特价商品5元起</p>
 </div>
 </div>
 </div>
</li>
 </ul>
 </div>
  <!-- 底部菜单部分 -->
  <Footer></Footer>
</template>
<script setup>
 //导入共通组件
 import Footer from '@/components/PageFooter.vue';
 import { ref,onMounted } from 'vue'
 import { useRouter } from 'vue-router'
 import { getBusinessFuzzy,getBusinessList } from '@/api/dishes'
 import { ArrowDown } from '@element-plus/icons-vue'

 const router = useRouter()
 const searchContent = ref('')
 const selectedSort = ref('0');
 const onSortSelect = async(index) => { 
    selectedSort.value = index 
    const res = await getBusinessList({order:selectedSort.value})
    dishes.value = res.data.data 
  };
 const search = (keyword) => {
 const params = { businessFuzzy: keyword || '' }
  getBusinessFuzzy(params)
}
const toBusinessList = (index) =>{
  router.push({ path: '/businessList', query: { index: index } });

}
// const dishes = ref([
//   {
//     bussinessId:1007,
//     bussinessName:'米村',
//     bussinessAddress:'沈阳',
//     bussinessExplain:'套餐拌饭',
//     bussinessImg:'@/assets/sj04.png',
//     starPrice:15,
//     deliveryPrice:3,
//     packAmount:1,
//     status:1,
//     remarks:'营业时间',
//     rating:5,
//     totalSales:0
//   }
//  ])
const dishes = ref([])
const toBusinessInfo = (businessId) => {
  router.push({ path: '/businessInfo', query: { businessId: businessId } });
} 
onMounted(async () => {
  const res = await getBusinessList({order:selectedSort.value})
  dishes.value = res.data.data  
})
</script>

<style scoped>
 /****************** 总容器 ******************/
 .wrapper {
 width: 100vw;
 min-height: 100vh;
 overflow-y: auto;
 }
 /****************** header ******************/
 header {
 width: 100vw;
 height: 30vw;
 background:linear-gradient(rgba(255, 255, 255, 0.3), rgba(16, 149, 244, 0.3)),
 url(@/assets/tju.png);
 /* background-position: center -30px; */
 background-repeat: no-repeat;
 background-size: cover;
 position: fixed;
 left: 0;
 top: 0;
  /*保证在最上层*/
  z-index: 1000;
 }
 header .icon-location-box {
 margin: 0 1vw 0 3vw;
 padding-top:25px;
 display: flex;
 gap:5px;
 align-items:center;
 }
 header .location-text {
 font-size: 4.5vw;
 font-weight: 700;
 display: flex;
 align-content: center;
 justify-content: center;


 }
 /****************** search ******************/
 header .search {
  display:flex;
  margin:10px auto;
  width:90%;
  border-radius: 20px;
 }
 /****************** 点餐分类部分 ******************/
 .wrapper .foodtype {
 width: 100vw;
 height: 48vw;
 margin-top: 28vw;
 display: flex;
 flex-wrap: wrap;
 justify-content: space-around;
 /*要使用align-content。10个子元素将自动换行为两行，而且两行作为一个整体垂直居中*/
 align-content: center;
 }
 .wrapper .foodtype li {
 /*一共10个子元素，通过计算，子元素宽度在16.7 ~ 20 之间，才能保证换两行*/
 width: 18vw;
 height: 20vw;
 display: flex;
 /*弹性盒子主轴方向设为column，然后仍然是垂直水平方向居中*/
 flex-direction: column;
 justify-content: center;
 align-items: center;
 user-select: none;
 cursor: pointer;
 }
 .wrapper .foodtype li img {
 width: 12vw;
 /*视频讲解时高度设置为12vw，实际上设置为10.3vw更佳*/
 height: 10.3vw;
 }
 .wrapper .foodtype li p {
 font-size: 3.2vw;
 color: #666;
 }
 /****************** 横幅广告部分 ******************/
 .wrapper .banner {
 /**
 * 设置容器宽度95%，然后水平居中，这样两边留白; 
 * 这里不能用padding，因为背景图片也会覆盖padding
 */
 width: 95vw;
 margin: 0 auto;
 height: 29vw;
 /*此三个样式组合，可以保证背景图片充满整个容器*/
 background-image: url(@/assets/index_banner.png);
 background-repeat: no-repeat;
 background-size: cover;
 box-sizing: border-box;
 padding: 2vw 6vw;
 }
 .wrapper .banner h3 {
 font-size: 4.2vw;
 margin-bottom: 1.2vw;
 }
 .wrapper .banner p {
 font-size: 3.4vw;
 color: #666;
 margin-bottom: 2.4vw;
 }
 .wrapper .banner a {
 font-size: 3vw;
 color: #C79060;
 font-weight: 700;
 }
 /****************** 超级会员部分 ******************/
 .wrapper .supermember {
 /*这里也设置容器宽度95%，不能用padding，因为背景色也会充满padding*/
 width: 95%;
 margin: 0 auto;
 height: 11.5vw;
 background-color: #FEEDC1;
 margin-top: 1.3vw;
 border-radius: 2px;
 color: #644F1B;
 display: flex;
 justify-content: space-between;
 align-items: center;
 box-sizing: border-box;
 }
 .wrapper .supermember .left {
 display: flex;
 align-items: center;
 margin-left: 4vw;
 user-select: none;
 }
 .wrapper .supermember .left img {
 width: 6vw;
 height: 6vw;
 margin-right: 2vw;
 }
 .wrapper .supermember .left h3 {
 font-size: 4vw;
 margin-right: 2vw;
 }
 .wrapper .supermember .left p {
 font-size: 3vw;
 }
 .wrapper .supermember .right {
 font-size: 3vw;
 margin-right: 4vw;
 cursor: pointer;
 }
 /****************** 推荐商家部分 ******************/
 .wrapper .recommend {
 width: 100%;
 height: 14vw;
 display: flex;
 justify-content: center;
 align-items: center;
 margin-bottom: 1vw;
 }
 .wrapper .recommend .recommend-line {
 width: 6vw;
 height: 0.2vw;
 background-color: #888;
 }
 .wrapper .recommend p {
 font-size: 4vw;
 margin: 0 4vw;
 }
 /****************** 推荐方式部分 ******************/
 .menu-container{
  width:100vw;
 

 }
 .wrapper .recommendtype {
 width: 100%;
 height: 3vw;
 margin-bottom: 5vw;
 display: flex;
 justify-content: space-around;
 align-items: center;

 
 }

 .wrapper .recommendtype .el-menu-item{
  /* background-color: red;
  border: 1px solid black; */
  padding: 0;
  margin:0;
  background-color: #fff !important;


 }

 /****************** 推荐商家列表部分 ******************/
 .wrapper .business {
 width: 100%;
 margin-bottom: 14vw;
 }
 .wrapper .business li {
 width: 100%;
 box-sizing: border-box;
 padding: 2.5vw;
 user-select: none;
 border-bottom: solid 1px #DDD;
 display: flex;
 }
 .wrapper .business li img {
 width: 18vw;
 height: 18vw;
 }
 .wrapper .business li .business-info {
 width: 100%;
 box-sizing: border-box;
 padding-left: 3vw;
 }
 .wrapper .business li .business-info .business-info-h {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 2vw;
 }
 .wrapper .business li .business-info .business-info-h h3 {
 font-size: 4vw;
 color: #333;
 }
 .wrapper .business li .business-info .business-info-h .business-info-like {
 width: 1.6vw;
 height: 3.4vw;
 background-color: #666;
 color: #fff;
 font-size: 4vw;
 margin-right: 4vw;
 display: flex;
 justify-content: center;
 align-items: center;
 }
 .wrapper .business li .business-info .business-info-star {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 2vw;
 font-size: 3.1vw;
 }
 .wrapper .business li .business-info .business-info-star .business-info-star-left {
 display: flex;
 align-items: center;
 }
 .wrapper .business li .business-info .business-info-star .business-info-star-left .fa-star {
 color: #FEC80E;
 margin-right: 0.5vw;
 }
 .wrapper .business li .business-info .business-info-star .business-info-star-left p {
 color: #666;
 margin-left: 1vw;
 }
 .wrapper .business li .business-info .business-info-star .business-info-star-right {
 background-color: #0097FF;
 color: #fff;
 font-size: 2.4vw;
 border-radius: 2px;
 padding: 0 0.6vw;
 }
 .wrapper .business li .business-info .business-info-delivery {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 2vw;
 color: #666;
 font-size: 3.1vw;
 }
 .wrapper .business li .business-info .business-info-explain {
 display: flex;
 align-items: center;
 margin-bottom: 3vw;
 }
 .wrapper .business li .business-info .business-info-explain div {
 border: solid 1px #DDD;
 font-size: 2.8vw;
 color: #666;
 border-radius: 3px;
 padding: 0 0.1vw;
 }
 .wrapper .business li .business-info .business-info-promotion {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 1.8vw;
 }
 .wrapper .business li .business-info .business-info-promotion .business-info-promotion-left
{
 display: flex;
 align-items: center;
 }
 .wrapper .business li .business-info .business-info-promotion .business-info-promotion-left
.business-info-promotion-left-incon {
 width: 4vw;
 height: 4vw;
 background-color: #70BC46;
 border-radius: 3px;
 font-size: 3vw;
 color: #fff;
 display: flex;
 justify-content: center;
 align-items: center;
 }
 .wrapper .business li .business-info .business-info-promotion .business-info-promotion-left
p {
 color: #666;
 font-size: 3vw;
 margin-left: 2vw;
 }
 .wrapper .business li .business-info .business-info-promotion .business-info-promotion-right
{
 display: flex;
 align-items: center;
 font-size: 2.5vw;
 color: #999;
 }
 .wrapper .business li .business-info .business-info-promotion .business-info-promotion-right
p {
 margin-right: 2vw;
 }
</style>