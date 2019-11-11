<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
     <div class="searchusers">
       <el-input placeholder="请输入内容" v-model="search" class="input-with-select" style="width:300px;">
        <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
      </el-input>
      <el-button plain type="success" style="margin-left:40px;" @click="add">添加用户</el-button>
     </div>
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
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" circle plain size="mini" @click="showEdit(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain size="mini" @click="userDel(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-edit" round plain size="mini" @click="showRole(scope.row)">分配角色</el-button>
        </template>
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
    <!-- 添加的模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="form.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户信息 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit" width="40%">
      <el-form :model="formEdit" ref="formEdit" :rules="rules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-tag type="info">{{formEdit.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="formEdit.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="80px" prop="mobile">
          <el-input v-model="formEdit.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole" width="40%">
      <el-form :model="formRole" ref="formRole" :rules="rules">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-tag type="info">{{formRole.username}}</el-tag>
        </el-form-item>
        <el-form-item label="角色列表" label-width="80px">
          <el-select v-model="formRole.rid" placeholder="请选择需要分配的角色">
            <el-option :label="role.roleName" :value="role.id" v-for="role in roleList" :key="role.id">{{role.roleName}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="roleOk">分 配</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagenum: 1,
      pagesize: 2,
      total: 0,
      usersList: [],
      roleList: [],
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      search: '',
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formEdit: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      formRole: {
        id: '',
        username: '',
        rid: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: false, type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: false, pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getApply()
  },
  methods: {
    // 请求渲染
    async getApply () {
      let params = {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.search
        }
      }
      const res = await this.$axios.get('/users', params)
      const { meta, data } = res
      console.log(res)
      if (meta.status === 200) {
        this.usersList = data.users
        this.total = data.total
      }
    },
    // 修改表单状态
    async change (row) {
      // 发送请求修改用户状态
      const { meta } = await this.$axios.put(`users/${row.id}/state/${row.mg_state}`)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
      } else {
        this.$messgae.error(meta.msg)
      }
    },
    // 分页点击事件
    handleSizeChange (val) {
      this.pagesize = val
      this.getApply()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getApply()
    },
    // 搜索
    searchClick () {
      this.pagenum = 1
      this.getApply()
    },
    // 添加用户
    add () {
      // 点击弹出模态框
      this.dialogFormVisible = true
    },
    // 确认添加
    addOk () {
      this.$refs.form.validate(async (valid) => {
        const { meta } = await this.$axios.post('/users', this.form)
        if (meta.status === 201) {
          this.$refs.form.resetFields()
          this.dialogFormVisible = false
          this.$message.success(meta.msg)
          this.pagenum = Math.ceil(++this.total / this.pagesize)
          this.getApply()
        } else {
          this.$message.info(meta.msg)
        }
      })
    },
    // 删除
    async userDel (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          type: 'warning'
        })
        // 发送请求
        const { meta } = await this.$axios.delete(`users/${id}`)
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          if (this.usersList.length === 1) {
            this.pagenum--
          }
          this.getApply()
        } else {
          this.$message.error(meta.msg)
        }
      } catch {
        this.$message.info('已取消操作')
      }
    },
    // 修改用户
    async showEdit (id) {
      // 弹出模态框
      this.dialogFormVisibleEdit = true
      // 获取当前用户数据
      const { meta, data } = await this.$axios.get(`users/${id}`)
      console.log(meta, data)
      this.formEdit.username = data.username
      this.formEdit.email = data.email
      this.formEdit.mobile = data.mobile
      this.formEdit.id = data.id
    },
    // 确认修改
    async editOk () {
      console.log(this.formEdit.mobile)
      const { meta } = await this.$axios.put(`users/${this.formEdit.id}`, this.formEdit)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        this.dialogFormVisibleEdit = false
        this.$refs.formEdit.resetFields()
        this.getApply()
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 编辑角色
    async showRole (row) {
      this.dialogFormVisibleRole = true
      this.formRole.username = row.username
      // 获取角色信息
      const { meta, data } = await this.$axios.get(`roles`)
      if (meta.status === 200) {
        this.roleList = data
      }
      const res = await this.$axios.get(`users/${row.id}`)
      if (meta.status === 200) {
        this.formRole.rid = res.data.rid
        this.formRole.id = row.id
      }
    },
    // 确认角色
    async roleOk () {
      const { meta } = await this.$axios.put(`users/${this.formRole.id}/role`, { rid: this.formRole.rid })
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        this.dialogFormVisibleRole = false
        this.$refs.formRole.resetFields()
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 导航栏 */
  #app .el-breadcrumb {
    height: 40px;
    background-color: #ddd;
    line-height: 40px;
    padding: 0px 10px;
    border-radius: 5px;
  }

/* 搜索框 */
  .searchusers {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .el-table {
    margin-bottom: 10px;
  }
</style>
