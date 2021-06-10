// 封装自己的Ajax函数，模拟jQuery中的$.ajax函数功能
function itheima(options) {
    // 创建xhr对象
    var xhr = new XMLHttpRequest();

    // 调用函数 把data中传来的参数对象转成 查询字符串
    var qs = resolveData(options.data);

    // 判断用户传入的请求类型，并向服务器发起请求
    if (options.method.toUpperCase() === 'GET') { //将客户传入的method统一转成大写，如果为GET，则发起GET请求
        xhr.open('GET', options.url + '?' + qs); //调用xhr.open()函数
        xhr.send(); //发起GET请求
    } else if (options.method.toUpperCase() === 'POST') { //如果为POST，则发起POST请求
        xhr.open('POST', options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs); //发起POST请求，注意POST方式的请求参数放在send
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText); //把接收到的JSON字符串格式的数据转成对象
            options.success(result); //帮助执行用户的回调函数success，并把接收的数据对象作为参数
        }
    }
}

// 自定义函数 要把客户传进来的data对象 转化成 查询字符串 格式
function resolveData(data) {
    var arr = []; //定义一个数组，用于存储对象转成的键值对数组
    for (var k in data) {
        var str = k + '=' + data[k]; //取当前键值对存成字符串
        arr.push(str); //把当前键值对字符串追加到数组
    }
    // console.log(arr); //调试时临时输出 打印数组
    return arr.join('&'); //把数组转成字符串，数组元素之间以 & 分割
}
var data = {
    name: "张三",
    age: 20,
    gender: '男'
}