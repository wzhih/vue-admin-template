<template>
  <div class="app-container">
    <el-form ref="userForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" maxlength="20" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="form.roles" multiple placeholder="请选择">
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
import { update, show } from '@/api/user'
import { index as getRoles } from '@/api/role'

export default {
    data() {
        return {
            options: [],
            form: {
                id: 0,
                username: '',
                password: '',
                roles: []
            },
            rules: {
                username: [
                    { type: 'string', required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { type: 'string', trigger: 'blur', message: '请输入密码' },
                    { trigger: 'blur', min: 5, message: '请输入不少于5位的密码' }
                ]
            }
        }
    },
    created() {
        getRoles({ all: true }).then(response => {
            const roles = response.data.roles
            this.options = roles.map(role => {
                return { value: role.id, label: role.name }
            })
        }).catch(error => {
            this.$message({ message: error, type: 'error' })
        })
        this.fillForm()
    },
    beforeRouteUpdate(to, from, next) {
        this.fillForm()
        next()
    },
    methods: {
        onSubmit() {
            this.$refs.userForm.validate((vali) => {
                if (vali) {
                    const data = {
                        id: this.form.id,
                        username: this.form.username,
                        password: this.form.password,
                        roles: this.form.roles
                    }
                    update(data).then(res => {
                        if (res.code === 0) {
                            this.$router.push({ name: 'user_index' })
                        }
                    })
                } else {
                    return false
                }
            })
        },
        onCancel() {
            this.$router.push({ name: 'user_index' })
        },
        fillForm() {
            show({ id: this.$route.params.id }).then(res => {
                const user = res.data.user
                this.form.id = user.id
                this.form.username = user.username
                this.form.roles = user.roles.map(role => {
                    return role.id
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
