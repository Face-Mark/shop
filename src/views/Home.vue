<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title"><h1>电商后台管理系统</h1></div>
      <div class="out">
        欢迎你！xxx
        <a href="javascript:;" @click="out">退出</a>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><i class="el-icon-menu"></i>用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><i class="el-icon-menu"></i>用户列表</el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><i class="el-icon-menu"></i>商品列表</el-menu-item>
          <el-menu-item index="3-2"><i class="el-icon-menu"></i>分类参数</el-menu-item>
          <el-menu-item index="3-3"><i class="el-icon-menu"></i>商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1"><i class="el-icon-menu"></i>数据报表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    out () {
      // 弹出提示框
      this.$confirm('你真的确认退出？', '温馨提示', { type: 'earning' }).then(() => {
        // 删除本地token
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('退出成功')
      }).catch(() => {
        this.$message.info('取消退出')
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  background: pink;

  .el-header {
    background-color: #b3c1cd;
    display: flex;
    line-height: 60px;
    .logo,
    .out {
      width: 180px;
      height: 100%;
    }
    .logo {
      background: url('../assets/logo.png') no-repeat center center;
      background-size: contain;
    }
    .out {
      text-align: right;
      font-weight: 700;
      a {
        color: orange;
      }
    }
    .title {
      text-align: center;
      color: #fff;
      flex: 1;
    }
  }

  .el-aside {
    background-color: #545c64;
  }

  .el-main {
    background-color: #eaeef1;
  }
}
</style>
