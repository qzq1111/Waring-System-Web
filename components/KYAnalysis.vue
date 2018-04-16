<template>
    <el-row>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="80px" :inline="true">
          <el-form-item label="股票代码">
            <el-input v-model="form.keyword" clearable> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="drawCharts">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-tag type="danger">发生重大事项的概率：{{probability}} %</el-tag>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <img :src="imgUrl" style="width:100%; height:300px;">
      </el-col>
      <el-col :span="12">
        <div id="chartLine" style="width:100%; height:300px;"></div>
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
  import Echarts from 'echarts'
  import moment from "moment"
  import {getBulletinCategory,getBulletinStat,getBulletin,getProbability} from '../api/api'
  export default {
    data() {
      let end = new Date();
      let start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
      return {
        imgUrl:"",
        probability:0,
        loading: true,
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
    methods: {
      drawBarChart() {
        let date =[],count=[],points=[];
        getBulletinStat(this.form).then(res=>{
          res =res.data;
          for(let i = 0,tmp,len= res.data.length; i < len; i++) {
            tmp = res.data[i];
            date.push(tmp.name);
            count.push(tmp.value);
          }
          for (let i = 0, tmp, len = res.point.length; i < len; i++) {
            tmp = res.point[i];
            let point = {};
            point.coord = [tmp.date, tmp.total];
            points.push(point)
          }
          let chartBar = Echarts.init(document.getElementById('chartLine'));
          chartBar.setOption({

            title: {
              text: '最近6个月股票公告数概览',
              x: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              name:'日期',
              type: 'category',
              boundaryGap: true,
              data: date
            },
            yAxis: {
              name:'公告数量',
              type: 'value',
              axisLabel: {
                formatter: '{value} 条'
              }
            },
            series: [
              {
                barMaxWidth:30,
                name: '数量',
                type: 'bar',
                data: count,
                label:{
                  normal:{
                    show:true,
                    position:'top'
                  }
                },
                markPoint: {
                  data: points,
                  itemStyle:{
                    normal:{label:{
                        show: true,
                        // position: 'top',
                        formatter:'重大事项'
                      }
                    }
                  }

                }
              },

            ]
          });
          }
        );

      },
      drawPieChart() {
        let data =[];
        getBulletinCategory(this.form).then(res=> {
          res =res.data;
          for(let i = 0,tmp,len= res.data.length; i < len; i++) {
            tmp = res.data[i];
            data.push(tmp.name);
          }
          let chartPie = Echarts.init(document.getElementById('chartPie'));
          chartPie.setOption({
            title: {
              text: '最近6个月公告类别概览',
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
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:res.data,
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
          }
        ).catch(err=>{

        });

      },
      warningProbability(){
        getProbability(this.form).then(res=>{
          res =res.data;
          this.probability= res.pro;
          this.imgUrl=res.url;

        }).catch(err=>{

        })
      },
      drawCharts() {
        this.drawBarChart();
        this.drawPieChart();
        this.onSubmit();
        this.warningProbability()
      },
      onSubmit() {
        getBulletin(this.form).then(res=>{
          this.tableData=res.data.data;
          this.total = res.data.total;
          this.loading =false;
        }).catch(error=>{
          this.loading=true;
        });
      },
      currentChange(v){
        this.form.page =v;
        getBulletin(this.form).then(res=>{
          this.tableData=res.data.data;
          this.total = res.data.total;
          this.loading =false;
        }).catch(error=>{
          this.loading=true;
        });
      }
    },
    mounted: function () {
      this.drawCharts();
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
