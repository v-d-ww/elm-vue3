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
      <div class="mine-asset-item" @click="openRedPacket">
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

  <!-- 红包卡券弹窗 -->
  <el-dialog
    v-model="redPacketDialogVisible"
    width="90%"
    class="redpacket-dialog"
    :show-close="true"
  >
    <template #header>
      <div class="rp-header">我的红包</div>
    </template>
    <div class="rp-balance">
      <div class="rp-label">当前余额</div>
      <div class="rp-amount">￥{{ redPacket.balance.toFixed(2) }}</div>
      <div class="rp-frozen">冻结金额：￥{{ redPacket.frozen.toFixed(0) }}</div>
    </div>
    <div class="rp-actions">
      <el-button type="primary" plain @click="charge">充值</el-button>
      <el-button type="warning" @click="withdraw">提现</el-button>
    </div>
    <div class="rp-footer-link" @click="goTransactions">流水查询</div>
  </el-dialog>

  <!-- 充值弹窗 -->
  <el-dialog
    v-model="chargeDialogVisible"
    width="90%"
    class="charge-dialog"
    :show-close="true"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="charge-header">
        <span>充值金额</span>
      </div>
    </template>
    <div class="charge-content">
      <div class="charge-amount-section">
        <label class="charge-label">*充值金额</label>
        <div class="charge-input-wrapper">
          <el-input-number
            v-model="chargeForm.amount"
            :min="0.01"
            :step="1"
            :precision="2"
            controls-position="right"
            class="charge-input"
          />
        </div>
      </div>
      <div class="charge-payment-section">
        <div class="charge-payment-title">选择支付方式</div>
        <div class="charge-payment-options">
          <div 
            class="charge-payment-item" 
            :class="{ active: chargeForm.paymentMethod === 'alipay' }"
            @click="chargeForm.paymentMethod = 'alipay'"
          >
            <div class="payment-icon alipay-icon">支</div>
            <span>支付宝支付</span>
            <el-icon class="check-icon" :class="{ checked: chargeForm.paymentMethod === 'alipay' }">
              <Check />
            </el-icon>
          </div>
          <div 
            class="charge-payment-item" 
            :class="{ active: chargeForm.paymentMethod === 'wechat' }"
            @click="chargeForm.paymentMethod = 'wechat'"
          >
            <div class="payment-icon wechat-icon">✓</div>
            <span>微信支付</span>
            <el-icon class="check-icon" :class="{ checked: chargeForm.paymentMethod === 'wechat' }">
              <Check />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="charge-promotion">
        <el-icon><Check /></el-icon>
        <span>充值100元送100元</span>
      </div>
    </div>
    <template #footer>
      <el-button type="primary" class="charge-confirm-btn" @click="confirmCharge">确认充值</el-button>
    </template>
  </el-dialog>

  <!-- 提现弹窗 -->
  <el-dialog
    v-model="withdrawDialogVisible"
    width="90%"
    class="withdraw-dialog"
    :show-close="true"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="withdraw-header">
        <span>提现金额</span>
      </div>
    </template>
    <div class="withdraw-content">
      <div class="withdraw-balance-section">
        <div class="withdraw-balance-label">当前余额</div>
        <div class="withdraw-balance-amount">¥ {{ redPacket.balance.toFixed(2) }}</div>
      </div>
      <div class="withdraw-amount-section">
        <label class="withdraw-label">* 提现金额</label>
        <div class="withdraw-input-wrapper">
          <el-input-number
            v-model="withdrawForm.amount"
            :min="0.01"
            :max="redPacket.balance"
            :step="1"
            :precision="2"
            controls-position="right"
            class="withdraw-input"
          />
        </div>
      </div>
      <div class="withdraw-payment-section">
        <div class="withdraw-payment-title">选择收款方式</div>
        <div class="withdraw-payment-options">
          <div 
            class="withdraw-payment-item" 
            :class="{ active: withdrawForm.paymentMethod === 'alipay' }"
            @click="withdrawForm.paymentMethod = 'alipay'"
          >
            <div class="payment-icon alipay-icon">支</div>
            <span>支付宝</span>
            <el-icon class="check-icon" :class="{ checked: withdrawForm.paymentMethod === 'alipay' }">
              <Check />
            </el-icon>
          </div>
          <div 
            class="withdraw-payment-item" 
            :class="{ active: withdrawForm.paymentMethod === 'wechat' }"
            @click="withdrawForm.paymentMethod = 'wechat'"
          >
            <div class="payment-icon wechat-icon">✓</div>
            <span>微信</span>
            <el-icon class="check-icon" :class="{ checked: withdrawForm.paymentMethod === 'wechat' }">
              <Check />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="withdraw-fee-info">
        <el-icon><InfoFilled /></el-icon>
        <span>提现扣除10%的手续费</span>
      </div>
    </div>
    <template #footer>
      <el-button type="warning" class="withdraw-confirm-btn" @click="confirmWithdraw">确认提现</el-button>
    </template>
  </el-dialog>

  <!-- 交易流水弹窗 -->
  <el-dialog
    v-model="transactionDialogVisible"
    width="90%"
    class="transaction-dialog"
    :show-close="true"
  >
    <template #header>
      <div class="transaction-header">交易流水</div>
    </template>
    <div class="transaction-content">
      <div 
        class="transaction-item" 
        v-for="(item, index) in transactionList" 
        :key="index"
      >
        <div class="transaction-info">
          <div class="transaction-type">{{ item.type }}</div>
          <div class="transaction-date">{{ item.date }}</div>
        </div>
        <div class="transaction-amount" :class="item.amountClass">
          {{ item.amount }}
        </div>
        <div class="transaction-balance">余额:{{ item.balance }}</div>
      </div>
    </div>
    <template #footer>
      <el-button @click="transactionDialogVisible = false">关闭</el-button>
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
import { ArrowRight, User, Bell, Setting, Headset, InfoFilled, Check } from '@element-plus/icons-vue'
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

const redPacketDialogVisible = ref(false)
const redPacket = ref({
  balance: 1000,
  frozen: 68
})

// 充值弹窗
const chargeDialogVisible = ref(false)
const chargeForm = ref({
  amount: 1.00,
  paymentMethod: 'alipay' // alipay or wechat
})

// 提现弹窗
const withdrawDialogVisible = ref(false)
const withdrawForm = ref({
  amount: 1.00,
  paymentMethod: 'alipay' // alipay or wechat
})

// 交易流水弹窗
const transactionDialogVisible = ref(false)
const transactionList = ref([
  {
    type: '充值',
    date: '2024-12-20 10:30:25',
    amount: '+ ¥100.00',
    amountClass: 'positive',
    balance: '余额:¥1100.00'
  },
  {
    type: '消费',
    date: '2024-12-19 14:20:15',
    amount: '- ¥25.50',
    amountClass: 'negative',
    balance: '余额:¥1074.50'
  },
  {
    type: '充值',
    date: '2024-12-18 09:15:30',
    amount: '+ ¥50.00',
    amountClass: 'positive',
    balance: '余额:¥1100.00'
  },
  {
    type: '提现',
    date: '2024-12-17 16:45:20',
    amount: '- ¥75.80',
    amountClass: 'negative',
    balance: '余额:¥1050.00'
  },
  {
    type: '消费',
    date: '2024-12-16 12:10:45',
    amount: '- ¥32.00',
    amountClass: 'negative',
    balance: '余额:¥1025.00'
  }
])

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

const openRedPacket = () => {
  redPacketDialogVisible.value = true
}

const charge = () => {
  chargeForm.value.amount = 1.00
  chargeForm.value.paymentMethod = 'alipay'
  chargeDialogVisible.value = true
}

const confirmCharge = () => {
  if (!chargeForm.value.amount || chargeForm.value.amount <= 0) {
    ElMessage.warning('请输入充值金额')
    return
  }
  // 模拟充值成功
  redPacket.value.balance += chargeForm.value.amount
  // 如果充值100元，送100元
  if (chargeForm.value.amount >= 100) {
    redPacket.value.balance += 100
  }
  chargeDialogVisible.value = false
  redPacketDialogVisible.value = false
  ElMessage.success('充值成功！')
}

const withdraw = () => {
  withdrawForm.value.amount = 1.00
  withdrawForm.value.paymentMethod = 'alipay'
  withdrawDialogVisible.value = true
}

const confirmWithdraw = () => {
  if (!withdrawForm.value.amount || withdrawForm.value.amount <= 0) {
    ElMessage.warning('请输入提现金额')
    return
  }
  if (withdrawForm.value.amount > redPacket.value.balance) {
    ElMessage.warning('提现金额不能超过当前余额')
    return
  }
  // 计算手续费（10%）
  const fee = withdrawForm.value.amount * 0.1
  const actualAmount = withdrawForm.value.amount - fee
  // 模拟提现成功
  redPacket.value.balance -= withdrawForm.value.amount
  withdrawDialogVisible.value = false
  redPacketDialogVisible.value = false
  ElMessage.success(`提现成功！实际到账：¥${actualAmount.toFixed(2)}，手续费：¥${fee.toFixed(2)}`)
}

const goTransactions = () => {
  transactionDialogVisible.value = true
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
  cursor: pointer;
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

/* 红包弹窗 */
:deep(.redpacket-dialog .el-dialog__body) {
  padding: 12px 16px 20px 16px;
}
.rp-header {
  font-size: 18px;
  font-weight: 600;
}
.rp-balance {
  text-align: center;
  padding: 6px 0 12px 0;
}
.rp-label {
  color: #666;
  margin-bottom: 6px;
}
.rp-amount {
  font-size: 32px;
  font-weight: 700;
  color: #d06060;
  margin-bottom: 4px;
}
.rp-frozen {
  color: #777;
  font-size: 14px;
}
.rp-actions {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  gap: 10px;
}
.rp-actions .el-button {
  flex: 1;
  height: 44px;
}
.rp-footer-link {
  text-align: right;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
}
.rp-footer-link:hover {
  color: #409eff;
}

<<<<<<< HEAD
/* 充值弹窗样式 */
:deep(.charge-dialog .el-dialog__body) {
  padding: 16px;
}
.charge-header {
  font-size: 18px;
  font-weight: 600;
}
.charge-content {
  padding: 8px 0;
}
.charge-amount-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
}
.charge-label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}
.charge-label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 2px;
}
.charge-input-wrapper {
  flex: 1;
}
:deep(.charge-input .el-input__inner) {
  text-align: left;
}
.charge-payment-section {
  margin-bottom: 16px;
}
.charge-payment-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
}
.charge-payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.charge-payment-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  gap: 12px;
}
.charge-payment-item.active {
  border-color: #409eff;
  background-color: #f0f9ff;
}
.payment-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.alipay-icon {
  background-color: #1677ff;
}
.wechat-icon {
  background-color: #07c160;
}
.charge-payment-item span {
  flex: 1;
  font-size: 14px;
  color: #333;
}
.check-icon {
  width: 20px;
  height: 20px;
  color: #c0c4cc;
}
.check-icon.checked {
  color: #67c23a;
}
.charge-promotion {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f0f9ff;
  border-radius: 8px;
  gap: 8px;
  color: #333;
  font-size: 14px;
}
.charge-promotion .el-icon {
  color: #67c23a;
}
.charge-confirm-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
}

/* 提现弹窗样式 */
:deep(.withdraw-dialog .el-dialog__body) {
  padding: 16px;
}
.withdraw-header {
  font-size: 18px;
  font-weight: 600;
}
.withdraw-content {
  padding: 8px 0;
}
.withdraw-balance-section {
  text-align: left;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.withdraw-balance-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.withdraw-balance-amount {
  font-size: 24px;
  font-weight: 700;
  color: #f56c6c;
}
.withdraw-amount-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
}
.withdraw-label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}
.withdraw-label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 2px;
}
.withdraw-input-wrapper {
  flex: 1;
}
:deep(.withdraw-input .el-input__inner) {
  text-align: left;
}
.withdraw-payment-section {
  margin-bottom: 16px;
}
.withdraw-payment-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
}
.withdraw-payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.withdraw-payment-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  gap: 12px;
}
.withdraw-payment-item.active {
  border-color: #409eff;
  background-color: #f0f9ff;
}
.withdraw-payment-item span {
  flex: 1;
  font-size: 14px;
  color: #333;
}
.withdraw-fee-info {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #fff7e6;
  border-radius: 8px;
  gap: 8px;
  color: #333;
  font-size: 14px;
}
.withdraw-fee-info .el-icon {
  color: #fa8c16;
}
.withdraw-confirm-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  background-color: #d4a574;
  border-color: #d4a574;
}

/* 交易流水弹窗样式 */
:deep(.transaction-dialog .el-dialog__body) {
  padding: 16px;
  max-height: 60vh;
  overflow-y: auto;
}
.transaction-header {
  font-size: 18px;
  font-weight: 600;
}
.transaction-content {
  padding: 8px 0;
}
.transaction-item {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}
.transaction-item:last-child {
  border-bottom: none;
}
.transaction-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.transaction-type {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}
.transaction-date {
  font-size: 12px;
  color: #999;
}
.transaction-amount {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}
.transaction-amount.positive {
  color: #67c23a;
}
.transaction-amount.negative {
  color: #f56c6c;
}
.transaction-balance {
  font-size: 13px;
  color: #666;
}

</style>