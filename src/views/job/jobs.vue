<template>
    <el-container>
        <el-header>job列表</el-header>
        <el-row>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="showAdd">添加</el-button>
        </el-row>
        <el-main>
            <el-table :data="jobList" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="jobName" label="任务名称" show-overflow-tooltip></el-table-column>

                <el-table-column prop="jobGroup" label="任务所在组"></el-table-column>

                <el-table-column prop="jobClass" label="任务类名"></el-table-column>

                <el-table-column prop="triggerName" label="触发器名称"></el-table-column>

                <el-table-column prop="triggerGroup" label="触发器所在组"></el-table-column>

                <el-table-column prop="cornExpression" label="表达式"></el-table-column>

                <el-table-column prop="jobState" label="状态"></el-table-column>

                <el-table-column prop="prevFireTime" label="上次执行时间"></el-table-column>

                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-row>
                            <el-button size="small" type="warning" @click="handlePause(scope.$index, scope.row)">暂停
                            </el-button>

                            <el-button size="small" type="info" @click="handleResume(scope.$index, scope.row)">恢复
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
                    <el-input v-model="form.jobClass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务分组" label-width="120px" style="width:50%">
                    <el-input v-model="form.jobGroup" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式" label-width="120px" style="width:50%">
                    <el-input v-model="form.cronExpression" auto-complete="off"></el-input>
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
                    <el-input v-model="updateform.cronExpression" auto-complete="off"></el-input>
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
            jobClass: '',
            jobGroup: '',
            cronExpression: '',
        },
        updateform: {
            jobClass: '',
            jobGroup: '',
            cronExpression: '',
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
                console.log(ret)
                this.jobList = ret.data.data.list
                this.jobPage = ret.data.data.pageModel
                this.$store.commit("updateLoad", false);
            }).catch(err => {
                this.$message.error(err.data.message);
                this.$store.commit("updateLoad", false);
            })
        },
        search(){
            //
        },
        showAdd(){
            this.addFormVisible = true;
        },
        add(){
            let data = {
                jobClass: this.form.jobClass,
                jobGroup: this.form.jobGroup,
                cronExpression: this.form.cronExpression
            };
            jobApi.addJob(data).then(ret => {
                console.log(ret)
                this.initialization();
                this.addFormVisible = false;
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        showUpdate(index, row){
            console.log(row)
            this.updateFormVisible = true;
            this.updateform.jobClass = row.jobClass;
            this.updateform.jobGroup = row.jobGroup;
        },
        update(){
            let data = {
                jobClass: this.updateform.jobClass,
                jobGroup: this.updateform.jobGroup,
                cronExpression: this.updateform.cronExpression
            };
            jobApi.updateJob(data).then(ret => {
                console.log(ret)
                this.initialization();
                this.updateFormVisible = false;
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        handleResume(index, row){
            let data = {
                "jobClass": row.jobClass,
                "jobGroup": row.jobGroup
            };
            jobApi.resumeJob(data).then(ret => {
                console.log(ret)
                this.$message.success("恢复成功！");
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        handlePause(index, row){
            let data = {
                "jobClass": row.jobClass,
                "jobGroup": row.jobGroup
            };
            jobApi.pauseJob(data).then(ret => {
                console.log(ret)
                this.$message.success("暂停成功！");
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        handleDelete(index, row){
            let data = {
                "jobClass": row.jobClass,
                "jobGroup": row.jobGroup
            };
            jobApi.deleteJob(data).then(ret => {
                console.log(ret)
                this.$message.success("删除成功！");
                this.initialization();
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        doJob(index, row){
            let data = {
                "jobClass": row.jobClass,
                "jobGroup": row.jobGroup
            };
            jobApi.doJob(data).then(ret => {
                console.log(ret)
                this.$message.success("执行成功！");
                this.initialization();
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        }

    },
    watch: {
        $route() {
            this.initialization()
        }
    }
}
</script>