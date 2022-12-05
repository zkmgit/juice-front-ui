import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作台', icon: 'dashboard' }
    }]
  },

  {
    path: '/userManager',
    component: Layout,
    redirect: '/userManager/user',
    name: 'UserManager',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/mallManager/user/User.vue'),
        meta: { title: '用户管理', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/carouselImageManager',
    component: Layout,
    redirect: '/carouselImageManager/carouselImage',
    name: 'CarouselImageManager',
    meta: { title: '轮播图管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'carouselImage',
        name: 'CarouselImage',
        component: () => import('@/mallManager/carouselImage/CarouselImage.vue'),
        meta: { title: '轮播图管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/productManager',
    component: Layout,
    redirect: '/productManager/product',
    name: 'ProductManager',
    meta: { title: '产品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/mallManager/product/Product.vue'),
        meta: { title: '产品管理', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/shoppingCartManager',
    component: Layout,
    redirect: '/shoppingCartManager/shoppingCart',
    name: 'ShoppingCartManager',
    meta: { title: '购物车管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'shoppingCart',
        name: 'ShoppingCart',
        component: () => import('@/mallManager/shoppingCart/ShoppingCart.vue'),
        meta: { title: '购物车管理', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/orderManager',
    component: Layout,
    redirect: '/orderManager/order',
    name: 'OrderManager',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/mallManager/order/Order.vue'),
        meta: { title: '订单管理', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/logisticsManager',
    component: Layout,
    redirect: '/logisticsManager/logistics',
    name: 'LogisticsManager',
    meta: { title: '物流管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'logistics',
        name: 'Logistics',
        component: () => import('@/mallManager/logistics/Logistics.vue'),
        meta: { title: '物流管理', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/baseInfo',
    component: Layout,
    redirect: '/baseInfo/category',
    name: 'BaseInfo',
    meta: { title: '基础资料', icon: 'dashboard' },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/mallManager/category/Category.vue'),
        meta: { title: '类目管理', icon: 'dashboard' }
      },
      {
        path: 'attribute',
        name: 'Attribute',
        component: () => import('@/mallManager/attribute/Attribute.vue'),
        meta: { title: '属性管理', icon: 'dashboard' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
