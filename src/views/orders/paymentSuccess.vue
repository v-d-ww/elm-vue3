<template>
  <div class="wrapper">
    <header>
      支付成功
    </header>
    <div class="successImg">
      <svg t="1758354486926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9480" width="200" height="200">
        <path d="M400.896 112.64h189.952c27.136 0 40.448 13.312 40.448 40.448 0 27.136-13.312 40.448-40.448 40.448H400.896c-27.136 0-40.448-13.312-40.448-40.448-0.512-27.136 13.312-40.448 40.448-40.448z" fill="#5AC8FF" p-id="9481"></path>
        <path d="M768.512 631.808c-79.36 0-142.848 63.488-142.848 142.848s63.488 145.408 142.848 145.408 142.848-63.488 142.848-142.848-63.488-145.408-142.848-145.408z m74.752 127.488l-72.704 79.36c-4.608 4.608-11.264 9.216-17.92 9.216s-13.824-2.048-17.92-6.656l-45.568-47.616c-9.216-9.216-9.216-25.088 0-34.304 9.216-9.216 25.088-9.216 34.304 0l31.744 31.744 54.272-61.44c9.216-9.216 25.088-11.264 34.304-2.048 8.704 8.704 8.704 22.528-0.512 31.744z" fill="#1DAF72" p-id="9482"></path>
        <path d="M587.264 735.744c14.336-67.584 68.096-121.344 135.68-135.68 38.912-8.192 76.8-3.584 109.056 10.24 20.48 8.704 43.52-7.168 43.52-29.184V219.648c0-44.032-35.84-79.872-79.872-79.872h-55.808c-13.824 0-26.624 8.704-30.208 22.016-9.728 34.304-40.96 59.392-78.336 59.392h-271.36c-37.376 0-68.608-25.088-78.336-59.392-3.584-13.312-16.384-22.016-30.208-22.016H196.096c-44.032 0-79.872 35.84-79.872 79.872v626.688c0 44.032 35.84 79.872 79.872 79.872h393.216c25.6 0 40.448-28.672 25.6-50.176-26.624-38.4-38.912-88.064-27.648-140.288z m-281.088-378.88H686.08c14.848 0 27.136 12.288 27.136 27.136s-12.288 27.136-27.136 27.136H306.176c-14.848 0-27.136-12.288-27.136-27.136s11.776-27.136 27.136-27.136z m0 162.816H686.08c14.848 0 27.136 12.288 27.136 27.136s-12.288 27.136-27.136 27.136H306.176c-14.848 0-27.136-12.288-27.136-27.136 0-15.36 11.776-27.136 27.136-27.136z m226.304 217.088H306.176c-14.848 0-27.136-12.288-27.136-27.136s12.288-27.136 27.136-27.136H532.48c14.848 0 27.136 12.288 27.136 27.136s-11.776 27.136-27.136 27.136z" fill="#007AFF" p-id="9483"></path>
      </svg>
    </div>
    <div class="textSuccess">
      下单成功
    </div>
    <div class="textContent">
      后期正在加紧制作中，请耐心等待~
    </div>
    <div class="buttonContainer">
      <el-button size="large" style="background:#5AC8FF;color: #000;" @click="goToHome">返回首页</el-button>
      <el-button size="large" style="color: #000;" @click="goToOrders">查看订单</el-button>
    </div>
  </div>
  
  
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'


const router = useRouter()


// 返回首页
const goToHome = () => {
  try {
    // 跳转到首页
    router.push('/')
    ElMessage.success('已返回首页')
  } catch (error) {
    console.error('跳转首页失败:', error)
    ElMessage.error('跳转失败，请重试')
  }
}

// 查看订单
const goToOrders = () => {
  try {
    // 跳转到订单列表页面
    router.push('/orderList')
    ElMessage.success('正在查看订单')
  } catch (error) {
    console.error('跳转订单页面失败:', error)
    ElMessage.error('跳转失败，请重试')
  }
}
</script>
<style scoped>
/****************** 总容器 ******************/
.wrapper {
   width: 100%;
   height: 100vh;
   background: #f5f5f5
}
/****************** header部分 ******************/
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
.successImg{
  padding-top:30vw ;
  margin:0 auto 0;
  text-align: center; 
}
.textSuccess{
  text-align: center;
  font-weight: bold;
  font-size: 4.8vw;
  margin-bottom: 10px;
}
.textContent{
  text-align: center;

}
.buttonContainer{
  padding:20px;
  display:flex;
  justify-content: space-around;
}
</style>