<template>
  <div class="app-container">
    <div class="title-container">
      <router-link :to="{name:'RoleAdd'}">
        <el-button v-permission="`role/add`" class="filter-item" type="success">新增角色</el-button>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-divider content-position="left">绑定权限</el-divider>
          <el-tag v-for="(item, index) in props.row.permissions" :key="index" class="permission-tag">
            {{ item.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="角色名" width="200">
        <template slot-scope="scope">{{ scope.row.name }}</template>
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
          <el-button v-permission="`role/update`" type="primary" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-permission="`role/delete`" type="danger" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :total="total"
      :current-page.sync="listQuery.page"
      :page-size.sync="listQuery.limit"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { index, del } from '@/api/role'
import permission from '@/directives/permission'

export default {
    directives: { permission },
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
            },
            pageSizes: [10, 20, 30, 50]
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.fetchData()
        },
        fetchData() {
            this.listLoading = true
            index({ page: this.listQuery.page, pageSize: this.listQuery.limit }).then(response => {
                this.list = response.data.roles
                this.total = response.data.count
                this.listQuery.page = response.data.page
                this.listQuery.pageSize = response.data.pageSize
                this.listLoading = false
            })
        },
        edit(index, row) {
            this.$router.push({ name: 'RoleEdit', params: { id: row.id }})
        },
        del(index, row) {
            // console.log(index, row)
            this.$confirm('确认删除该角色?', '删除', {
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
