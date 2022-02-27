<template>
    <el-container>
        <el-header>job列表</el-header>
        <el-row>
            <el-button type="primary" @click="queryJob">查询</el-button>
            <el-button type="primary" @click="showAdd">添加</el-button>
        </el-row>
        <el-main>
            <el-table :data="jobList" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="name" label="任务名称"></el-table-column>

                <el-table-column prop="group" label="任务组"></el-table-column>

                <el-table-column prop="className" label="任务类全路径" show-overflow-tooltip></el-table-column>

                <!-- <el-table-column prop="triggerName" label="触发器名称"></el-table-column> -->

                <!-- <el-table-column prop="triggerGroup" label="触发器组"></el-table-column> -->

                <el-table-column prop="cron" label="表达式"></el-table-column>

                <el-table-column prop="status" label="状态" :formatter="statusFormat"></el-table-column>

                <el-table-column prop="prevTime" label="上次执行"></el-table-column>

                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-row>
                            <el-button v-if="scope.row.status==1" size="small" type="warning" @click="handlePause(scope.$index, scope.row)">暂停
                            </el-button>

                            <el-button v-if="scope.row.status==2" size="small" type="info" @click="handleResume(scope.$index, scope.row)">恢复
                            </el-button>

                            <el-button size="small" type="info" @click="doJob(scope.$index, scope.row)">执行
                            </el-button>
                        </el-row>
                        <el-row>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>

                            <el-button size="small" type="success" @click="showUpdate(scope.$index, scope.row)">修改
                            </el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <pagination :pageModel="jobPage"></pagination>



        <el-dialog title="添加任务" :visible.sync="addFormVisible">
            <el-form :model="form">
                <el-form-item label="任务名称" label-width="120px" style="width:50%">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类全路径" label-width="120px" style="width:50%">
                    <el-input v-model="form.className" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务分组" label-width="120px" style="width:50%">
                    <el-input v-model="form.group" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式" label-width="120px" style="width:50%">
                    <el-input v-model="form.cron" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="修改任务" :visible.sync="updateFormVisible">
            <el-form :model="updateform">
                <el-form-item label="表达式" label-width="120px" style="width:50%">
                    <el-input v-model="updateform.cron" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>

    </el-container>
</template>


<script>
import jobApi from "../../api/jobApi"
import pagination from "../../components/pagination"
export default {
    components: {
        pagination
    },
    data() {
      return {
        jobList:[],
        jobPage:{},
        //添加对话框默认可见性
        addFormVisible: false,
        //修改对话框默认可见性
        updateFormVisible: false,
        //提交的表单
        form: {
            name: '',
            className: '',
            group: '',
            cron: ''
        },
        updateform: {
            id: '',
            name: '',
            group: '',
            cron: '',
        }
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
        return '';
      },
      initialization(){
          if(this.$route.name == 'jobs') {
                this.queryJob()
            }
      },
      queryJob(){
          this.$store.commit("updateLoad", true);
            jobApi.queryJob(this.page).then(ret => {
                this.jobList = ret.data.list
                this.jobPage = ret.data.pageModel
                this.$store.commit("updateLoad", false);
            }).catch(err => {
                this.$message.error(err.message);
                this.$store.commit("updateLoad", false);
            })
        },
        showAdd(){
            this.addFormVisible = true;
        },
        add(){
            let data = {
                name: this.form.name,
                className: this.form.className,
                group: this.form.group,
                cron: this.form.cron
            };
            jobApi.addJob(data).then(ret => {
                console.log(ret)
                this.initialization();
                this.addFormVisible = false;
            }).catch(err => {
                this.$message.error(err.message);
            })
        },
        showUpdate(index, row){
            console.log(row)
            this.updateFormVisible = true;
            this.updateform.id = row.id;
            this.updateform.name = row.name;
            this.updateform.group = row.group;
            this.updateform.cron = row.cron;
        },
        update(){
            let data = {
                id: this.updateform.id,
                name: this.updateform.name,
                group: this.updateform.group,
                cron: this.updateform.cron
            };
            jobApi.updateJob(data).then(ret => {
                console.log(ret)
                this.initialization();
                this.updateFormVisible = false;
            }).catch(err => {
                this.$message.error(err.message);
            })
        },
        handleResume(index, row){
            console.log(row)
            jobApi.resumeJob(row.className).then(ret => {
                console.log(ret)
                this.$message.success("恢复成功！");
                this.initialization();
            }).catch(err => {
                this.$message.error(err.message);
            })
        },
        handlePause(index, row){
            console.log(row)
            jobApi.pauseJob(row.className).then(ret => {
                console.log(ret)
                this.$message.success("暂停成功！");
                this.initialization();
            }).catch(err => {
                this.$message.error(err.message);
            })
        },
        handleDelete(index, row){
            jobApi.deleteJob(row.id).then(ret => {
                console.log(ret)
                this.$message.success("删除成功！");
                this.initialization();
            }).catch(err => {
                this.$message.error(err.message);
            })
        },
        doJob(index, row){
            let data = {
                "name": row.name,
                "group": row.group
            };
            jobApi.doJob(data).then(ret => {
                console.log(ret)
                this.$message.success("执行成功！");
            }).catch(err => {
                this.$message.error(err.message);
            })
        },
        dateFormat(row, column,cellValue){
            //var date = row[column.property];
            if (cellValue == undefined || cellValue == null || cellValue === 0) {
                return "-";  
            }
            var date = new Date(cellValue * 1000)
            var y = 1900 + date.getYear()
            var m = "0" + (date.getMonth() + 1)
            var d = "0" + date.getDate()
            var h = "0" + date.getHours()
            var f = "0" + date.getMinutes()
            var s = "0" + date.getSeconds()
            return `${y}-${m.substring(m.length - 2,m.length)}-${d.substring(d.length - 2,d.length)} ${h.substring(h.length - 2,h.length)}:${f.substring(f.length - 2,f.length)}:${s.substring(s.length - 2,s.length)}`
        },
        statusFormat(row, column, cellValue){
            if (cellValue == 1){
                return "正常"
            } else if (cellValue == 2){
                return "暂停"
            } else {
                return "正常";
            }
        }
    },
    watch: {
        $route() {
            this.initialization()
        }
    }
}
</script>