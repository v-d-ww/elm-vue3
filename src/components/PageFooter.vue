<template>
    <div class="wrapper">
    <el-menu
        :default-active="activeIndex"
        class="footer-menu"
        @select="handleSelect"
    >
        <el-menu-item index="index">
            <el-icon><House /></el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="orderList">
            <el-icon><Document /></el-icon>
            <span>订单</span>
        </el-menu-item>
        <el-menu-item index="mine">
            <el-icon><User /></el-icon>
            <span>我的</span>
        </el-menu-item>
    </el-menu>
</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { House, Document, User } from '@element-plus/icons-vue'
import { ref, watch,onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const activeIndex = ref('index')

onMounted(() => {
    const currentPath = route.path
    if (currentPath === '/' || currentPath === '/index') {
        activeIndex.value = 'index'
    } else if (currentPath === '/orderList') {
        activeIndex.value = 'orderList'
    } else if (currentPath === '/mine' || currentPath === '/userAddress') {
        activeIndex.value = 'mine'
    }
})
watch(() => route.path, (newPath) => {
    if (newPath === '/' || newPath === '/index') activeIndex.value = 'index'
    else if (newPath === '/orderList') activeIndex.value = 'orderList'
    else if (newPath === '/mine') activeIndex.value = 'mine'
})

const handleSelect = (index) => {
    router.push(`/${index}`)
}
</script>

<style scoped>
.wrapper{
    width: 100vw;
    margin:0;
    padding:0;
}
.footer-menu {
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 1000 !important;
    background: #f5f5f5 !important;
    border-top: 1px solid #e4e7ed !important;
    height: 60px !important;
    display: flex !important;
    justify-content:space-around !important
}

:deep(.footer-menu .el-menu-item) {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    /* padding: 8px 0 !important; */
    gap:1px !important;
    box-sizing: border-box;
    /* background-color: red; */
    padding: 6px 8px 8px 8px !important;
}

.footer-menu .el-menu-item span {
    font-size: 12px;
    margin-top:-4px;
}
</style>