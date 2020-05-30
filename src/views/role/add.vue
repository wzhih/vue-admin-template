<template>
  <div class="app-container">
    <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="form.name" maxlength="20" />
      </el-form-item>
      <el-form-item label="权限" prop="permissions">
        <el-select v-model="form.permissions" multiple filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add } from '@/api/role'
import { index } from '@/api/permission'

export default {
    data() {
        return {
            options: [],
            form: {
                name: '',
                permissions: []
            },
            rules: {
                name: [
                    { type: 'string', required: true, trigger: 'blur', message: '请输入角色名' }
                ]
            }
        }
    },
    created() {
        index({ all: true }).then(response => {
            const permissions = response.data.permissions
            this.options = permissions.map(permission => {
                return { value: permission.id, label: permission.name }
            })
        }).catch(error => {
            this.$message({ message: error, type: 'error' })
        })
    },
    methods: {
        onSubmit() {
            this.$refs.roleForm.validate((vali) => {
                if (vali) {
                    const data = {
                        name: this.form.name.trim(),
                        password: this.form.password.trim(),
                        permissions: this.form.permissions
                    }
                    add(data).then(res => {
                        if (res.code === 0) {
                            this.$router.push({ name: 'RoleIndex' })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        onCancel() {
            this.$router.push({ name: 'RoleIndex' })
        }
    }
}
</script>

<style scoped>

</style>
