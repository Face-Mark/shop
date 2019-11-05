<template>
  <div class="users">
    <!-- 表格 -->
  <el-table :data="usersList" style="width: 100%">
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column label="用户状态">
      <template v-slot="scope">
        <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="change(scope.row)"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <el-button type="primary" icon="el-icon-edit" circle plain size="mini"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle plain size="mini"></el-button>
      <el-button type="success" icon="el-icon-edit" round plain size="mini">分配角色</el-button>
    </el-table-column>
  </el-table>
  <!-- 分页功能 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[2, 4, 6, 8]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagenum: 1,
      pagesize: 2,
      total: 0,
      usersList: []
    }
  },
  created () {
    this.getApply()
  },
  methods: {
    // 请求渲染
    getApply () {
      this.$axios({
        method: 'get',
        url: '/users',
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        const { meta, data } = res
        console.log(res)
        if (meta.status === 200) {
          this.usersList = data.users
          this.total = data.total
        }
      })
    },
    // 修改表单状态
    change (row) {
      // 发送请求修改用户状态
      this.$axios({
        method: 'put',
        url: `users/${row.id}/state/${row.mg_state}`
      }).then(res => {
        console.log(res)
        const { meta } = res
        if (meta.status === 200) {
          this.$message.success(meta.msg)
        } else {
          this.$messgae.error(meta.msg)
        }
      })
    },
    // 分页点击事件
    handleSizeChange (val) {
      this.pagesize = val
      this.getApply()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getApply()
    }
  }
}
</script>

<style>
  .el-table {
    margin-bottom: 10px;
  }
</style>
