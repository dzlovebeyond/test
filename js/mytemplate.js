// 自定义 简易模板引擎

// 定义模板处理函数
function template(id, data) { //接收元素id和数据
    var ele = document.getElementById(id).innerHTML; //获取元素
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/; //定义正则 匹配{{}}中的变量名

    var res = null;
    while (res = pattern.exec(ele)) { //通过正则检索{{}}是否有变量名，有则替换，无则结束循环
        ele = ele.replace(res[0], data[res[1]]); //把匹配到的内容使用数据值替换
        // 例如：{{name}} 替换成 data[name]的值
    }
    return ele; //返回替换后的文本
}