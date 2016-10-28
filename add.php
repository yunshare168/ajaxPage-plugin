<?php
header('content-type:text/html;charset=utf-8');
$dbconfig = array(
    'dsn' => 'mysql:host=localhost;dbname=del_all;charset=utf8',
    'user' => 'root',
    'pwd' => ''
);

try {
    extract($dbconfig);
    $pdo = new PDO($dsn, $user, $pwd);
    $username = $_POST['username'];
    $email = $_POST['email'];
    $sex = $_POST['sex'];
    $addSql = "insert into user(username,email,sex) values('{$username}','{$email}','{$sex}')";
    $stmt = $pdo->query($addSql);
    if ($stmt) {
        echo "<script>alert('添加成功')</script>";
        header("Location:index.php");
    } else {
        echo "<script>alert('添加失败');history.back(-1);</script>";
    }
} catch (PDOException $e) {
    $e->getMessage();
}
