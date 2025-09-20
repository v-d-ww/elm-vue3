<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>地址管理</p>
        </header>
        <!-- 地址列表部分 -->
        <ul class="addresslist">
            <li v-for="item in deliveryAddressArr" :key="item.daId">
                <div class="addresslist-left" @click="chooseAddress(item.daId)">
                    <h3>{{ item.contactName }}{{ sexFilter(item.contactSex) }} {{ item.contactTel }}</h3>
                    <p>{{ item.address }}</p>
                </div>
                <div class="addresslist-right">
                    <el-icon @click="editUserAddress(item.daId)"><Edit /></el-icon>
                    <el-icon @click="removeUserAddress(item.daId)"><Close /></el-icon>
                </div>
            </li>
        </ul>
        <!-- 新增地址部分 -->
        <div class="addbtn" @click="toAddUserAddress">
            <p>新增收货地址</p>
        </div>
        <!-- 底部菜单部分 -->
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '@/components/PageFooter.vue';
import { ref,onMounted } from 'vue'
// import { useUserStore } from '@/stores/user.js'
import { useRouter,useRoute } from 'vue-router'
import { ElMessage,ElMessageBox } from 'element-plus'
import { Edit,Close } from '@element-plus/icons-vue'
import { istDeliveryAddressByUserId,removeDeliveryAddress } from '@/api/user'

// const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const deliveryAddressArr = ref([])

// const deliveryAddressArr = ref([
//   {
//     address: '上海市浦东新区世纪大道100号',
//     contactName: '张三',
//     contactSex: '1',
//     contactTel: '13800138000'
//   },
//   {
//     address: '北京市朝阳区建国路88号',
//     contactName: '李四',
//     contactSex: '0',
//     contactTel: '13900139000'
//   },
//   {
//     address: '广州市天河区体育东路66号',
//     contactName: '王五',
//     contactSex: '1',
//     contactTel: '13700137000'
//   },
//   {
//     address: '杭州市西湖区文三路188号',
//     contactName: '赵六',
//     contactSex: '0',
//     contactTel: '13600136000'
//   }
// ])

const businessId = route.query.businessId
const isChoose = route.query.isChoose === 'true'
const chooseAddress =(daId)=>{
    if(isChoose){
        router.push({ path:'/orders', query: { businessId: businessId,daId: daId }});
    }
}
onMounted(async()=>{
    const res = await istDeliveryAddressByUserId()
    deliveryAddressArr.value = res.data.data
})
const editUserAddress = (daId) => {
    router.push({path:'/EditUserAddress',query: { businessId: businessId,daId:daId,isEdit:true }})
}
const toAddUserAddress = () => {
    router.push({ path: '/EditUserAddress', query: { businessId: businessId,isEdit:false } });
}
const removeUserAddress = async (daId) => {
    try{
        await ElMessageBox.confirm(
            '确定要删除这个地址吗？',
            {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning',
            }
        )
        await removeDeliveryAddress(daId)
        const res = await istDeliveryAddressByUserId()
        deliveryAddressArr.value = res.data.data
        ElMessage.success('删除成功')
    }catch{
        ElMessage.info('取消删除')

    }
    
}

const sexFilter =(value) => {
    return value == 1 ? '先生' : '女士';
}      
    

</script>

<style scoped>
/*************** 总容器 ***************/
.wrapper {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
}

/*************** header ***************/
.wrapper header {
    width: 100%;
    height: 12vw;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #000;
    font-size: 4.8vw;
    font-weight: 600;
    position: fixed;
    left: 0;
    top: 0;
    /*保证在最上层*/
    z-index: 1000;
    border-bottom: solid 1px #DDD;
}

/*************** addresslist ***************/
.wrapper .addresslist {
    width: 100%;
    margin-top: 12vw;
    background-color: #fff;
}

.wrapper .addresslist li {
    width: 100%;
    box-sizing: border-box;
    border-top: solid 1px #DDD;
    padding: 3vw;
    display: flex;
}

.wrapper .addresslist li .addresslist-left {
    flex: 5;
    /*左边这块区域是可以点击的*/
    user-select: none;
    cursor: pointer;
}

.wrapper .addresslist li .addresslist-left h3 {
    font-size: 4.6vw;
    font-weight: 500;
    color: #666;
}

.wrapper .addresslist li .addresslist-left p {
    font-size: 3vw;
    color: #666;
}

.wrapper .addresslist li .addresslist-right {
    flex: 1;
    font-size: 5.6vw;
    color: #999;
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

/*************** 新增地址部分 ***************/
.wrapper .addbtn {
    width: 100%;
    height: 14vw;
    border-top: solid 1px #DDD;
    border-bottom: solid 1px #DDD;
    background-color: #fff;
    margin-top: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.5vw;
    color: #0097FF;
    user-select: none;
    cursor: pointer;
}

.wrapper .addbtn p {
    margin-left: 2vw;
}
</style>