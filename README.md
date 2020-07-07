# hdcloud-components

> hdcloud 通用组件库

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

``` bash
传入子组件参数说明：
参数名称    参数类型          是否必填    描述
datas       Array             是        数据列
val         String            是        数据绑定的值，用于判断执行选中操作
label       String            是        数据绑定的值，用于各个值外露显示
template    String,Number     否        (默认1）	模版（1 默认，2含自定义输入框，3含红绿灯）
v-model     String,Number     否        (datas无checked参数时必须传值）	

父组件接受参数说明：
参数名称	参数类型	是否必填	描述
params	 Object	   是	      选中状态的整行数据


组件使用示例：
<v-tags
@params="paramsGet"
:datas="data"
template='2'
val='value'
label="name" />


数据示例：
data:[
  {name: '全部', value: '', checked: true},
  {name: '7天内', value: '7', checked: false},
  {name: '15天内', value: '15', checked: false},
  {name: '30天内', value: '30', checked: false},
  {name: '30天以上', value: '30up', checked: false},
]

注意事项：
未绑定v-model时，数据列必须包含checked参数（组件用于显示选中状态）。
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
