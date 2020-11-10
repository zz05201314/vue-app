<template>
  <div class="product">
    <!-- 搜索框 -->
    <div class="search">
      <template>
        <el-select
          text-align="left"
          v-model="searchValue"
          filterable
          clearable
          remote
          reserve-keyword
          @blur="searchBlur"
          @change="searchTextChange" 
           @clear="clear"
          placeholder="请输入姓名,若不更新,点击搜索按钮"
          :loading="loading"
        >

          <el-option
            v-for="item in searchList"
            :key="item.sId"
            :label="item.name"
            :value="item.name"
            :remote-method="remoteMethod"
          >
          </el-option>
        </el-select>
      </template>
      <!-- 搜索按钮 -->
      <el-button type="primary" icon="el-icon-search" plain @click="searchButton"></el-button>
      <!-- 添加按钮 -->
      <!-- v-haspermission="'add'"  -->
      <el-button type="primary" :disabled="disabled" @click="addStu"
        >添加信息</el-button
      >
    </div>
    <!-- 班级选择 -->
    <div class="select-class">
      <el-form>
        <el-form-item label="选择班级:">
          <el-select v-model="classes" filterable placeholder="请选择">
            <el-option label="全部" value="all"></el-option>
            <el-option
              v-for="(item, index) in classOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="stu-table">
      <el-table :data="stuData" v-loading="loading" border style="width: 100%">
        <!-- 头像框 -->
        <el-table-column
          prop="headimgurl"
          align="center"
          label="头像"
          width="80"
        >
          <template slot-scope="scope">
            <el-avatar
              shape="circle"
              :size="50"
              fit="fill"
              :src="scope.row.headimgurl"
            ></el-avatar>
          </template>
        </el-table-column>
        <!-- 头像框 -->
        <!-- 信息 -->
        <el-table-column label="姓名" prop="name" align="center">
        </el-table-column>
        <el-table-column label="班级" prop="class" align="center">
        </el-table-column>
        <el-table-column
          label="项目"
          prop="productUrl"
          align="center"
          width="100"
        >
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template scope="{ row }">
            <el-button
              size="mini"
              type="primary"
              class="btn"
              icon="el-icon-view"
              @click="$router.push({ path: '/StudentManager/studentProfile' })"
              >查看</el-button
            >
            <el-button
              size="mini"
              type="primary"
              class="btn"
              icon="el-icon-edit"
              @click="editStu(row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              class="btn"
              icon="el-icon-delete"
              @click="deleteStu(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格 -->
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        @current-change="changePage"
        :page-size="5"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- dialog弹出框 -->
    <qf-dialog></qf-dialog>
  </div>
</template>

<script>
import dialog from "../../../components/dialog";
import { getStuList, delStu, searchStu, getClasses } from "@/api";
export default {
  components: {
    "qf-dialog": dialog
  },
  data() {
    return {
      params: {
        class: "",
        count: 5
      },
      dataPage: "", // 页码
      dataCount: 5, // 每页展示的数量
      total: 0, // 总共的数据条数
      classOptions: [],
      disabled: false,
      // 表格的数据对象
      stuData: [],
      // 表格加载动画控制
      loading: true,
      classes: "",
      searchList: [],
      searchValue: "",
      blurSearchValue: "",
      list: []
    };
  },
  methods: {
    // 分页器
    changePage(page) {
      console.log(page);
      this.dataPage = page;
      // 判断是否搜索，更新页面数据
      if (this.searchValue) {
        this.searchButton();
        return;
      }
      this.updateStuTable(this.params);
    },
    searchButton () {
      // 点击搜索按钮
      this.loading = true
      const key = this.searchValue
      const count = this.dataCount
      const page = this.dataPage
      const params = {
        key,
        count,
        page
      }
      searchStu(params)
        .then(res => {
          if (res.data && res.data.state) {
            // 更改表格数据对象
            this.stuData = res.data.data
            this.total = res.data.total // 对total分页总数进行更改
            this.loading = false
          } else {
            this.$message.warning('搜索失败')
          }
        })
    },
    // 搜索框失去焦点 保持输入框的内容
    searchBlur () {
      // 将存储好的输入框值 设置给select组件
      this.searchValue = this.blurSearchValue
    },
        clear (e) { },
    // 搜索框选中值发生变化的事件
    searchTextChange (searchText) {
      this.loading = true
      // console.log(searchText)
      // 再次调用搜索接口
      const key = this.searchValue
      const count = this.dataCount
      const params = {
        key,
        count
      }
      searchStu(params)
        .then(res => {
          if (res.data && res.data.state) {
            console.log(res.data.data)
            // 更改表格数据对象
            this.stuData = res.data.data
            this.total = res.data.total // 对total分页总数进行更改
            this.loading = false
          } else {
            this.$message.warning('搜索失败')
          }
        })
    },
        remoteMethod (query) {
      // 键盘弹起的时候获取输入值 赋值三方变量进行输入框内容存储
      this.blurSearchValue = query
      const key = query
      const count = this.dataCount
      const params = {
        key,
        count
      }
      searchStu(params)
        .then(res => {
          if (res.data && res.data.state) {
            console.log(res.data.data)
            this.searchList = res.data.data
          } else {
            this.$message.warning('搜索失败')
          }
        }).catch(err => {
          this.$message.error('搜索出错')
        })
    },
    // 编辑
    editStu(row) {
      this.$bus.$emit("editStuEvent", row);
    },
    // 删除信息
    deleteStu(row) {
      if (row && row.sId) {
        // 用户确认删除
        this.$confirm("此操作将永久删除该文件, 是否继续?", "删除提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            // 确认删除
            // 调用删除请求
            delStu(row.sId)
              .then(res => {
                console.log(res);
                if (res.data && res.data.state) {
                  // 删除成功
                  this.$message.success("删除成功");
                  this.updateStuTable();
                } else {
                  this.$message.warning("删除失败");
                }
              })
              .catch(err => {
                this.$message.error("删除出错");
              });
          })
          .catch(() => {
            // 用户取消删除
            this.$message("已取消删除");
          });
      } else {
        // 没有row
        this.$message.error("没有传入row对象");
        return;
      }
    },
    // 增加学员信息
    addStu() {
      // 弹出dialog
      this.$bus.$emit("showDialog");
    },
    // 更新表格数据
    updateStuTable(params) {
      this.loading = true;
      // 分页
      params = this.params;
      params.count = this.dataCount || "";
      params.page = this.dataPage || "";
      getStuList(params)
        .then(res => {
          // console.log(res);
          if (res.data && res.data.state) {
            this.stuData = res.data.data;
            this.total = res.data.total; // 数据总数
            this.loading = false;
          } else {
            this.$message.warning("数据获取失败");
            this.loading = false;
          }
        })
        .catch(err => {
          // console.log();
          this.$message.warning("网络错误");
        });
    }
  },
  mounted() {
    // 页面加载获取表格数据
    this.updateStuTable();
    // 更新添加的学员信息
    this.$bus.$on("updateStuTable", () => {
      this.updateStuTable(this.params);
    });
  }
};
</script>
<style scoped>
.search {
  line-height: 60px;
  text-align: left;
  margin: 20px 0;
}
.select-class {
  line-height: 40px;
  text-align: left;
  margin-bottom: 20px;
}
.stu-table .btn {
  width: 65px;
  height: 25px;
  padding: 0;
}
.pagination {
  margin-top: 20px;
}
</style>
