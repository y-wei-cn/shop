<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑结束 -->
    <!-- table表格 -->

    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type='index'
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope='scope'>
          <span v-if="scope.row.level==0">一级</span>
          <span v-else-if="scope.row.level==1">二级</span>
          <span v-else>三级</span>
          <!-- <span>{{scope.row.level}}</span> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: 0,
        authName: '',
        level: '',
        pid: 0,
        path: ''
      }]
    }
  },
  created () {
    // 一进页面就获取数据
    this.getAuthNameData()
  },
  methods: {
    // 获取数据 发送axios
    async getAuthNameData () {
      let res = await this.$axios.get('rights/list')
      console.log(res)
      // this.tableData = res.data.data
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data
      } else {
        this.$message({
          message: '获取数据失败',
          type: 'danger'
        })
      }
    },
    // 设置索引
    indexMethod (index) {
      return index
    }
  }

}
</script >

<style scoped lang='less'>
.el-breadcrumb {
  line-height: 40px;
  height: 40px;
  background-color: #d4dae0;
  padding-left: 30px;
}
</style>
