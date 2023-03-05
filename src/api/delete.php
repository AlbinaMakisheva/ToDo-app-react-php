<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$file= file_get_contents("./db.json");
$data= json_decode($file, true);

$requestData = json_decode(file_get_contents('php://input'), true);

$delid= $requestData['id'];

//delete
foreach($data as $key => $value){
    if($value["id"] === $delid){
        array_splice($data, $key, 1);
    }
}

file_put_contents("./db.json", json_encode($data));