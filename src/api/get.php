<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$json='[(
            "id": 1,
			"name": "Shopping",
			"date": "2023-02-15",
			"reminder": false,
			"priority": false,
			"info": "Buy a new dress for HB celebrating"
		},
		{
			"id": 2,
			"name": "Homework",
			"date": "2023-02-16",
			"reminder": false,
			"priority": true
		},
		{
			"id": 3,
			"name": "Essey",
			"date": "2023-03-20",
			"reminder": true,
			"priority": true,
			"info": "The impact of Franc Kafka on society"
		}
	]
';
$filename= "./db.json";

if (file_exists($filename)){
    $contents = file_get_contents($filename);
    $data = json_decode($contents, true);
    echo json_encode($data);
}else { 
    echo  "File not found";
}