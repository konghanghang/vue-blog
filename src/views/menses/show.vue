<template>
    <el-container>
        <el-header>Header</el-header>
        <el-main>
            <el-table :data="mensesList" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="openId" label="openId">
                </el-table-column>
                <el-table-column prop="year" label="年份">
                </el-table-column>
                <el-table-column prop="month" label="月份">
                </el-table-column>
                <el-table-column prop="lastMensesTime" label="上一次时间" :formatter="dateFormat">
                </el-table-column>
                <el-table-column prop="mensesTime" label="预计" :formatter="dateFormat">
                </el-table-column>
                <el-table-column prop="trueMensesTime" label="真正" :formatter="dateFormat">
                </el-table-column>
                <el-table-column prop="createDate" label="创建时间" :formatter="dateFormat">
                </el-table-column>
            </el-table>
        </el-main>
        <pagination :pageModel="mensesPage"></pagination>
    </el-container>
</template>


<script>
import menses from "../../api/menses"
import "../../libs/strDate"
import pagination from "../../components/pagination"
export default {
    components: {
        pagination
    },
    data() {
      return {
        mensesList:[],
        mensesPage:{},
      }
    },
    computed: {
        page() {
            return this.$route.params.page
        }
    },
    created() {
        this.initialization()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if((rowIndex + 1) % 2 === 0){
            return 'success-row';
        }
        // else if ((rowIndex + 1) % 2 === 1){
        //     return 'warning-row'
        // }
        return '';
      },
      initialization(){
          if(this.$route.name == 'mensesShow') {
                this.show()
            }
      },
      show(){
          this.$store.commit("updateLoad", true);
            menses.show(this.page).then(ret => {
                console.log(ret)
                this.mensesList = ret.data.data.list
                this.mensesPage = ret.data.data.pageModel
                this.$store.commit("updateLoad", false);
            }).catch(err => {
                this.$message.error(err.data.message);
                this.$store.commit("updateLoad", false);
            })
        },
        dateFormat(row, column,cellValue){
            //var date = row[column.property];
            if (cellValue == undefined || cellValue == null) {
                return "-";  
            }
            var date = new Date(cellValue * 1000)
            var y = 1900 + date.getYear()
            var m = "0" + (date.getMonth() + 1)
            var d = "0" + date.getDate()
            var h = "0" + date.getHours()
            var f = "0" + date.getMinutes()
            return `${y}-${m.substring(m.length - 2,m.length)}-${d.substring(d.length - 2,d.length)} `
        }
    },
    watch: {
        $route() {
            this.initialization()
        }
    }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>