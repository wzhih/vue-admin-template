<template>
  <div class="app-container">
    <div class="title-container">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      />
      <el-button class="filter-item" type="success" @click="fetchData">搜索</el-button>
    </div>
    <ve-line :data="chartData" :loading="loading" />
  </div>
</template>

<script>
import { day } from '@/api/rate'

export default {
    data() {
        return {
            loading: true,
            date: '',
            chartData: {
                columns: ['日期', '留存率'],
                rows: []
            }
        }
    },
    computed: {
        start() {
            return this.date[0] || ''
        },
        end() {
            return this.date[1] || ''
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.loading = true
            day({ start: this.start, end: this.end }).then(res => {
                this.chartData.rows = res.data.rates.map(rate => {
                    return { '日期': rate.day, '留存率': rate.rate }
                })
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
.title-container {
        padding-bottom: 15px;
    }
</style>
