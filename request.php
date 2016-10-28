<?php
header('content-type:text/html;charset=utf-8');
$dbconfig = array(
    'dsn' => 'mysql:host=localhost;dbname=del_all;charset=utf8',
    'user' => 'root',
    'pwd' => ''
);

try {
    extract($dbconfig);
    $p = (int)$_POST['p'];
    $pageSize = 5;
    $offset = $p * $pageSize;
    $pdo = new PDO($dsn, $user, $pwd);
    $operate = $_POST['operate'];
    switch ($operate){
        case 'getList':
            $limitSql = "select * from user limit $offset,$pageSize";
            $countSql = "select * from user";
            break;
    }
    $stmt = $pdo->prepare($limitSql);
    $stmt->execute();
    $list = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $obj = $pdo->prepare($countSql);
    $obj->execute();
    $total = $obj->rowCount();
    $pageNum = ceil($total / $pageSize);
    echo json_encode(array(
        'list' => $list,
        'offset' => $offset,
        'total' => $total,
        'pageNum' => $pageNum
    ));
} catch (PDOException $e) {
    $e->getMessage();
}