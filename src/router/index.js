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
    icon: 'svg-name'             the icon show in the sidebar
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
        component: () => import('@/views/login/TheIndex'),
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
            component: () => import('@/views/dashboard/TheIndex'),
            meta: { title: 'Dashboard', icon: 'dashboard' }
        }]
    },

    {
        path: '/system',
        component: Layout,
        meta: { title: '系统管理', icon: 'nested' },
        children: [
            {
                path: '/user',
                meta: { title: '用户管理', icon: 'user' },
                component: () => import('@/views/Blank'), // Parent router-view
                redirect: '/user/index',
                children: [
                    {
                        path: 'index',
                        name: 'UserIndex',
                        component: () => import('@/views/user/TheIndex'),
                        meta: { title: '用户列表' }
                    },
                    {
                        path: 'add',
                        name: 'UserAdd',
                        component: () => import('@/views/user/TheAdd'),
                        hidden: true
                    },
                    {
                        path: 'edit/:id',
                        name: 'UserEdit',
                        component: () => import('@/views/user/TheEdit'),
                        hidden: true
                    }
                ]
            },

            {
                path: '/role',
                component: () => import('@/views/Blank'), // Parent router-view
                meta: { title: '角色管理', icon: 'nested' },
                redirect: '/role/index',
                children: [
                    {
                        path: 'index',
                        name: 'RoleIndex',
                        component: () => import('@/views/role/TheIndex'),
                        meta: { title: '角色列表' }
                    },
                    {
                        path: 'add',
                        name: 'RoleAdd',
                        component: () => import('@/views/role/TheAdd'),
                        hidden: true
                    },
                    {
                        path: 'edit/:id',
                        name: 'RoleEdit',
                        component: () => import('@/views/role/TheEdit'),
                        hidden: true
                    }
                ]
            },

            {
                path: '/permission',
                component: () => import('@/views/Blank'), // Parent router-view
                meta: { title: '权限管理', icon: 'link' },
                redirect: '/permission/index',
                children: [
                    {
                        path: 'index',
                        name: 'PermissionIndex',
                        component: () => import('@/views/permission/TheIndex'),
                        meta: { title: '权限列表' }
                    },
                    {
                        path: 'add',
                        name: 'PermissionAdd',
                        component: () => import('@/views/permission/TheAdd'),
                        hidden: true
                    },
                    {
                        path: 'edit/:id',
                        name: 'PermissionEdit',
                        component: () => import('@/views/permission/TheEdit'),
                        hidden: true
                    }
                ]
            }

        ]
    },

    {
        path: '/rate',
        component: Layout,
        redirect: '/rate/day',
        children: [{
            path: 'day',
            name: 'DayRate',
            component: () => import('@/views/rate/day/TheIndex'),
            meta: { title: '次日留存', icon: 'dashboard' }
        }]
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
