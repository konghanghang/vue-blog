<script>
  import fetch from '../../api/fetch';
  import jsonp from 'jsonp';
  export default {
    components: {},
    data() {
      return {
        
      }
    },
    //https://api.tianapi.com/social/?key=f669dfe0a4154ffebe41572fd4cce38a&num=10&currentPage=1
    computed: {},

    mounted() {
      //fetch.get('https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=1520389229&callback=__jp1')
      
      jsonp('https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=1520389229&callback=__jp1',
        { timeout: 3000 },
        function (err, res) {
          console.log('成功',res)
        })
    },

    methods: {
      validatelt(dom,val) {
        /*dom.setCustomValidity(val)*/
        console.log(456,dom)
      }
    },
    
    watch: {

    }
  };
</script>

<style scoped lang="scss">

</style>