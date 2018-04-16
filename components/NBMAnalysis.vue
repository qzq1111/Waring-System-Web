<template>
<el-row>
  <el-col :span="24">
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="股票代码">
        <el-input v-model="form.keyword" clearable> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-tag type="danger">发生重大事项的概率：{{probability}} %</el-tag>-->
      <!--</el-form-item>-->
    </el-form>
  </el-col>
  <el-col :span="12">
    <div id="chartPie" style="width:100%; height:300px;"></div>
  </el-col>
  <el-col :span="24">
    <el-table  v-loading="loading" :data="tableData" style="width: 100%" border >
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
        <template slot-scope="scope">
          <div v-if="scope.row.flag === '预警'">
            {{scope.row.title}}
            <el-tag type="danger">{{scope.row.flag}}</el-tag>
          </div>
          <div v-else="scope.row.flag === '不预警'">
            {{scope.row.title}}
            <el-tag type="success">{{scope.row.flag}}</el-tag>
          </div>
        </template>
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

</el-row>
</template>

<script>
    import {getNBM} from '../api/api'
    import Echarts from "echarts";
    export default {
      data() {
        return {
          probability:0,
          loading: true,
          tableData: [],
          total:0,
          form: {
            keyword: '600000',
          }
        }
      },
      methods:{
        onSubmit(){
          getNBM(this.form).then(res=>{
            let flag=[{'name':'预警','value':0},{'name':'不预警','value':0}];
            let flag_=[],date=[];
            res =res.data;
            // this.probability= res.pro;
            this.imgUrl=res.url;
            this.tableData=res.data;
            this.loading=false;
            for(let i = 0,tmp,len= res.data.length; i < len; i++) {
              tmp = res.data[i];
              flag_.push(tmp.flag);
              date.push(tmp.date);
              if (tmp.flag ==='预警'){
                flag[0].value += 1;
              }
              else {
                flag[1].value += 1
              }
            }

            let chartPie = Echarts.init(document.getElementById('chartPie'));
            chartPie.setOption({
              title: {
                text: '最近6个月公告预警饼图',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data:flag_
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data:flag,
                  label: {
                    normal: {
                      show: true,
                      formatter: '{b}: {c}({d}%)'
                    }
                  },
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 11,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',

                    }
                  }
                }
              ]
            });


          }).catch(err=>{
            this.loading=false;
          })
        }
      },
      mounted: function () {

        this.onSubmit()
      },

    }
</script>

<style scoped>
  .el-col {
    padding: 30px 20px;
  }
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
