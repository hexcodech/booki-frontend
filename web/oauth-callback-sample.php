<?php

$config = json_decode(file_get_contents("config.json"));
define("CLIENT_SECRET", "");

if(empty($_GET["code"])){
	header("Location: /");
	die();
}


$curl = curl_init($config->API_URL . "/oauth2/token");
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(array(
	"clientId"      => $config->CLIENT_ID,
	"clientSecret"  => CLIENT_SECRET,
	"code"          => $_GET["code"],
	"grant_type"    => "authorization_code"
)));

$response = curl_exec($curl);
$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if($response && $status == 200){
	$json = json_decode($response);
	$token = $json->access_token;

	header("Location: /auth/callback?token=" . $token->token . "&clientId=" . $token->clientId . "&userId=" . $token->userId . "&expires=" . $token->expires);
}else{
	header("Location: /?status=" . $status . "&response=" . $response);
}


?>