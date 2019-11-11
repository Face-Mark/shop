<template>
  <div class="goods">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户 -->
    <el-button plain type="success" style="margin: 10px 0;">添加商品</el-button>
    <!-- 表格 -->
    <el-table :data="goodsList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" :index="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="商品创建时间">
        <template v-slot="scope">
          {{(scope.row.add_time)*1000 | time-moment}}
        </template>
      </el-table-column>
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
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      loading: ''
    }
  },
  created () {
    this.goodsApply()
  },
  methods: {
    // 获取商品列表
    async goodsApply () {
      this.loading = true
      const { meta, data } = await this.$axios.get('goods', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        this.total = data.total
        this.goodsList = data.goods
        setTimeout(() => {
          this.loading = false
        }, 500)
        console.log(data)
      }
    },
    // 表格序号
    index (index) {
      return (this.pagenum - 1) * this.pagesize + index + 1
    },
    handleSizeChange (val) {
      this.pagenum = 1
      this.pagesize = val
      this.goodsApply()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.goodsApply()
    }
  }
}
</script>

<style lang="less" scoped>
/* 导航栏 */
  .goods .el-breadcrumb {
    height: 40px;
    background-color: #ddd;
    line-height: 40px;
    padding: 0px 10px;
    border-radius: 5px;
  }
</style>
