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
    redirect: '/welcome',
    children: [{
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@/views/welcome/index'),
      meta: { title: 'Welcome', icon: 'dashboard', affix: true }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/mvo',
    component: Layout,
    name:'mvo',
    meta: { title: 'MVO', icon: 'peoples'},
    children: [
      {
        path: 'mvoMyinfo',
        component: () => import('@/views/mvo/mvo-info/index'),
        name: 'mvoMyinfo',
        meta: { title: 'My Info', icon: 'form', normal: true }
      },
      {
        path: 'productAdd',
        component: () => import('@/views/mvo/mvo-product-entry/index'),
        name: 'productAdd',
        meta: { title: 'Product Entry', icon: 'edit', normal: true},
      },
      {
        path: 'productImage',
        component: () => import('@/views/mvo/mvo-product-image/index'),
        name: 'productImage',
        meta: { title: 'Product Images', icon: 'icon', normal: true }
      },
      {
        path: 'productDetail/:id',
        component: () => import('@/views/mvo/mvo-product-detail/index'),
        name: 'mvoProductDetail',
        meta: { title: 'Product Detail', icon: 'search', normal: true },
        hidden:true
      },
      {
        path: 'mvoOrderManagement',
        component: () => import('@/views/mvo/mvo-order-management/index'),
        name: 'mvoOrderManagement',
        meta: { title: 'Order Manage', icon: 'list', normal: true }
      },
      {
        path: 'mvoWallet',
        component: () => import('@/views/mvo/mvo-wallet/mvo-wallet'),
        name: 'mvoWallet',
        meta: { title: 'My Wallet', icon: 'money'}
      },
      {
        path: 'mvoAvailableMoney',
        component: () => import('@/views/mvo/mvo-wallet/mvo-available-money'),
        name: 'mvoAvailableMoney',
        meta: { title: 'Available Money', icon: 'money', normal: true },
        hidden:true
      },
      {
        path: 'mvoTransactionRecord',
        component: () => import('@/views/mvo/mvo-wallet/mvo-transaction-record'),
        name: 'mvoTransactionRecord',
        meta: { title: 'Transaction Record', icon: 'money', normal: true },
        hidden:true
      },
      {
        path: 'mvoCompanyInfo',
        component: () => import('@/views/mvo/mvo-info/mvo-company-info'),
        name: 'mvoCompanyInfo',
        meta: { title: 'Company Info', icon: 'money', normal: true },
        hidden:true
      },
    ],
  },
  {
    path: '/bvo',
    component: Layout,
    name:'bvo',
    meta: { title: 'BVO', icon: 'user'},
    children: [
      {
        path: 'bvoMyinfo',
        component: () => import('@/views/bvo/bvo-myinfo'),
        name: 'bvoMyinfo',
        meta: { title: 'My Info', icon: 'form', normal: true }
      },
      {
        path: 'storeManagement',
        component: () => import('@/views/bvo/bvo-store-management/bvo-store-management'),
        name: 'storeManagement',
        meta: { title: 'Store Manage', icon: 'component', normal: true }
      },
      {
        path: 'productBrowse',
        component: () => import('@/views/bvo/bvo-product-browse/index'),
        name: 'productBrowse',
        meta: { title: 'Product Browse', icon: 'search', normal: true }
      },
      {
        path: 'productDetail/:id',
        component: () => import('@/views/bvo/bvo-product-detail/index'),
        name: 'bvoProductDetail',
        meta: { title: 'Product Detail', icon: 'search', normal: true },
        hidden:true
      },
      {
        path: 'wishList',
        component: () => import('@/views/bvo/bvo-product-wishlist/index'),
        name: 'wishList',
        meta: { title: 'Wishlist', icon: 'star', normal: true }
      },
      {
        path: 'bvoOrderManagement',
        component: () => import('@/views/bvo/bvo-order-management/index'),
        name: 'bvoOrderManagement',
        meta: { title: 'Order Manage', icon: 'list', normal: true }
      },
      {
        path: 'bvoWallet',
        component: () => import('@/views/bvo/bvo-wallet/bvo-wallet'),
        name: 'bvoWallet',
        meta: { title: 'My Wallet', icon: 'money' },
      },
      {
        path: 'bvoAvailableMoney',
        component: () => import('@/views/bvo/bvo-wallet/bvo-available-money'),
        name: 'bvoAvailableMoney',
        meta: { title: 'Available Money', icon: 'money', normal: true },
        hidden:true
      },
      {
        path: 'bvoTransactionRecord',
        component: () => import('@/views/bvo/bvo-wallet/bvo-transaction-record'),
        name: 'bvoTransactionRecord',
        meta: { title: 'Transaction Record', icon: 'money', normal: true },
        hidden:true
      },
      {
        path: 'bvoChoose',
        component: () => import('@/views/bvo/bvo-store-management/bvo-choose'),
        name: 'bvoChoose',
        meta: { title: 'Choose', icon: 'money', normal: true },
        hidden:true
      },
      {
        path: 'bvoAddAmazon',
        component: () => import('@/views/bvo/bvo-store-management/bvo-add-amazon'),
        name: 'bvoAddAmazon',
        meta: { title: 'Add Amazon', icon: 'money', normal: true },
        hidden:true
      },
      {
        path: 'bvoAddEbay',
        component: () => import('@/views/bvo/bvo-store-management/bvo-add-ebay'),
        name: 'bvoAddEbay',
        meta: { title: 'Add eBay', icon: 'money', normal: true },
        hidden:true
      },
    ]
  },
  {
    path: '/admin',
    component: Layout,
    name:'admin',
    meta: { title: 'Admin', icon: 'bug'},
    children: [
      {
        path: 'code',
        component: () => import('@/views/admin/admin-code/index'),
        name: 'code',
        meta: { title: 'Code Manage', icon: 'form', normal: true }
      },
      {
        path: 'parameter',
        component: () => import('@/views/admin/admin-parameter/index'),
        name: 'parameterManage',
        meta: { title: 'Parameter Manage', icon: 'component', normal: true }
      },
      {
        path: 'withdraw',
        component: () => import('@/views/admin/admin-audit/index'),
        name: 'withdraw',
        meta: { title: 'Withdraw Audit', icon: 'money', normal: true }
      },
      {
        path: 'menu',
        component: () => import('@/views/admin/admin-menu/index'),
        name: 'menu',
        meta: { title: 'Menu Manage', icon: 'tab', normal: true }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/admin-role/index'),
        name: 'role',
        meta: { title: 'Role Manage', icon: 'user', normal: true }
      }
    ]
  },
  {
    path: '/other',
    component: Layout,
    name:'other',
    meta: { title: 'Other', icon: 'money' },
    hidden:true,
    children: [
      {
      path: 'pay',
      name: 'pay',
      component: () => import('@/views/pay/index'),
      meta: { title: 'Pay', icon: 'money' },
      // hidden:true
      },
      {
        path: 'express',
        name: 'express',
        component: () => import('@/views/express/index'),
        meta: { title: 'Express', icon: 'shopping' },
        // hidden:true
      },
    ]
  },
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
