<template>
    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>Hi！欢迎登录~</p>
        </header>
        <!-- 表单部分 -->
        <div class="container">
         <el-form 
         ref="form"
         :model="formUser"
         :rules="rules"
         class="form-box"
         >
            <el-form-item prop="email" >
                <el-input size="large" :prefix-icon="User" v-model="formUser.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input 
                size="large" 
                :prefix-icon="Lock" 
                v-model="formUser.password" 
                placeholder="请输入密码"
                type="password"
                show-password
                ></el-input>
            </el-form-item>
            <el-form-item prop="checkCode" style="display: flex; align-items: center; gap: 10px;">
                <el-input size="large" :prefix-icon="Key" v-model="formUser.checkCode" placeholder="请输入验证码" style="width: 60%;padding-right: 5px;"></el-input>
                <img 
                    :src="checkCodeImage" 
                    alt="点击刷新验证码" 
                    @click="refreshCheckCode"
                    style="flex: 1; height: 40px; cursor: pointer; border: 1px solid #ddd;"
                />
            </el-form-item>
         </el-form>
        <!-- <ul class="form-box">
            <li>
                <div class="title">
                    手机号码：
                </div>
                <div class="content">
                    <input type="text" v-model="userId" placeholder="手机号码">
                </div>
            </li>
            <li>
                <div class="title">
                    密码：
                </div>
                <div class="content">
                    <input type="password" v-model="password" placeholder="密码">
                </div>
            </li>
        </ul> -->
        <div class="button-login">
            <el-button @click="login">登录</el-button>
        </div>
        <div class="button-register">
            <el-button @click="register">去注册</el-button>
        </div>
        </div>
    </div>
</template>
 <script setup>
    import { ref,onMounted } from 'vue'
    import {useUserStore} from '@/stores/user.js'
    import { useRouter } from 'vue-router'
    import { ElMessage } from 'element-plus'
    import { userLoginService } from '@/api/user'
    import { User, Lock,Key } from '@element-plus/icons-vue'
    import { getCheckCode } from '@/api/user'
    const form = ref();
    const formUser = ref({
        email:'',
        password:'',
        checkCodeKey:'',
        checkCode:''

    })
    const userStore = useUserStore()
    const router = useRouter()
    const login = async () => {
        await form.value.validate()
        const res = await userLoginService(formUser.value)
        userStore.setToken(res.data.data.token)
        userStore.setName(res.data.data.nickName)
        userStore.setId(res.data.data.userId)
        userStore.setImg(res.data.data.userImg)
        ElMessage.success('登录成功')
        router.push('/')
    }
    const register = () =>{
        router.push('/register')
    }
const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { 
      type: 'email', 
      message: '请输入正确的邮箱格式', 
      trigger: 'blur' 
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
checkCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ]
}
const checkCodeImage = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAqCAIAAADK0mkfAAAMcklEQVR4Xu1ZCVBcVRbFUccl6sw46oyllqVVLmOVYzlZNJtZKjsho8TduGASyTJJmSmJZUxCxKhZwEgyMZAEiFlMIIEkKokBNQGcbECzB5oATUN3s9PQoaG76ebOef/9/v37NVDCYIap4tStrvff9v8//777zn3tR/87ZORcfvXD3ffNet9v+Dv4RRk1YqfBBD+x4tdHhl4/LzFpVNTOJzZu/fDgCZ2xEZX4jU5MfyBg1ZINX3c6XeKYwYGrTRaY8j9wYF7EvmnLI89U6FBGjdJqsXZM/0ck+FKNGES42mS9npQUk3YRHgRecHnBYECNugPq0To41+PVJmt8bOxLq3dFJabxS6vDgRrvLoTWV1btEioHA642WfCjB99cp69p4pe+ngWg9Z6ZK4XKwYCrTRYi1F8/33ZWXwWfumg0CjGLw+7ovGH0EqFyMOBqkwU8GLTupfgErD74lC9TNORZaiAeKTGrW/z/xazMeuuCtMp79+ffuFtzz/68Kd+VfpxtMrQ5xH59B3Y6ZTcU0FFRURb28bGnJmSOHZs9apRm3Lh8f//ioKCK1auN0dFtRUXigAFBV5clO7vyo48Knn1WM2ZM9ujRBXPm4NLqc7tuyGq1O1/9scIvOsvXrt+VvfK8weHqEsf4oNpCa9Np6kEqN4tNAJQU9BT4qmqlc0a5sj4xMXvkyKzhw0UbMUKp161b5zXRfw17XV3p4sXiHd331W/c2OV0Kp1Fsq44XE8mXgIvt8XlhGYZ85varZ2uFrvztNHyYmo5p2zGiVJnV298xebRsHDy+4zZY7uo1SZ2gEYHX7cHJ1+/wYU+q9NIG5/IHzEp4MWWzEynxYIP7rLZHI2NXQ6HtaSkMiwMvoYOLenp4nT9hU2vz508GXPmTJpkio62arUuqxU37SgvxyX8Gk0Vq1Yp/UWyAlPKQMcDXxeU+b4i0eHy5t/uykaHf56rFtsk2J00/4RM07xv6LbPWSFQ1AbU3EGzEuRusJs/tqY8PRFPdv6DtfjUcJ/8WbOwHLJGjswZP964YwcfpRk7Fn2K33jDe7J+wmW3F86diwkvvfaao66uOTVVu3hxzjPP5EyYUDJ/fuvZs1iGWJXoAJfnQ7zI+tFoARHX7crWNFhxCW8afaz4phjNXXtz56aU88ojFc3cv+LLm9VjSaJg3D728tdtpC0XWc2+QpmOyExPt5xaemCHXL/kFAUl0wsLEvBMmXMC8WELn3tOWA65kyZhFPxLqYGjeabrLxq//ZZNPnWqrbr68rJlwk1hTcnJ8C8UwGBnSwsJZI0/XgIW3jitI4kp7kSKgcRkPRsTnK7H5S2xmsordvVw7iwPRZGm1lM5I55V3riZilm+TPsL6abNrOaazyj8AquxOelQwAI805J3jzSmpKLAfEr10PkBAejmaGpSahqPH/fcAI96mjZtovffp+XLadEiCg6md97pxlAfFkZ1dfIorRSqag8cqPzkExQ00k3LVqzAJmMzGFAuDAy0m0z8jjUxMaQmS2exXyORApo6XV2PxheqmeJ251e5Foeztt1xvcTj86nlynCAL7oxe0m9AehaZHYmHqB3f5AdCtwdLvb0yR43Hg90R2jDuZVh7OGkcN6QlITviQLeiqSNUiGr4ehRz2AitPtS05NFRsqjsNIxFXjBukOh5O23i15+uauzk9wfBvShjHCGcvGbb5KarB1F9Xj/YTEaBO9T1a2+THGLvtSAzojxfpKvNXaw2Tmuccegj35W6hg2nJPruf3xC/pZFfEa2il9LHsgRK6Ty9ZxOvJmzECAtxuNKCO0o9uVvDwPWceOecYTLV3KvEano+Zm6uggbF/C9uNysZolSxhZy5bJlTweddntCIso5M+ejXXHm2ri4lCDiIZyQUBAlrQSSU0WVh/e/6mj7IsvymALTbFXfqyAwoJoQPm5U2XosDrTyJsOlslZHvCHLTIdv9lAJ1U+53DR47vlpoejqVQV6ypb6JFoivRfjgeasOxMxFE9NI7M1/TppUuXolC9ZQt6tmRkKGQh+nqmIHrvPUaWzcaI8HUlwbBOOYrfekuZEAZ1ghiPektWFl+SNbGxzrY23oq9hdRkgSa8POIRyk8cKVKYQiDjQuF8XRsuHz5UiHJsSSNv/fCiWyYRvXzM4z63b6EKlcK6aKKbwyngMJlVUjSvju7exjqPW86ISB4369PDlVgI4MWwbVvJwoU8ePEIhc+uvBiWiWcWotBQkZFeTPGslrQ0NVmwpu+/b05J4Uxhz3V1dNTs2cOboFdJTdbd+/Lw8tjsUMb2h/Kkb7X4vVjfxjsgkPlJ+gvlFPc6fVEVtgrq2T6o8DVyD/MpBYL4P2ug37s9Efb57BV4psynRmPRmU+fxg7lam/H5thWUMAXVd2hQ8pbCcts3z6RkV7sgw88A41RUVyOQH9iMZp27kQBl5Cpna2tnU1NPGDBdGvWkJqsm2M0ePl6KQbx+A2fgkBVOgCovHZnNgol5g5O1oRvtOoOkAjK+8MipP3OFxdMdGuEV89bwyzfTXtB+NR49Evz5uELY4gpJsZDljfQjnfx5UWx4GAW11asIAjMlBRhtAfG7dsxeeX69UwPW61su3RnDnyFesj6zU728nwju+Mr5lm/i8tZrzEpHUgi64bdjCykRJysxxLYqlTj7WT5/bEJpuqERhmKzlJs8tdkbmi9vJwFL8G4qjJs3doTWZAOISEiQb4W7C0dfMGVV9XmzTajMXfKFJT1kqqAduG7pIcs6Ca8fIf0Z8Ejbt1wrk5egxyoQVKNAjjlHf60l10qqG2j0XvZyyMYXfDi2QubznsxBUmhLFhLZiaED3ZxZBs8fLRfZkfMVZs29URW/6SDLzoqKzG5duHC9vJy+V4jRuAZrmQz/yA1Wffuz8fLQ0OhPFmKVjCT1SvS+Lm3S3DKO9way0IYh7aJ7v+SvTx0vOmKZ1S3eOs71hPSLMlrHXsBqT+e2FZVxcrr1/dEVv+kQ7fI9/dnKsHlQkTn96pFRHTDQ9aIJJY/85xmrVsZ2Jye23JvgoxA2exehohuvBVM3RXJpFbIT9gKlEE9Aq40/RAjK79ebFLAV6WjnvVAwtgTWf2TDt1Cv2ED5kcirax6LaZ2w0MWT2L2X2a78hkTSxJhelVCgzJqPs2pQbm0xcY7YFvgrU/EME8R5ChHuZnlgH/e6pUhAph7eBzdt71HN+RSiOdlutDQnsjqn3ToFg3Hj2dJoheBkt8r++mnkZbyVg9ZcVomnYLO6Ih99i6uJLYXeb57ZEEdalINrSRljpysxw/LJ2S3SLsbdCnPAQE45fFSmhnPNKoSngSphRiHYP+3OC+RoYCfCvDdsBey+i0dfNEm5QnlISFthYUF7pSeB01Sk4XEBTsdZBSyP1xuyq0FF7fvyT2qM6Pm37VXsEXeFKNpl9bYFxJxsIVplXw4j+uwe/5F6VUUmsEK6iiu2IM7vJYe9CoqE1SpooK8adMQYnkE6oWsgZIOJJ3b8FRRbRbfAA/w472IPHZoAOea6A7zii3OkP9feN59ELhHKzvS6jSRlF5sWLicSFdbaNQeVuOfID+DGkjfoBV5uReygIYGJgsiIig9neAHZjML8/2D+aefkJnyGyH3wi4MzcWbvMjKb2pHbgw1wJ2rrdMVcr76/gP5iOL4RZm7FaL7jbuZzoBANbq3y6IGula13H6JzT9Bd0bK5Yei1A8iI4tn1BJ6J2tgYTMY+AkqFFZVeDgyRF7vRRbw3rlqsLD0527+oVKwIK2Su9XcFK8jmvALIh0KEV9q2OnC34+ITYrB13zBH7dDr+80myvWrOFMIeMV+w00BG3Mcx3yJcvu6pqazI5fEM6FJo6NuTWcKeyDvkfPa9O9KHgyluKLPcdbSKWU0CbYlINe83Ao2YZiORMn8gOAXxUa6dDGqtXyP0rgZbxeJIuk1cej1Zzvy34wWFrsTkjQ8lYbVAU/SoUhNzrsc6zMEZXDTqxmJdApJshE1FtZgBeYQthq6uaPMdIuWiSQBcubOVPsN9CANMWN6uLj+R35uTZ1SxZJ+nNLft0wKbX2NeyYSbru/uH6ZeDyVWEq+CTzuG5hr63Nmz5dIKs4KEjsN9AwREaq71jR0zJUA4E8tqRx9snLj8YXIqmGbvhLfOHK84Ya7xyoH8Bu8HA0O8PpKdNWAI1TFhJSGBjI/5iCQVuLnQYaUKGmmBh20zFjLr3+uqOBHQ5T72QNQcAQWX3AEFl9wBBZfcAQWX3AEFl9wBBZfcB/AOnuB/7rN+EdAAAAAElFTkSuQmCC')
// 获取验证码的方法
const loadCheckCode = async () => {
    try {
        const res = await getCheckCode()
        // 假设后端返回的是 base64 图片数据
        checkCodeImage.value = res.data.data.checkCode
        formUser.value.checkCodeKey = res.data.data.checkCodeKey
    } catch (error) {
        console.error('获取验证码失败:', error)
        ElMessage.error('获取验证码失败')
    }
}
// 页面挂载时获取验证码
onMounted(async () => {
    await loadCheckCode()
})

// 点击验证码图片刷新验证码
const refreshCheckCode = () => {
    loadCheckCode()
}
</script>
 <style scoped>
 /****************** 总容器 ******************/
 .wrapper {
    width: 100vw;  /* 视口宽度 */
    height: 100vh; 
 }
 /****************** header部分 ******************/
 .wrapper header {
    width: 100%;
    height: 62vw;
    background: linear-gradient(to bottom, #0588d4, #f5f6f7);
    color: #fff;
    font-size: 4.8vw;
    display: flex;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
 }
 /****************** 表单部分 ******************/
 .container{
    width: 100%;
    padding:25px 20px 0px 20px ;
    z-index: 1000;
    position: relative;
    border-radius: 30px 30px 0 0;
    background-color: #fff;
    margin: -30px 0 0 0;
    box-sizing: border-box;
 }
 .wrapper .button-login {
    width: 100%;
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
 }
 .wrapper .button-login button {
    width: 100%;
    height: 10vw;
    font-size: 3.8vw;
    font-weight: 700;
    color: #fff;
    background-color: #47ade8;
    border-radius: 20px;
    border: none;
    outline: none;
 }
 .wrapper .button-register {
    width: 100%;
    box-sizing: border-box;
    padding: 4vw 3vw 0 3vw;
 }
 .wrapper .button-register button {
    width: 100%;
    height: 10vw;
    font-size: 3.8vw;
    font-weight: 700;
 /*与上面登陆按钮不同的只有颜色、背景色、边框不同*/
    color: #666;
    background-color: #EEE;
    border: solid 1px #DDD;
    border-radius: 20px;
    border: none;
    outline: none;
 }

 </style>