<template >
  <el-container style="border: 1px solid #eee">

    <el-container>
      <el-header >
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/">
            <i class="el-icon-menu"> </i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item index="/stockbulletin">
            <i class="el-icon-document"> </i>
            <span slot="title">个股公告详细信息</span>
          </el-menu-item>
          <el-menu-item index="/kyanalysis">
            <i class="el-icon-tickets"> </i>
            <span slot="title">基于关键字预测</span>
          </el-menu-item>
          <el-menu-item index="/nbanalysis">
            <i class="el-icon-tickets"> </i>
            <span slot="title">基于NBM预测</span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
    import ElHeader from "element-ui/packages/header/src/main";

    export default {
      components: {ElHeader},
      name: "home",
      data() {
        return {}
      },
    }
</script>

<style scoped>
  .el-header {
    line-height: 100px;
  }
</style>
