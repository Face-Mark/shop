<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="rightList" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template v-slot="scope">
          <span v-if="+scope.row.level === 0">一级</span>
          <span v-else-if="+scope.row.level === 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightList: []
    }
  },
  created () {
    this.rightApply()
  },
  methods: {
    // 获取数据
    async rightApply () {
      const { meta, data } = await this.$axios.get('rights/list')
      console.log(meta, data)
      if (meta.status === 200) {
        this.rightList = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 导航栏 */
  .rights .el-breadcrumb {
    height: 40px;
    background-color: #ddd;
    line-height: 40px;
    padding: 0px 10px;
    border-radius: 5px;
  }
</style>
