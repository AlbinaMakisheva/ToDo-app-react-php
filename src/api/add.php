<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$file_path='./db.json';
$file= file_get_contents($file_path);
$data= json_decode($file, true);


$requestData = json_decode(file_get_contents('php://input'), true);

$name= $requestData["name"];
$date= $requestData["date"];
$info= $requestData["info"];
$reminder= $requestData["reminder"];
$priority= $requestData["priority"];

// Find the highest ID currently in use and increment it to get a new ID
$highest_id = 0;
foreach ($data as $item) {
  if ($item['id'] > $highest_id) {
    $highest_id = $item['id'];
  }
}
$new_id = $highest_id + 1;


// Add the new item to the array

$data[] = array(
    'id' => $new_id,
    'name'=> $name,
    'date'=> $date,
    "info"=> $info,
    'priority'=> $priority,
    'reminder'=> $reminder
  );

file_put_contents($file_path, json_encode($data));
