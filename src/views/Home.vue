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
      <el-aside width="200px">Aside</el-aside>
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
