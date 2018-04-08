<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item label="股票代码" @keyup.enter.native="onSubmit">
          <el-input v-model="form.keyword" clearable> </el-input>
        </el-form-item>
        <el-form-item label="公告日期" @keyup.enter.native="onSubmit">
          <el-col :span="11">
            <el-form-item prop="start">
              <el-date-picker type="date" placeholder="开始日期" v-model="form.start" style="width: 100%;" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="end">
              <el-date-picker type="date" placeholder="结束日期" v-model="form.end"
                              format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                              style="width: 100%;" > </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-table  :data="tableData" style="width: 100%" border >
        <el-table-column
          prop="code"
          label="股票代码"
          width="80px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="股票名称"
          width="80px">
        </el-table-column>
        <el-table-column
          prop="date"
          label="公告日期" width="100px">
        </el-table-column>
        <el-table-column
          prop="title"
          label="公告内容">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <a :href=scope.row.url target="_blank" >查看</a>
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-col>
    <el-col :span="24">
      <el-pagination
        background
        layout="prev, pager, next"
        :total=total
        @current-change="currentChange">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
  import {getBulletin} from "../api/api";
  import moment from "moment"
  export default {
    name: "stock-bulletin",
    data() {
      let end = new Date();
      let start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return {
        tableData: [],
        total:0,
        form: {
          keyword: '600000',
          start:  moment(start).format("YYYY-MM-DD"),
          end: moment(end).format("YYYY-MM-DD"),
          page:1,
        }
      }
    },
    methods:{
      onSubmit() {
        getBulletin(this.form).then(res=>{
         this.tableData=res.data.data;
         this.total = res.data.total
        });
      },
      currentChange(v){
        this.form.page =v;
        getBulletin(this.form).then(res=>{
          this.tableData=res.data.data;
          this.total = res.data.total
        });
      }
    },
    mounted: function () {
      this.onSubmit()
    },
  }
</script>


<style scoped>

  a:link {

    font-size: 12px;

    color: #409EFF;

    text-decoration: none;

  }

  a:visited {

    font-size: 12px;

    color: #409EFF;

    text-decoration: none;

  }

  a:hover {

    font-size: 12px;

    color: #409EFF;

    text-decoration: underline;

  }
</style>
