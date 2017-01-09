<?php
  if($_GET["code"]) {
    $post_values = [
      'clientId' => 'bookiFrontend',
      'clientSecret' => 'hereComesYourSecret',
      'code' => $_GET["code"],
      'grant_type' => 'authorization_code'
    ];

    $curl = curl_init('//api.booki.me/oauth2/token');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_values);

    $response = curl_exec($curl);
    curl_close($curl);


    setcookie('bookiUserToken', $response['token'], $response['expires'], "/");
    setcookie('bookiUserId', $response['userId'], $response['expires'], "/");
    exit();
  }
?>
