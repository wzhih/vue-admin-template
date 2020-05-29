import store from '@/store'

export default {
    inserted: function(el, binding) {
        const roles = store.getters.roles
        if (roles.indexOf('admin') >= 0) return
        const { value } = binding
        const permissions = store.getters.permissions
        if (permissions.indexOf(value) < 0) {
            el.style.display = 'none'
        }
    }
}
