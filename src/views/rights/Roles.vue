<template>
  <div class="roles">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户 -->
    <el-button plain type="success" style="margin: 10px 0;" @click="showAdd">添加角色</el-button>
    <!-- 添加的模态框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="form.roleDesc" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限模态框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleAssign" width="40%">
      <el-tree :data="rightData" :props="defaultProps" default-expand-all show-checkbox node-key="id" ref="tree"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAssign = false">取 消</el-button>
        <el-button type="primary" @click="rightOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="rolesList" style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="{row}">
          <!-- 一级 -->
          <el-row v-for="one in row.children" :key="one.id" class="one">
            <el-col :span="4">
              <el-tag closable>{{one.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级 -->
              <el-row v-for="two in one.children" :key="two.id" class="two">
                <el-col :span="4">
                  <el-tag type="success" closable>{{two.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag type="warning" v-for="three in two.children" :key="three.id" class="three" closable>{{three.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" circle plain size="mini" @click="showEdit(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain size="mini" @click="rolerDel(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-edit" round plain size="mini" @click="showRight(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rolesList: [],
      dialogFormVisible: false,
      dialogFormVisibleAssign: false,
      defaultProps: {
        label: 'authName'
      },
      form: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: ['blur', 'change'] }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: ['blur', 'change'] }
        ]
      },
      rightData: ''
    }
  },
  created () {
    this.rolesApply()
    this.rightsApply()
  },
  methods: {
    // 获取角色列表
    async rolesApply () {
      const { meta, data } = await this.$axios.get('roles')
      if (meta.status === 200) {
        this.rolesList = data
      }
    },
    // 获取权限树状列表
    async rightsApply () {
      const { meta, data } = await this.$axios.get('rights/tree')
      if (meta.status === 200) {
        this.rightData = data
        console.log(data)
      }
    },
    // 添加用户
    showAdd () {
      this.dialogFormVisible = true
    },
    // 确认添加角色
    addOk () {
      this.$refs.form.validate(async (valid) => {
        const { meta, data } = await this.$axios.post('roles', this.form)
        console.log(meta, data)
        if (meta.status === 201) {
          this.$refs.form.resetFields()
          this.dialogFormVisible = false
          this.$message.success(meta.msg)
        }
      })
    },
    // 显示修改
    showEdit () {

    },
    // 删除
    rolerDel () {

    },
    // 显示分配权限
    showRight (row) {
      this.dialogFormVisibleAssign = true
      this.$nextTick(function () {
        let ids = []
        row.children.forEach(item => {
          item.children.forEach(item => {
            item.children.forEach(item => {
              ids.push(item.id)
            })
          })
        })
        // 显示默认权限
        this.$refs.tree.setCheckedKeys(ids)
      })
    },
    // 权限修改确认
    async rightOk () {
      const rids1 = this.$refs.tree.getCheckedKeys()
      const rids2 = this.$refs.tree.getHalfCheckedKeys()
      const rids = [...rids1, ...rids2]
      const { meta } = await this.$axios.post(`roles/${this.roleId}/rights`, { rids })
      if (meta.status === 200) {
        this.dialogFormVisibleAssign = false
        this.$message.success(meta.msg)
        this.rolesApply()
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 导航栏 */
  .roles .el-breadcrumb {
    height: 40px;
    background-color: #ddd;
    line-height: 40px;
    padding: 0px 10px;
    border-radius: 5px;
  }
  .one {
    border-bottom: 1px dashed orange;
    padding: 10px 0;
  }
  .two {
    .three {
      margin: 4px 5px;
    }
  }
</style>
