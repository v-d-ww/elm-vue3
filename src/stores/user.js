import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('big-user',() => {
  const token = ref('')
  const userName = ref('')
  const userId = ref('')
  const userImg = ref('')
  const setToken = (newToken) =>{
    token.value=newToken
  }
  const setName = (newToken) =>{
    userName.value=newToken
  }
  const setId = (id) =>{
    userId.value=id
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
    userId,
    setToken,
    setName,
    setId,
    setImg,
    removeToken,
    
  }
}, {
    persist: true
  })
  