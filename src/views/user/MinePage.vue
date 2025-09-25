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
        @click="handleMenuClick(item.label)"
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
   <!-- 个人资料编辑弹窗 -->
   <el-dialog
    v-model="editDialogVisible"
    title="编辑个人资料"
    width="90%"
    :before-close="handleClose"
  >
    <el-form :model="editForm">
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          accept="image/png,image/jpeg"
          :before-upload="beforeAvatarUpload"
          :on-change="handleAvatarChange"
        >
          <img v-if="editForm.userImg" :src="editForm.userImg" class="avatar">
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="editForm.userName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="editForm.userEmail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="editForm.userBrief" placeholder="个人简介空空如也哦"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProfile">保存</el-button>
      </span>
    </template>
  </el-dialog>
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
import {ref} from 'vue'
import { ElMessage } from 'element-plus'
import { updateUser } from '@/api/user'

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
  router.push({path:'/businessList',query:{index:1}})

}
const editDialogVisible = ref(false)
const editForm = ref({
  userName: '',
  userEmail: '',
  userImg: '',
  userBrief: '',
})

// 处理菜单点击
const handleMenuClick = (label) => {
  if (label === '个人资料') {
    openEditDialog()
  }
  // 其他菜单项的处理可以在这里添加
}

// 打开编辑弹窗
const openEditDialog = () => {
  editForm.value.userName = userStore.userName
  editForm.value.userEmail = userStore.userEmail
  editForm.value.userImg = userStore.userImg
  editForm.value.userBrief = userStore.userBrief
  editDialogVisible.value = true
}

// 关闭弹窗
const handleClose = () => {
  editDialogVisible.value = false
}
// 保存个人资料
const saveProfile = async () => {
  // 这里可以添加表单验证
  if (!editForm.value.userName.trim()) {
    ElMessage.warning('请输入用户名')
    return
  }
  if (!editForm.value.userEmail.trim()) {
    ElMessage.warning('请输入邮箱')
    return
  }
  
  // 更新用户信息到store
  userStore.updateUserInfo({
    userName: editForm.value.userName,
    userEmail: editForm.value.userEmail,
    userBrief: editForm.value.userBrief
  })
  await updateUser(editForm.value.userName,editForm.value.userEmail,editForm.value.userBrief)
  
  ElMessage.success('保存成功')
  editDialogVisible.value = false
}

// 头像上传成功（不走服务端，保留备用）
// const handleAvatarSuccess = (response, file) => {
//   editForm.value.userImg = URL.createObjectURL(file.raw)
// }

// 本地前置校验：仅 jpg/png 且 < 2MB
const beforeAvatarUpload = (file) => {
  const okType = ['image/jpeg','image/png'].includes(file.type)
  const okSize = file.size / 1024 / 1024 < 2
  if (!okType) ElMessage.error('仅支持 JPG/PNG 格式')
  if (!okSize) ElMessage.error('图片需小于 2MB')
  return okType && okSize
}

// 选择文件后直接本地预览
const handleAvatarChange = (file) => {
  if (!beforeAvatarUpload(file.raw)) return
  editForm.value.userImg = URL.createObjectURL(file.raw)
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
  padding: 0 10px;
  width:95%;
  box-sizing: border-box;
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
/* 让上传区域居中 */
.avatar-uploader {
  display: block;
  margin: 0 auto;
 
}

/* 上传内部也裁成圆形，避免方形边角露出 */
.avatar-uploader .el-upload {
  border-radius: 50%;
  overflow: hidden;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

</style>