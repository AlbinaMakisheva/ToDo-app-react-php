<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$db= json_decode(file_get_contents('./db.json'), true);

$requestData= json_decode(file_get_contents('php://input'), true);

$id= $requestData['id'];
$reminder= $requestData['reminder'];

foreach ( $db as &$item){
    if ($item['id'] === $id){
        $item['reminder'] = !$reminder;
        break;
    }
}

file_put_contents('./db.json', json_encode($db));