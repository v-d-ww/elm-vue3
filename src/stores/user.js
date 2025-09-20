import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('big-user',() => {
  const token = ref('')
  const userName = ref('')
  const userSex = ref('')
  const setToken = (newToken) =>{
    token.value=newToken
  }
  const setName = (newToken) =>{
    userName.value=newToken
  }
  const setSex = (newToken) =>{
    userSex.value=newToken
  }
  const removeToken=()=>{
    token.value=''
  }


  return {
    token,
    setToken,
    setName,
    setSex,
    removeToken,
  }
}, {
    persist: true
  })
  