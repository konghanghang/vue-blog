<template>
  <div>
    <el-row type="flex" class="row-bg">
      <el-col :span="24">
        <div class="exam-title">试题列表</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="search">
      <el-col :span="24" class="search-body">
        <div class="search-item">
          <div class="search-lable">名称:</div>
          <div class="search-input">
            <el-input
              placeholder="请输入内容"
              v-model="search.title"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="search-item">
          <div class="search-lable">时间:</div>
          <div class="search-input">
            <el-date-picker
              v-model="search.date"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="search-item">
          <div class="search-lable">
            <el-button type="primary" @click="list">查询</el-button>
          </div>
          <div class="search-lable">
            <el-button type="primary" @click="addExamFormVisible = true"
              >添加</el-button
            >
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="list">
      <el-col :span="24">
        <el-table :data="examList" style="width: 100%">
          <el-table-column prop="id" label="id" width="180"></el-table-column>
          <el-table-column
            prop="title"
            label="试卷名称"
            width="180"
          ></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <div class="table-operator">
                    <el-button type="primary" icon="el-icon-edit" circle @click="showEdit(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteExam(scope.row.id)"></el-button>
                </div>
              </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <pagination
      :pageModel="examPage"
      noRouter="true"
      @change-page="changePage"
    ></pagination>
    <el-dialog title="添加试题" :visible.sync="addExamFormVisible">
      <div>
        <el-button type="primary" @click="addSubject">添加题目</el-button>
      </div>
      <el-form :model="form">
        <el-form-item label="试题简介" label-width="120px">
          <el-input
            class="dialog-input"
            v-model="form.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <hr />
        <div v-for="(item, index) in form.exams" :key="index">
          <el-form-item label="题目描述" label-width="120px">
            <el-input
              class="dialog-input"
              v-model="form.exams[index].title"
              autocomplete="off"
            ></el-input>
            <el-button
              v-if="index != 0"
              class="delete-exam"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteExam(index)"
            ></el-button>
          </el-form-item>
          <el-form-item label="选择类型" label-width="120px">
            <el-select
              v-model="form.exams[index].type"
              placeholder="请选择题目类型"
              @change="changeType($event, index)"
            >
              <el-option label="单选" value="1"></el-option>
              <el-option label="多选" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选项" label-width="120px">
            <el-button type="primary" @click="addOptions(index)"
              >添加</el-button
            >
          </el-form-item>
          <div
            v-for="(option, optionIndex) in form.exams[index].answers"
            :key="optionIndex"
          >
            <el-form-item label-width="120px">
              <el-input
                class="dialog-input"
                v-model="form.exams[index].answers[optionIndex]"
                autocomplete="off"
              ></el-input>
              <el-button
                v-if="optionIndex != 0"
                class="delete-exam"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteOption(index, optionIndex)"
              ></el-button>
            </el-form-item>
          </div>
          <el-form-item label="正确答案" label-width="120px">
            <el-select
              v-if="form.exams[index].type == 1"
              v-model="form.exams[index].oneTrueAnswer"
              placeholder="请选择正确答案"
            >
              <el-option
                v-for="(option, optionIndex) in form.exams[index].answers"
                :key="optionIndex"
                :label="option"
                :value="optionIndex"
              ></el-option>
            </el-select>
            <el-select
              v-else
              v-model="form.exams[index].multiTrueAnswer"
              multiple
              placeholder="请选择正确答案"
            >
              <el-option
                v-for="(option, optionIndex) in form.exams[index].answers"
                :key="optionIndex"
                :label="option"
                :value="optionIndex"
              ></el-option>
            </el-select>
          </el-form-item>
          <hr />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addExamFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addExam">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import exam from '../../api/exam'
import '../../libs/strDate'
import pagination from '../../components/pagination'
export default {
  components: {
    pagination,
  },
  data() {
    return {
      examList: [],
      examPage: {},
      tableData: [],
      addExamFormVisible: false,
      search: {
        title: '',
        date: '',
      },
      form: {
        title: '',
        exams: [
          {
            title: '',
            type: '1',
            answers: [''],
            oneTrueAnswer: '',
            multiTrueAnswer: [],
          },
        ],
      },
    }
  },
  computed: {
    page() {
      return this.$route.params.page
    },
  },
  created() {
    this.list()
  },
  methods: {
    addSubject() {
      this.form.exams.push({
        title: '',
        type: '1',
        answers: [''],
        oneTrueAnswer: '',
        multiTrueAnswer: [],
      })
    },
    addOptions(index) {
      console.log('options', index)
      this.form.exams[index].answers.push('')
    },
    deleteExam(index) {
      console.log('delete', index)
      this.form.exams.splice(index, 1)
    },
    changeType(val, index) {
      console.log('change', val, index)
    },
    deleteOption(index, optionIndex) {
      this.form.exams[index].answers.splice(optionIndex, 1)
    },
    addExam() {
      for (let i = 0; i < this.form.exams.length; i++) {
        let obj = this.form.exams[i]
        if (obj['type'] == 1) {
          obj['trueAnswer'] = obj['oneTrueAnswer']
        } else {
          obj['trueAnswer'] = JSON.stringify(obj['multiTrueAnswer'])
        }
        obj['options'] = JSON.stringify(obj['answers'])
      }
      console.log(this.form)
      exam
        .addExam({ info: this.form })
        .then((ret) => {
          this.addExamFormVisible = false
          if (this.form.id) {
              this.$message.success('修改成功！')
          } else{
            this.$message.success('添加成功！')
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    list(pageNum) {
      let param = {
        title: this.search.title,
        begin: this.search.date ? this.search.date[0] : undefined,
        end: this.search.date ? this.search.date[1] : undefined,
        pageModel: {
          pageNum: pageNum || 1,
          pageSize: this.examPage.pageSize ? this.examPage.pageSize : 10,
        },
      }
      exam
        .list(param)
        .then((ret) => {
          this.examList = ret.data.list
          this.examPage = ret.data.pageModel
          // this.$message.success("执行成功！");
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    changePage(pageNum) {
      this.list(pageNum)
    },
    showEdit(id) {
        exam.getById(id).then((ret) => {
          let exams = ret.data.exams
          for (let i = 0; i < exams.length; i++) {
            let obj = exams[i]
            obj['answers'] = JSON.parse(obj['options'])
            if (obj['type'] == 1) {
                obj['oneTrueAnswer'] = parseInt(obj['trueAnswer'])
            } else {
                obj['multiTrueAnswer'] = JSON.parse(obj['trueAnswer'])
            }
           }
           this.form = ret.data
          this.addExamFormVisible = true
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    deleteExam(id) {
        this.$message.success('删除功能暂未实现！')
    }
  },
  watch: {
    $route() {
      this.initialization()
    },
  },
}
</script>

<style>
.exam-title {
  height: 80px;
  font-size: 20px;
  text-align: center;
  line-height: 80px;
}
.search-body {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
}
.search-item {
  display: flex;
  margin-right: 20px;
  margin-bottom: 20px;
}
.search-lable {
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}
.dialog-input {
  width: 50%;
}
.delete-exam {
  margin-left: 20px;
}
.table-operator {
    display: flex;
}
</style>
