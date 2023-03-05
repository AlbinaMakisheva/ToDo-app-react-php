<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$file_path = './db.json';
$data = json_decode(file_get_contents($file_path), true);

$requestData = json_decode(file_get_contents('php://input'), true);

$id= $requestData["id"];
$name= $requestData["name"];
$date= $requestData["date"];

// Find the item with the given ID and update its properties
// & -reference to change directly
foreach ($data as &$item) {
    if ($item["id"] === $id) {
        $item["name"] = $name;
        $item["date"] = $date;
        break;
    }
}

// Write the modified data back to the file
file_put_contents($file_path, json_encode($data));
?>