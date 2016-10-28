<?php
//header('content-type:text/html;charset=utf-8');
//$dbconfig = array(
//    'dsn' => 'mysql:host=localhost;dbname=del_all;charset=utf8',
//    'user' => 'root',
//    'pwd' => ''
//);
//
//try {
//    extract($dbconfig);
//    $pdo = new PDO($dsn, $user, $pwd);
//    $sql = "select * from user";
//    $stmt = $pdo->prepare($sql);
//    $stmt->execute();
//    $row = $stmt->fetchAll();
//} catch (PDOException $e) {
//    $e->getMessage();
//}
//?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>无刷新分页</title>
    <script src="jquery-1.8.3.min.js" type="text/javascript"></script>
    <script src="ajaxPage-plugin.js" type="text/javascript"></script>
    <script src="delAll-plugin.js" type="text/javascript"></script>
</head>
<style>
    .tablelist {
        border: solid 1px #cbcbcb;
        width: 100%;
        clear: both;
    }
    a{text-decoration: none;}
    .tablelist th {
        background: url(images/th.gif) repeat-x;
        height: 34px;
        line-height: 34px;
        border-bottom: solid 1px #b6cad2;
        text-indent: 11px;
        text-align: left;
    }

    .tablelist td {
        line-height: 35px;
        text-indent: 11px;
        border-right: dotted 1px #c7c7c7;
    }

    .tablelink {
        color: #056dae;
    }

    .tablelist tbody tr.odd {
        background: #f5f8fa;
    }

    .tablelist tbody tr:hover {
        background: #e5ebee;
    }
    .curr-page{color:#9b9a9a;width: 1150px; padding-right: 50px; height: 26px;text-align: right;margin: 30px auto; }
    .curr-page a{border: #ccc 1px solid;padding: 4px 8px;margin: 2px; color: #606066}
    .curr-page a:hover{border: #f90 1px solid;}
    .curr-page a.dangq{border: #ff8800 1px solid;color: #333;}
    .current{  border: solid 1px #ff8800;  padding: 4px 8px;font-weight: bold;margin: 2px;color: #ff8800;display: inline;}
    .rows{line-height: 30px;}
</style>
<body>
<table class="tablelist">
    <thead>
    <tr style="align: center; font-size: 16px;">
        <th>
            <input type="checkbox" name="all" class="all">编号<i class="sort"><img src="images/px.gif"></i>&nbsp;
            <a href="javascript:void (0);" class="del-all-btn"><font color="red">批量删除</font></a>
        </th>
        <th>姓名</th>
        <th>邮箱</th>
        <th>性别</th>
    </tr>
    </thead>

    <tbody class="list">

    </tbody>
</table>
<br>
<div class="curr-page"></div>
<br>
<form action="add.php" method="post" style="margin-top: 50px;">
    姓名：<input type="text" name="username"><br><br>
    邮箱：<input type="text" name="email"><br><br>
    性别：<input type="text" name="sex"><br><br>
    <input type="submit" 　value="添加">
</form>
</body>
</html>
<script>
    $(function () {
        /*无刷新分页*/
        new AjaxPage({
            "operate" : "getList",
            "ajaxBtnClass": "",
            "pageClass": $('.curr-page'),
            "listClass": $('.list'),
            "ajaxUrl": "request.php",
            "imgUrl" : "images"
        });

        /*批量删除*/
        new DelAll({
            "allClass":$('.all'),              //全选复选框的class名
            "listClass":$('.cBox'),            //复选框列的class名
            "delAllBtn":$('.del-all-btn'),     //批量删除按钮的class名
            "delUrl":"delAll.php",             //ajax的url
            "listCheckboxName":"ids[]",        //列复选框的name,数组的形式
            "imgUrl":"images"                   //图片的地址
        });
    });
</script>