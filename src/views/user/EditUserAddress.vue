<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>{{isEdit ? '编辑地址' : '新增地址' }} </p>
            <!-- <p>新增送货地址</p> -->
        </header>
        <!-- 表单部分 -->
        <!-- <ul class="form-box">
            <li>
                <div class="title">
                    联系人：
                </div>
                <div class="content">
                    <input type="text" v-model="deliveryAddress.contactName" placeholder="联系人姓名">
                </div>
            </li>
            <li>
                <div class="title">
                    性别：
                </div>
                <div class="content" style="font-size: 3vw;">
                    <input type="radio" v-model="deliveryAddress.contactSex" value="1" style="width:6vw;height:3.2vw;" checked>男
                    <input type="radio" v-model="deliveryAddress.contactSex" value="0" style="width:6vw;height:3.2vw;">女
                </div>
            </li>
            <li>
                <div class="title">
                    电话：
                </div>
                <div class="content">
                    <input type="tel" v-model="deliveryAddress.contactTel" placeholder="电话">
                </div>
            </li>
            <li>
                <div class="title">
                    收货地址：
                </div>
                <div class="content">
                    <input type="text" v-model="deliveryAddress.address" placeholder="收货地址">
                </div>
            </li>
        </ul> -->
        <div class="container">
        <el-form
            :model="deliveryAddress"
            ref="form"
            :rules="rules"
            class="form-box"
            label-position="right"
            label-width="70px"
        >
        <el-form-item label="地址" prop="address">
            <el-input size="large" v-model="deliveryAddress.address" placeholder="请输入收货地址"></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="contactName">
            <el-input size="large" v-model="deliveryAddress.contactName" placeholder="请输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="contactSex">
            <el-radio-group v-model="deliveryAddress.contactSex">
                <el-radio :label="1" border>男</el-radio>
                <el-radio :label="0" border>女</el-radio>
            </el-radio-group>
         
        </el-form-item>
        <el-form-item label="手机号" prop="contactTel">
            <el-input size="large" v-model="deliveryAddress.contactTel" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        </el-form>
        <div class="button-add">
            <!-- <v-if></v-if> -->
            <button @click="editUserAddress">确定</button>
        </div>
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'
// import { useUserStore } from '@/stores/user.js'
import { useRouter,useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { updateDeliveryAddress,getDeliveryAddressById,saveDeliveryAddress } from '@/api/user'

// const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const deliveryAddress = ref({
    address:'',
    contactName:'',
    contactSex:'1',
    contactTel:'',

})
// const deliveryAddress = ref([])
const form = ref()
// const businessId = route.query.businessId
// const isEdit = route.query.businessId
const isEdit = route.query.isEdit ==='true'
const daId = route.query.daId
const editUserAddress = async ()=>{
    if(isEdit){
        const res = await updateDeliveryAddress(deliveryAddress.value)  
     
        if(res?.data?.code === 200){
            ElMessage.success('保存成功')
            router.push('/userAddress')
    }

    }else{
        const res = await saveDeliveryAddress(deliveryAddress.value)
        if(res?.data?.code === 200){
            ElMessage.success('保存成功')
            router.push('/userAddress')
    }

    }
    
}
onMounted(async ()=>{
    if(isEdit){
        const res = await getDeliveryAddressById(daId)
        deliveryAddress.value = res.data.data
    }
    
})
const rules = {
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' },
  ],
  contactTel: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    {
      pattern: /^\d{10}$/,
      message: '手机号码格式错误',
      trigger: 'blur'
    }
  ],
  contactSex: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  contactName: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ]
}    
  
</script>
<style scoped>
/*************** 总容器 ***************/
.wrapper {
    width: 100%;
    height: 100%;
    /* background-color: #F5F5F5; */
}
/*************** header ***************/
.wrapper header {
    width: 100%;
    height: 12vw;
    background: #f5f5f5 !important;
    border-bottom: 1px solid #e4e7ed !important;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #000;
    font-size: 4.8vw;
    border-bottom: solid 1px #DDD;
}
/*************** （表单信息） ***************/
.wrapper .button-add {
    box-sizing: border-box;
    padding: 4vw 3vw 0vw 3vw;
}
.wrapper .button-add button {
    width: 100%;
    height: 10vw;
    font-size: 3.8vw;
    font-weight: 700;
    border: none;
    outline: none;
    border-radius: 4px;
    color: #fff;
    background-color: #47ade8;
}
.container{
    width: 100%;
    padding:25px 10px 20px 10px;
    background-color: #fff;
    box-sizing: border-box;
}
</style>