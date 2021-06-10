$(function() { //入口函数
    // 获取评论列表 并渲染到页面中
    getCommentList();

    // 发表评论
    $('#formAddCmt').submit(function(e) {
        e.preventDefault(); //阻止表单默认提交行为
        var data = $(this).serialize(); //获取所有表单元素
        // console.log(data); //临时调试输出

        // 下列两种方式均可实现POST方式提交数据
        // 第一种：$.ajax
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3006/api/addcmt',
            data: data,
            success: function(res) {
                // console.log(res);
            }
        });
        // 第二种：$.post
        // $.post('http://www.liulongbin.top:3006/api/addcmt', data, function(res) {
        // console.log(res);
        // });

        // 提交数据后，刷新评论列表
        getCommentList();

        // 清空表单填写的内容，传统方式需要一个一个元素.value('')方式清空，这里介绍一个技巧，调用form的reset实现一次性全部清空表单填写的数据
        // [0]是将jQuery对象转成原生的DOM对象，这样就可以调用原生的方法reset了
        $('#formAddCmt')[0].reset();
    });



    // 自定义函数 获取评论列表 并渲染到页面中
    function getCommentList() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            // data: {}, //接口文档描述不携带参数，这里可以写个data指定一个空对象，也可以删除不写
            success: function(res) { //通过接口获取到的数据
                // console.log(res); //打印获取到的数据
                // 判断获取数据是否成功 不成功则返回失败消息，中止函数 成功则继续执行后续代码
                if (res.status !== 200) return alert('获取评论列表失败！');
                var rows = []; //用于存储格式化后的数据
                $.each(res.data, function(i, item) {
                    // 注意：字符串不能换行
                    var str = '<li class="list-group-item"><span class="badge bg_yellow">评论时间：' + item.time + '</span><span class="badge bg_blue">评论人：' + item.username + '</span>' + item.content + '</li>';
                    rows.push(str); //每循环一次，就向rows追加一条数据
                });
                // 把数据转成字符串，再追加到页面的ul中
                // empty是先清空ul中的元素 join是将rows转换成字符串
                $('#cmt-list').empty().append(rows.join(''));
            }
        });
    }

});