<template>
  <div class="wrapper">
  <div class="mine-page">
    <div class="mine-header">
      <img class="mine-avatar" src="https://avatars.githubusercontent.com/u/998733847?v=4" alt="头像">
      <span class="mine-username">{{ userName }}</span>
      <button class="mine-account-btn" @click="logout">退出登录</button>
    </div>
    <!-- 资产、红包、券 区块 -->
    <div class="mine-assets-card">
      <div class="mine-asset-item">
        <i class="fa fa-archive"></i>
        <div>我的资产</div>
      </div>
      <div class="mine-asset-item middle">
        <i class="fa fa-envelope" style="color:#F56C6C;"></i>
        <div class="highlight">红包</div>
        <div class="desc">查看我的红包</div>
      </div>
      <div class="mine-asset-item">
        <i class="fa fa-ticket" style="color:#F39800;"></i>
        <div class="highlight">券包</div>
        <div class="desc">查看我的券</div>
      </div>
    </div>
    <!-- 其他菜单 -->
    <div class="mine-menu-card" @click="goAddress">
      <div class="mine-menu-item">
        <i class="fa fa-map-marker"></i>
        <span>我的地址</span>
      </div>
      <div class="mine-menu-item">
        <i class="fa fa-headphones"></i>
        <span>我的客服</span>
      </div>
      <div class="mine-menu-item">
        <i class="fa fa-info-circle"></i>
        <span>关于饿了么</span>
      </div>
      <div class="mine-menu-item">
        <i class="fa fa-user-secret"></i>
        <span>用户隐私</span>
      </div>
    </div>
    
  </div>
  <!-- 底部菜单部分 -->
<Footer></Footer>
   </div>
</template>

<script setup>
import Footer from '@/components/PageFooter.vue'; 
import { useRouter} from 'vue-router'

const router = useRouter()
const goAddress = () =>{
  router.push('/userAddress')

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
  align-items: center;
  padding: 16px 12px 8px 12px;
  background: #fff;
  position: relative;
}
.mine-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 14px;
  background: #eaf4fa;
}
.mine-username {
  font-size: 28px;
  font-weight: bold;
  color: #222;
  letter-spacing: 2px;
  flex: 1;
}
.mine-account-btn {
  border: 1px solid #7ec6fd;
  background: #f9fcff;
  color: #409eff;
  border-radius: 18px;
  font-size: 14px;
  padding: 0 14px;
  line-height: 28px;
  margin-left: 6px;
  cursor: pointer;
}
.mine-assets-card {
  background: #fff;
  border-radius: 16px;
  margin: 14px 8px 0 8px;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  padding: 16px 0 8px 0;
}
.mine-asset-item {
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #444;
  padding: 0 4px;
  border-right: 1px solid #eee;
}
.mine-asset-item:last-child {
  border-right: none;
}
.mine-asset-item i {
  font-size: 28px;
  margin-bottom: 4px;
  display: block;
}
.mine-asset-item .highlight {
  font-weight: bold;
  color: #f56c6c;
  font-size: 18px;
}
.mine-asset-item.middle .highlight {
  color: #f56c6c;
}
.mine-asset-item .desc {
  font-size: 13px;
  color: #aaa;
}
.mine-menu-card {
  background: #fff;
  border-radius: 16px;
  margin: 16px 8px 0 8px;
  padding: 16px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.mine-menu-item {
  width: 25%;
  text-align: center;
  margin-bottom: 12px;
  color: #222;
}
.mine-menu-item i {
  font-size: 26px;
  margin-bottom: 6px;
  display: block;
  color: #444;
}
.mine-menu-item span {
  font-size: 15px;
}
</style>