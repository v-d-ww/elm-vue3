import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('big-user',() => {
  const token = ref('')
  const userName = ref('')
  const userEmail = ref('')
  const userImg = ref('')
  const setToken = (newToken) =>{
    token.value=newToken
  }
  const setName = (newToken) =>{
    userName.value=newToken
  }
  const setEmail = (email) =>{
    userEmail.value=email
  }
  const setImg = (img) =>{
    userImg.value=img
  }
  const removeToken=()=>{
    token.value=''
  }


  return {
    token,
    userName,
    userImg,
    userEmail,
    setToken,
    setName,
    setEmail,
    setImg,
    removeToken,
    
  }
}, {
    persist: true
  })
  