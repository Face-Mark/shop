<template>
  <div class="categories">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加分类 -->
    <el-button plain type="success" style="margin: 10px 0;" @click="addShow">添加分类</el-button>
    <!-- 表格 -->
    <el-table :data="cateList" style="width: 100%" v-loading="loading" row-key="cat_id">
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column label="是否有效">
        <template v-slot="scope">{{scope.row.cat_deleted ? '否' : '是'}}</template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" circle plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="form.cat_name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" label-width="80px">
          <el-cascader
            v-model="form.cat_pid"
            :options="options"
            :props="props"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="catOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cateList: [],
      loading: '',
      pagenum: 1,
      pagesize: 10,
      total: 0,
      options: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        checkStrictly: true
      },
      dialogFormVisible: false,
      form: {
        cat_name: '',
        cat_pid: '',
        cat_level: []
      },
      rules: {
        cat_name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created () {
    this.getCate()
  },
  methods: {
    // 获取数据
    async getCate () {
      this.loading = true
      const { meta, data } = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      this.total = data.total
      if (meta.status === 200) {
        this.cateList = data.result
        this.loading = false
      }
    },
    handleSizeChange (val) {
      this.pagenum = 1
      this.pagesize = val
      this.getCate()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getCate()
    },
    // 展示add模态框
    async addShow () {
      this.dialogFormVisible = true
      const { meta, data } = await this.$axios.get('categories?type=2')
      if (meta.status === 200) {
        this.options = data
        console.log(data)
      }
    },
    handleChange (value) {
      this.form.cat_level = [...value]
    },
    // 确认添加
    async catOk () {
      try {
        await this.$refs.form.validate()
        const { meta } = await this.$axios.post('categories', {
          cat_name: this.form.cat_name,
          cat_pid: this.form.cat_pid[this.form.cat_pid.length - 1] || 0,
          cat_level: this.form.cat_level.length
        })
        if (meta.status === 201) {
          this.dialogFormVisible = false
          this.$message.success(meta.msg)
          this.$refs.form.resetFields()
          this.form.cat_pid = []
          this.getCate()
        } else {
          this.$message.error(meta.msg)
        }
      } catch {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 导航栏 */
.categories .el-breadcrumb {
  height: 40px;
  background-color: #ddd;
  line-height: 40px;
  padding: 0px 10px;
  border-radius: 5px;
}
</style>
