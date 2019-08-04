<template>
  <el-container>
    <el-header>
      <el-col :span='8'><img
          src="../../assets/logo.png"
          alt=""
        ></el-col>
      <el-col :span='8'>
        <h1>电商后台管理系统</h1>
      </el-col>
      <el-col :span='8'>
        <div class="col3">恭喜上海前端44期月薪20k <a
            href="#"
            @click.prevent='logout'
          >退出</a></div>
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
          el-menu   菜单组件
          default-active="2"  默认高亮  值index 为2的
          background-color="#545c64"  组件背景颜色
           text-color="#fff"  字体颜色
          active-text-color="#ffd04b"  高亮状态字体颜色

          el-submenu 子菜单  （可展开）

          el-menu-item 菜单元素（最小单位）
         -->
        <el-menu
          :router='true'
          :default-active="handlerUrlPath"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <!-- 自定义标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item
              index='/users'
              @click='tiao'
            >用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 自定义标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index='/roles'>角色列表</el-menu-item>
            <el-menu-item index='/rights'>权限列表</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  methods: {

    logout () {
      this.$confirm('此操作将退出该账户,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        localStorage.removeItem('token')
        // 返回 login页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    },
    tiao () {

    }
    // handlerUrlPath () {

    // }
  },
  computed: {
    handlerUrlPath () {
      return this.$route.path
    }
  }
}
</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
}
.el-container .el-header {
  background-color: #b3c1cd;
  padding: 0;
  h1 {
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .col3 {
    text-align: right;
    font-size: 16px;
    line-height: 60px;
    padding-right: 20px;
    a {
      color: #daa520;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
</style>
