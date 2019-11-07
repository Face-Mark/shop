<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="out">
        欢迎你！xxx
        <a href="javascript:;" @click="out">退出</a>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
        <!-- 一级菜单 -->
          <el-submenu :index="oneItem.path" v-for="oneItem in homeList" :key="oneItem.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{oneItem.authName}}</span>
            </template>
            <!-- 二级菜单栏 -->
            <el-menu-item :index="twoItem.path" v-for="twoItem in oneItem.children" :key="twoItem.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{twoItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 组件出口 -->
        <router-view> 123 </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      homeList: ''
    }
  },
  computed: {
    // 截取地址栏的地址获取active
    active () {
      return this.$route.path.slice(1)
    }
  },
  async created () {
    // 发送请求获取数据
    // const { meta, data } = await this.$axios({
    //   method: 'get',
    //   url: '/menus'
    // })
    const { meta, data } = await this.$axios.get('/menus')
    if (meta.status === 200) {
      this.homeList = data
    }
  },
  methods: {
    // 退出功能
    async out () {
      // 弹出提示框
      await this.$confirm('你真的确认退出？', '温馨提示', { type: 'earning' })
      try {
        // 删除本地token
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('退出成功')
      } catch {
        this.$message.info('取消退出')
      }
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
      background: url("../assets/logo.png") no-repeat center center;
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

    .el-submenu__title,
    .el-submenu {
      width: 200px;
    }
  }

  .el-main {
    background-color: #eaeef1;
  }
}
</style>
