import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('big-user',() => {
  const token = ref('')
  const userName = ref('')
  const userEmail = ref('')
  const userImg = ref('')
  const userBrief = ref('')
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
  const setBrief = (c) =>{
    userBrief.value=c
  }
  const removeToken=()=>{
    token.value=''
  }

  const updateUserInfo = (payload = {}) => {
    if ('userName' in payload) userName.value = payload.userName || ''
    if ('userEmail' in payload) userEmail.value = payload.userEmail || ''
    if ('userBrief' in payload) userBrief.value = payload.userBrief || ''
  }


  return {
    token,
    userName,
    userImg,
    userEmail,
    userBrief,
    setToken,
    setName,
    setEmail,
    setImg,
    removeToken,
    setBrief,
    updateUserInfo
    
  }
}, {
    persist: true
  })
  