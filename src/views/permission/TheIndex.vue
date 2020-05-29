<template>
  <div class="app-container">
    <div class="title-container">
      <router-link :to="{name:'PermissionAdd'}">
        <el-button v-permission="`permission/add`" class="filter-item" type="success">新增权限</el-button>
      </router-link>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="权限名" width="200">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="权限标识" width="200">
        <template slot-scope="scope">{{ scope.row.permission }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updated_at | formatDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button v-permission="`permission/update`" type="primary" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-permission="`permission/delete`" type="danger" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import moment from 'moment'
import { index, del } from '@/api/permission'
import permission from '@/directives/permission'
import Pagination from '@/components/Pagination'

export default {
    directives: { permission },
    components: { Pagination },
    filters: {
        formatDate(timestamp) {
            return moment.unix(timestamp).format('Y-M-D H:m:s')
        }
    },
    data() {
        return {
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 10
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.listLoading = true
            index({ page: this.listQuery.page, pageSize: this.listQuery.limit }).then(response => {
                this.list = response.data.permissions
                this.total = response.data.count
                this.listQuery.page = response.data.page
                this.listQuery.pageSize = response.data.pageSize
                this.listLoading = false
            })
        },
        edit(index, row) {
            this.$router.push({ name: 'PermissionEdit', params: { id: row.id }})
        },
        del(index, row) {
            // console.log(index, row)
            this.$confirm('确认删除该权限?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    del({ id: row.id }).then(res => {
                        this.list.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: res.message || '删除成功!'
                        })
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        }
    }
}
</script>

<style scope>
    .title-container {
        padding-bottom: 10px;
    }
    .permission-tag {
      margin-top: 10px;
      margin-right: 10px;
    }
</style>
