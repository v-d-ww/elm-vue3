<template>
  <div class="wrapper">
    <header>
      <p>积分商城</p>
    </header>

    <div class="points-page">
      <el-row :gutter="12" class="summary-row">
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="metric-label">当前总积分</div>
            <div class="metric-value">{{ balance.total }}</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="metric-label">今日到期</div>
            <div class="metric-value warning">{{ balance.expiringToday }}</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="metric-label">可用批次</div>
            <div class="metric-value">{{ buckets.length }}</div>
          </el-card>
        </el-col>
      </el-row>

      <el-card shadow="never" class="section-card">
        <template #header>分批到期</template>
        <el-table :data="buckets" size="small" style="width: 100%">
          <el-table-column prop="expiresAt" label="到期时间" width="140" />
          <el-table-column prop="amount" label="积分数额" width="120" />
          <el-table-column label="状态">
            <template #default="{ row }">
              <el-tag :type="row.isToday ? 'warning' : 'info'">
                {{ row.isToday ? '今日到期' : '未到期' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>积分流水</template>
        <el-table :data="ledger" size="small" style="width: 100%">
          <el-table-column prop="createdAt" label="时间" width="160" />
          <el-table-column prop="source" label="来源/用途" width="160" />
          <el-table-column prop="change" label="变动">
            <template #default="{ row }">
              <span :class="row.change >= 0 ? 'pos' : 'neg'">
                {{ row.change >= 0 ? '+' : '' }}{{ row.change }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="expiresAt" label="到期" width="140" />
          <el-table-column prop="remark" label="备注" />
        </el-table>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>积分商品</template>
        <el-row :gutter="12" class="product-row">
            <el-col v-for="item in products" :key="item.id" :span="24">
              <el-card shadow="hover" class="product-card">
                <img class="product-img" :src="item.img" :alt="item.name" />
                <div class="product-body">
                  <div class="product-title">{{ item.name }}</div>
                  <div class="product-desc">{{ item.desc }}</div>
                  <div class="product-meta">
                    <span>所需积分：{{ item.needPoints }}</span>
                    <span>库存：{{ item.stock }}</span>
                  </div>
                  <div class="product-meta">
                    <span>个人限购：{{ item.perUserLimit || '不限' }}</span>
                    <span>总限购：{{ item.totalLimit || '不限' }}</span>
                  </div>
                  <div v-if="item.flashWindow" class="flash-meta">
                    限时：{{ item.flashWindow }}
                  </div>
                  <div class="product-right">
                    <div class="points-tag">{{ item.needPoints }} 积分</div>
                    <el-button
                      type="primary"
                      size="large"
                      :disabled="isProductDisabled(item)"
                      @click="redeem(item)"
                    >
                      兑换
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
        </el-row>
      </el-card>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Footer from '@/components/PageFooter.vue'


// 默认数据
const defaultLedger = [
  { createdAt: '2025-01-07 10:30', source: '下单返积分', change: 200, expiresAt: '2025-02-01', remark: '订单 #20250107' },
  { createdAt: '2025-01-06 12:00', source: '积分兑换', change: -100, expiresAt: '2025-02-01', remark: '兑换优惠券' },
  { createdAt: '2025-01-05 09:10', source: '活动奖励', change: 180, expiresAt: '2025-02-01', remark: '签到奖励' }
]

const balance = ref({
  total: 1280,
  expiringToday: 120
})

const buckets = ref([
  { amount: 120, expiresAt: '2025-01-08', isToday: true },
  { amount: 300, expiresAt: '2025-01-10', isToday: false },
  { amount: 860, expiresAt: '2025-02-01', isToday: false }
])

const ledger = ref([])

const products = ref([
  {
    id: 1,
    name: '招牌麻辣香锅（小份）',
    desc: '含虾滑/藕片/菌菇，微辣可选',
    needPoints: 320,
    stock: 15,
    perUserLimit: 1,
    totalLimit: 80,
    userBought: 0,
    sold: 20,
    flashWindow: '每日 17:00-20:00',
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=80'
  },
  {
    id: 2,
    name: '酸菜鱼饭套餐',
    desc: '青花椒酸菜鱼 + 米饭 + 小菜',
    needPoints: 280,
    stock: 25,
    perUserLimit: 2,
    totalLimit: 120,
    userBought: 2, // 示例：已达个人限购
    sold: 40,
    flashWindow: '工作日 11:00-14:00',
    img: 'https://images.unsplash.com/photo-1604908177453-7462950a6eae?w=300&q=80'
  },
  {
    id: 3,
    name: '红烧牛肉面双人份',
    desc: '含卤蛋+青菜，可加辣',
    needPoints: 360,
    stock: 0,
    perUserLimit: 1,
    totalLimit: 60,
    userBought: 0,
    sold: 60, // 示例：已售罄
    flashWindow: '限时抢兑：18:00-20:00',
    img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80'
  }
])

const isProductDisabled = (item) => {
  // 示例：库存为 0，或达到个人限购 / 总限购 时禁用
  const noStock = item.stock <= 0
  const reachUserLimit = item.perUserLimit && item.userBought >= item.perUserLimit
  const reachTotalLimit = item.totalLimit && item.sold >= item.totalLimit
  return noStock || reachUserLimit || reachTotalLimit
}

const loadPointsFromCache = () => {
  const cachedBalance = Number(localStorage.getItem('pointsBalance') || NaN)
  const cachedLedger = JSON.parse(localStorage.getItem('pointsLedger') || '[]')
  balance.value.total = Number.isNaN(cachedBalance) ? balance.value.total : cachedBalance
  ledger.value = Array.isArray(cachedLedger) && cachedLedger.length ? cachedLedger : defaultLedger
}

onMounted(() => {
  loadPointsFromCache()
})

const redeem = (item) => {
  if (isProductDisabled(item)) {
    ElMessage.warning('当前商品不可兑换')
    return
  }
  // 模拟下单：扣库存、累计个人/总购买、扣积分、记录流水
  item.stock = Math.max(0, item.stock - 1)
  item.userBought = (item.userBought || 0) + 1
  item.sold = (item.sold || 0) + 1
  balance.value.total = Math.max(0, balance.value.total - item.needPoints)
  const entry = {
    createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    source: '积分兑换',
    change: -item.needPoints,
    expiresAt: '—',
    remark: `兑换：${item.name}`
  }
  ledger.value.unshift(entry)
  localStorage.setItem('pointsBalance', balance.value.total.toString())
  localStorage.setItem('pointsLedger', JSON.stringify(ledger.value))
  ElMessage.success(`兑换成功：${item.name}`)
}
</script>

<style scoped>
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
.points-page {
  margin-top: 12vw;
  padding: 12px;
}
.summary-row {
  margin-bottom: 12px;
}
.metric-label {
  font-size: 13px;
  color: #666;
}
.metric-value {
  font-size: 26px;
  font-weight: 600;
  margin-top: 4px;
}
.metric-value.warning {
  color: #e6a23c;
}
.section-card {
  margin-bottom: 12px;
}
.product-card {
  min-height: 140px;
  border-radius: 12px;
}
:deep(.product-card .el-card__body) {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
}
.product-img {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}
.product-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.product-title {
  font-weight: 600;
  margin-bottom: 4px;
}
.product-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}
.product-meta,
.flash-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}
.product-row .el-col {
  margin-bottom: 10px;
}
.product-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}
.points-tag {
  padding: 6px 10px;
  background: #ecf5ff;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 8px;
  font-weight: 600;
}
.pos {
  color: #67c23a;
  font-weight: 600;
}
.neg {
  color: #f56c6c;
  font-weight: 600;
}
</style>

