const requireComponents = require.context('./', true, /\.vue/) // 批量 require 组件

let customComponents = {}
customComponents.install = function (Vue, options) {
  Vue.prototype.$msg = '这是一个msg！'
  Vue.prototype.$myMethod = function (arr) {
    if (arr.length < 0) {
      return false
    } else {
      arr = arr.join('连接你我')
      return arr
    }
  }
  requireComponents.keys().forEach(fileName => {// 循环获取组件信息
    // 组件实例
    const reqCom = requireComponents(fileName)
    // 组件挂载
    Vue.component(reqCom.default.name, reqCom.default || reqCom)  //reqCom.default.name 组件的name属性
  })
}
//注册自定义组件
export default customComponents