import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(permissions, route) {
    if (route.meta && route.meta.authID) {
        return permissions.some(permission => route.meta.authID.indexOf(permission) >= 0)
    } else {
        return true
    }
}

function filterRoute(asyncRoutes, permissions) {
    return asyncRoutes.filter(v => {
        if (hasPermission(permissions, v)) {
            if (v.children && v.children.length > 0) {
                v.children = filterRoute(v.children, permissions)
                return v
            } else {
                return v
            }
        }
        return false
    })
}

const getDefaultState = () => {
    return {
        routers: constantRoutes,
        addRouters: []
    }
}

const state = getDefaultState()

const mutations = {
    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers
        state.routers = constantRoutes.concat(routers)
    }
}

const actions = {
    generateRoutes({ commit }, data) {
        return new Promise(resolve => {
            const { roles, permissions } = data

            // 如果是admin角色
            if (roles && roles.includes('admin')) {
                const accessedRouters = asyncRoutes || []
                commit('SET_ROUTERS', accessedRouters)
                resolve(accessedRouters)
                return
            }

            // 非admin角色用户，过滤路由，生成有权限访问的路由列表对象
            const accessedRouters = filterRoute(asyncRoutes, permissions)
            console.log(accessedRouters)
            commit('SET_ROUTERS', accessedRouters)
            resolve(accessedRouters)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
