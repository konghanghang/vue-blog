<template>
	<el-row class="pagination">
		<el-pagination
		  background
		  @current-change="handleCurrentChange"
		  layout="prev, pager, next"
		  :page-size="page.pageSize"
		  :current-page="page.pageNum"
		  :total="page.total">
		</el-pagination>
	</el-row>
</template>

<script>
export default {
  props:['pageModel'],
  data() {
    return {
      page:{}
    };
  },
  
  computed: {
  	
  },

  created() {
   	//初始化分页参数
   	if(this.pageModel.total) {
		   this.page = this.pageModel
   	} else {
   		this.page = {
   			pageSize:5,
   			pageNum:1,
   			total:10
   		}
	   }
  },

  methods: {
    handleCurrentChange(page) {
    	let query = Object.assign({},this.$route.query)
    	let params = Object.assign({},this.$route.params)
    	params.page = page
    	
    	this.$router.push({
    		name:this.$route.name,
    		query:query,
    		params:params
    	})
    }
  },
  
  watch: {
  	'pageModel'() {
  		this.page = this.pageModel
  	}
  }
};
</script>

<style scoped lang="scss">
.pagination {
	margin-top: 50px;
	margin-bottom: 20px;
}
</style>