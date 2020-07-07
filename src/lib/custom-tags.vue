<template>
  <div class="custom-tags">
    <span class="span-tags" v-for="(item, index) in datas" :key="index" @click="commit(item)" :class="{'span-tags-active':item.checked}">
      <span class="img" v-if="template == 3 & item.icon !==''"><img :src="['/img/icon/'] + [item.icon] + ['.png']"></span>{{item[label]}}
    </span>
    <span v-if="template == 2">
      <span class="span-tags">{{customs.name}}</span>
      <el-input v-model="customs.value" placeholder="请输入内容" class="custom-input-width" size="mini"></el-input>
      <span class="custom-span-tags-template2">天内</span>
    </span>
  </div>
</template>

<script>
export default {
  props:{
    datas:{ //数据列表
      type: Array
    },
    label:{ //对应名称
      type: [String, Number]
    },
    val:{ //对应值
      type: [String, Number]
    },
    template:{//自定义模版
      type: [String, Number],
      default: 1
    },
    modelValue:{//v-model绑定值
      type:[String, Number],
      default:'default'
    }
  },
  model: {
    prop: 'modelValue',
    event: 'returnModelValue'
  },
  components: {
  },
  name: 'vTags',
  data() {
    return {
      customs:{
        name:'自定义',
        checked:false,
        value:''
      }
    }
  },
  watch:{
    'customs.value'(e){
      if(e){
        this.commitCustoms()
        this.datas.forEach((item, index) => {
          item.checked = false
        })
      }
    },
    modelValue(e){
      this.init()
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    //初始化数据
    init(){
      this.datas.forEach((item, index) => {
        if(!item.hasOwnProperty('checked')){
          if(item[this.val] == this.modelValue){
            this.$set(item, "checked", true)
          }else{
            this.$set(item, "checked", false)
          }
        }else{
          if(this.modelValue !=='default'){
            if(item[this.val] == this.modelValue){
              item.checked = true
            }else{
              item.checked = false
            }
          }else{
            if(index === 0){
              item.checked = true
            }else{
              item.checked = false
            }
          }
        }
      })
    },
    commit(check){ //选中传递参数
      this.$emit('returnModelValue', check[this.val]);
      if(this.template == 2) this.customs.value =''
      if(this.template == 4){
        this.$emit('params', check)
      }else{
        this.datas.forEach((item, index) => {
          if(item[this.val] == check[this.val]){
            item.checked = true
            this.$emit('params', item)
          }else{
            item.checked = false
          }
        })
      }
      
    },
    commitCustoms(){  //自定义传递参数
      let DATA = {
        [this.label]:this.customs.name,
        checked:this.customs.checked,
        [this.val]:this.customs.value,
      }
      this.$emit('params', DATA)
    }
  }
}
</script>
<style lang="scss" scoped>
.span-tags{
  padding: 5px 8px;
  margin: 0 10px;
  display:inline-block;
  border-radius: 5px;
  border:1px solid transparent;
  font-size: 12px;
  line-height: 12px;
  cursor: pointer;
  .img{
    margin-right: 5px;
    vertical-align: middle
  }
}
.span-tags-active{
  border:1px solid #0e97eb;
  color: #0e97eb;
}
.custom-input-width{
  width: 150px;
  display: inline-block;
  vertical-align: middle
}
.custom-span-tags-template2{
  font-size: 12px;
  margin-left: 5px;
}
</style>
