import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/dishes/IndexPage.vue')
    }, {
      path: '/index',
      name: 'Index',
      component: () => import('@/views/dishes/IndexPage.vue')
    },
    {
      path: '/businessList',
      name: 'BusinessList',
      component: () => import('@/views/dishes/BusinessList.vue')
    },
    {
      path: '/businessInfo',
      name: 'BusinessInfo',
      component: () => import('@/views/dishes/BusinessInfo.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/LoginPage.vue')
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('@/views/orders/OrdersPage.vue')
    },
    {
      path: '/userAddress',
      name: 'UserAddress',
      component: () => import('@/views/user/UserAddress.vue')
    },
    {
      path: '/payment',
      name: 'Payment',
      component: () => import('@/views/orders/PaymentPage.vue')
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: () => import('@/views/orders/OrderList.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/orders/paymentSuccess.vue')
    },
    {
      path: '/EditUserAddress',
      name: 'EditUserAddress',
      component: () => import('@/views/user/EditUserAddress.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Login/RegisterPage.vue')
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/views/user/MinePage.vue')
    },
    {
      path: '/points',
      name: 'Points',
      component: () => import('@/views/points/PointsPage.vue')
    },
  ]
})
// router.beforeEach((to) => {
//   //除了登录、注册、首页、商家列表、商家信息之外，都需要判断是否登录
//   const userStore = useUserStore()
//   if (!
//     (to.path == '/' || to.path == '/index' || to.path == '/businessList' || to.path == '/businessInfo' || to.path == '/login' || to.path == '/register')) {
//     if (!userStore.token) {
//       router.push('/login');
//     }
//   }
// });
export default router