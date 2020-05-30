<template>
  <div class="app-container">
    <el-form ref="permissionForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="权限名" prop="name">
        <el-input v-model="form.name" maxlength="20" />
      </el-form-item>
      <el-form-item label="权限标识" prop="permission">
        <el-input v-model="form.permission" maxlength="30" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, show } from '@/api/permission'

export default {
    data() {
        return {
            form: {
                name: '',
                permission: ''
            },
            rules: {
                name: [
                    { type: 'string', required: true, trigger: 'blur', message: '请输入权限名' }
                ],
                permission: [
                    { type: 'string', required: true, trigger: 'blur', message: '请输入权限标识' }
                ]
            }
        }
    },
    created() {
        this.fillForm()
    },
    beforeRouteUpdate(to, from, next) {
        this.fillForm()
        next()
    },
    methods: {
        onSubmit() {
            this.$refs.permissionForm.validate((vali) => {
                if (vali) {
                    const data = {
                        id: this.form.id,
                        name: this.form.name.trim(),
                        permission: this.form.permission.trim()
                    }
                    update(data).then(res => {
                        if (res.code === 0) {
                            this.$router.push({ name: 'PermissionIndex' })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        onCancel() {
            this.$router.push({ name: 'PermissionIndex' })
        },
        fillForm() {
            show({ id: this.$route.params.id }).then(res => {
                const permission = res.data.permission
                this.form.id = permission.id
                this.form.name = permission.name
                this.form.permission = permission.permission
            })
        }
    }
}
</script>

<style scoped>

</style>
