import Vue from 'vue'

Vue.filter('strDate',(timestamp) => {
  if (!timestamp) return ''
   
  var date = new Date(timestamp * 1000)
  
  var y = 1900 + date.getYear()
  var m = "0" + (date.getMonth() + 1)
  var d = "0" + date.getDate()
  var h = "0" + date.getHours()
  var f = "0" + date.getMinutes()
  return `${y}-${m.substring(m.length - 2,m.length)}-${d.substring(d.length - 2,d.length)} ${h.substring(h.length - 2,h.length)}:${f.substring(f.length - 2,f.length)}`
})
