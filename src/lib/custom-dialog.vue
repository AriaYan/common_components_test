<template>
  <div class="dialog" v-show="visibleDailog" @mousedown="drag">
    <div class="dialog-mask"></div>
    <div class="dialog-box" ref="contents">
      <div class="dialog-close" @click="visibleDailog = false"><i class="hdc-icon-close"></i></div>
      <slot></slot> <!-- 放置包含内容 -->
    </div>
  </div>
</template>

<script>
export default {
  props:{
    visible:{//是否显示
      type: Boolean
    },
    width:{
      type:[String, Number],
      default: '600'
    }
  },
  name: 'vCustomDialog',
  data() {
    return {
      visibleDailog:false //双向绑定值-是否显示dialog
    }
  },
  watch:{
    'visible'(e){
      this.visibleDailog = e
      this.initPosition()
    },
    visibleDailog(e){
      this.$emit("update:visible", e); //双向绑定
    }
  },
  mounted(){
    this.initPosition()
  },
  methods:{
    //鼠标按下拖拽
    drag(event){
      if(event.target.className != 'dialog-title' && event.target.className != 'dialog-content') return
      let oDiv = this.$refs['contents']
      let disX = event.clientX - oDiv.offsetLeft
      let disY = event.clientY - oDiv.offsetTop
      document.onmousemove = function(e){
        e.preventDefault();
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        oDiv.style.left = l + "px"
        oDiv.style.top = t + "px"
      } 
      document.onmouseup = function(){
          document.onmousemove = null;
          document.onmouseup = null;
      }
    },
    // 初始化位置
    initPosition(){
      let oDiv = this.$refs['contents']
      let disX = (document.documentElement.clientWidth - this.width)/2
      let disY = (document.documentElement.clientHeight  - 600)/2
      oDiv.style.left = disX + "px"
      oDiv.style.width = this.width + "px"
      oDiv.style.top = disY + "px"
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2500;
  width: 100%;
  height: 100%;
  font-size: 14px;
  .dialog-mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
  }
  .dialog-box{
    position: absolute;
    // left: 50%;
    // top: 50%;
    // margin: -300px 0 0 -300px;
    // width: 600px;
    height: 600px;
    background: #fff;
    border-radius: 8px;
    .dialog-close{
      position: absolute;
      right: 20px;
      top:18px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      color: #999;
    }
  }
}
</style>
