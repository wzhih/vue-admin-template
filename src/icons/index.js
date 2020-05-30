import Vue from 'vue'
import XSvgIcon from '@/components/XSvgIcon'// svg component

// register globally
Vue.component('svg-icon', XSvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
