<template>
  <section class="chart-container">
  <el-row >
    <el-col :span="14">
        <p style="text-align: center;font-size: 20px;font-weight:normal;
        font-style: normal;font-family: sans-serif">停牌事件预警top20</p>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" border>
          <el-table-column
            type="index"
            width="50px">
          </el-table-column>
          <el-table-column  prop="stockcode" label="股票代码">
          </el-table-column>
          <el-table-column  prop="name" label="股票名称" >
          </el-table-column>
          <el-table-column prop="probability" label="基于关键字概率">
          <template slot-scope="scope">
              {{scope.row.probability}}%
          </template>
        </el-table-column>
          <el-table-column  prop="nbm" label="基于NBM（预警/不预警）">
          </el-table-column>
        </el-table>
    </el-col>
    <el-col :span="10">
      <el-row>
       <el-col :span="24">
         <div id="chartBar" style="width:100%; height:300px;"></div>
       </el-col>
        <el-col :span="24">
          <div id="chartPie" style="width:100%; height:300px;"></div>
        </el-col>
        <el-col :span="24">
          <div style="width:100%; height:200px;">
            <table  class="my-table" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td>最近入库数量</td>
                <td>{{recently_total}}条</td>
              </tr>
              <tr>
                <td>最近入库时间</td>
                <td>{{date}}</td>
              </tr>
              <tr>
                <td>数据库公告总数</td>
                <td>{{total}}条</td>
              </tr>
            </table>
          </div>
          </el-col>
      </el-row>
    </el-col>
  </el-row>
  </section>
</template>

<script>
    import {getStat,getWarningList} from '../api/api'
    import Echarts from 'echarts'
    export default {
      name: 'HomePage',
      data() {
    return {
      loading:true,
      tableData: [],
      recently_total:0,
      date:'0000-00-00',
      total:0
    }
  },
  methods: {
    drawBarChart() {
      let date =[],count=[],data=[];
      getStat().then(res => {
        res= res.data;
        this.date=res.date;
        this.recently_total=res.recently_total;
        this.total =res.total;
        this.loading=false;
        for(let i = 0,tmp,len= res.data.length; i < len; i++) {
          tmp = res.data[i];
          date.push(tmp.date);
          count.push(tmp.count);
        }
        for(let i = 0,tmp,len= res.warning.length; i < len; i++) {
            tmp = res.warning[i];
            data.push(tmp.name);
          }
        let myBarChart = Echarts.init(document.getElementById('chartBar'));
        myBarChart.setOption({
            title: { text: '最近五天公告数量统计' },
            tooltip: {},
            xAxis: {
              data: date
            },
            yAxis: {},
            series: [
              {
              name: '数量',
              type: 'bar',
              data: count,
              label:{
                show:true,
                normal:{
                  show:true,
                  position:'top'
                }
              },
              color:['#749f83']
            },
              {
                name: '数量',
                type: 'line' ,
                data: count,
                label:{
                  show:true
                },
                color:['#9f2c16']
                }
            ],
          });
        let chartPie = Echarts.init(document.getElementById('chartPie'));
        chartPie.setOption({
            title: {
              text: '停牌对比图',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data:data
            },
            series: [
              {
                name: '数据',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:res.warning,
                itemStyle: {
                  normal:{
                    label:{
                      show:true,
                      formatter: '{b}\n{c}({d}%)'
                    },
                    labelLine:{
                      show:true
                    }
                  },
                  emphasis: {
                    shadowBlur: 11,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });
      },

      )

    },
    getWarning(){
      getWarningList().then(res=>{
        res=res.data;
        this.tableData=res.data;
      }).catch(err=>{
      })
    },
    drawCharts() {
      this.drawBarChart();
    },
  },
  mounted: function () {
    this.drawCharts();
    this.getWarning();

  },

}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  /*&:last-child {*/
     /*margin-bottom: 0;*/
   /*}*/
  }
  .el-col {
    border-radius: 4px;
    padding: 30px 20px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .my-table{
    /*border-right: 1px solid #ebeef5;*/
    border-bottom: 1px solid #ebeef5;
    width: 100%;
    height: 100%;

  }
  .my-table td{
    border-top: 1px solid #ebeef5;
    /*border-left: 1px solid #ebeef5;*/
    width: 100px;
    overflow:hidden

  }
  .chart-container {
    width: 100%;
    float: left;
  }
  /*.chart div {
      height: 400px;
      float: left;
  }*/

</style>
