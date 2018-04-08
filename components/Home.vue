<template >
  <el-container style="border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>秦智强</span>
    </el-header>
    <el-container>
      <el-aside width="150px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="$route.path" class="el-menu-demo" router>
          <el-menu-item index="/">
            <i class="el-icon-menu"> </i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item index="/stockbulletin">
            <i class="el-icon-document"> </i>
            <span slot="title">个股公告</span>
          </el-menu-item>
          <el-menu-item index="/stockcharts">
            <i class="el-icon-tickets"> </i>
            <span slot="title">图表</span>
          </el-menu-item>
          <!--<el-menu-item index="/associationrule">-->
            <!--<i class="el-icon-tickets"> </i>-->
            <!--<span slot="title">关联规则</span>-->
          <!--</el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
    export default {
      name: "home",
      data() {
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
          tableData: Array(20).fill(item)
        }
      },
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    min-height: 90vh;
  }
</style>
