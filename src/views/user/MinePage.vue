<template>
  <div class="wrapper">
  <div class="mine-page">
    <div class="mine-header">
      <img class="mine-avatar" :src="userStore.userImg">
      <div>
        <div class="mine-username">{{ userStore.userName }}</div>
        <div class="mine-email">邮箱：{{ userStore.userEmail }}</div>
      </div>
    </div>
    <!-- 资产、红包、券 区块 -->
    <div class="mine-assets-card">
      <div class="mine-asset-item" @click="goAddress">
        <el-icon :size="20"><Location/></el-icon>
        <div>我的地址</div>
      </div>
      <div class="mine-asset-item middle" @click="goOrders">
        <el-icon  :size="20"><ShoppingCart/></el-icon>
        <div>我的购物车</div>
      </div>
      <div class="mine-asset-item">
        <el-icon style="color: #f56c6c;" :size="20"><Ticket/></el-icon>
        <div>红包卡券</div>
      </div>
    </div>
    <!-- 其他菜单 -->
    <div class="mine-menu-card">
      
      <div
        class="mine-menu-item"
        v-for="item in menuItems"
        :key="item.label"
      >
        <div class="left">
          <el-icon style="color:#0588d4;"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </div>
        <el-icon style="height:20px;"><ArrowRight /></el-icon>
      </div>

    </div>
    <!-- 退出按钮 -->
    <button class="mine-account-btn" @click="logout">退出登录</button>
  </div>
  <!-- 底部菜单部分 -->
<Footer></Footer>
   </div>
</template>

<script setup>
import Footer from '@/components/PageFooter.vue'; 
import { useRouter} from 'vue-router'
import { useUserStore } from '@/stores/user';
import { ArrowRight, User, Bell, Setting, Headset, InfoFilled } from '@element-plus/icons-vue'
import { Location, ShoppingCart, Ticket } from '@element-plus/icons-vue'

const menuItems = [
  { label: '个人资料', icon: User },
  { label: '通知', icon: Bell },
  { label: '设置', icon: Setting },
  { label: '客服', icon: Headset },
  { label: '关于饿了么', icon: InfoFilled },
]
const userStore = useUserStore()

const router = useRouter()
const goAddress = () =>{
  router.push('/userAddress')

}

const logout = () =>{
  userStore.removeToken()
  router.push('/')
}
const goOrders = () =>{
  router.push('/orderList')

}
</script>

<style scoped>
.mine-page {
  background: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px;
}
.mine-header {
  display: flex;
  padding: 80px 12px 0 12px;
  height: 62vw;
  background: linear-gradient(to bottom, #0588d4, #f5f6f7);
  gap: 10px;
}
.mine-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 14px;
  background: #eaf4fa;
}
.mine-username {
  font-size: 24px;
  font-weight: bold;
  color: #222;
  letter-spacing: 2px;
  flex: 1;
}

.mine-email{
  color: #444;

}

/* 中间菜单 */
.mine-assets-card {
  z-index: 100;
  position: relative;
  background: #fff;
  border-radius: 16px;
  margin: 0px 8px 0 8px;
  transform: translateY(-120px); 
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  padding: 16px 0 8px 0;
}
.mine-asset-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #444;
  padding: 0 4px;
  border-right: 1px solid #eee;
}
.mine-asset-item:last-child {
  border-right: none;
}

.mine-asset-item .highlight {
  font-weight: bold;
  color: #f56c6c;
  font-size: 18px;
}



/* 其他菜单 */
.mine-menu-card {
  background: #fff;
  border-radius: 16px;
  margin: 0 auto;
  padding: 0;
  width:90%;
  /* display: flex;
  justify-content: space-around;
  flex-wrap: wrap; */
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  transform: translateY(-100px); 
}
.mine-menu-item {
  width: 100%;
  height:60px;
  /* line-height: 40px; */
  border-bottom: 1px #f5f5f5 solid ;
  padding: 10px 10px;
  margin:0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.mine-menu-item span {
  font-size: 15px;
}

.mine-menu-item .left{
  display: flex;
  gap:20px;
}
/* 按钮 */
.mine-account-btn {
  border: 1px solid #7ec6fd;
  background: #f9fcff;
  color: #409eff;
  border-radius: 18px;
  font-size: 14px;
  padding: 0 14px;
  line-height: 38px;
  height: 38px;
  margin: 0 auto;
  width:90%;
  display: block;
  transform: translateY(-60px); 
}
</style>