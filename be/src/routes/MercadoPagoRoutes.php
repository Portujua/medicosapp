<?php

// $app->group('/mercadopago', function() use ($app, $mp){
// 	// Locations are safe content
// 	// $authToken = $app->request->headers->get('Auth-Token');
// 	// Session::setLastToken($authToken);

// 	/** Get all users */
// 	$app->get('/api_info', function() use ($app, $mp) {
// 		$response = new Response([
//       "app_id" => $mp['id'],
//       "public_key" => $mp['public_key']
//     ]);

// 		$response->setSlim($app);
// 		echo $response->getResponse();
//   });

//   $app->get('/summary', function() use ($app, $mp) {
//     // Load my user id
//     $me = ($mp['app']->get("/users/me"))['response'];
//     $id = $me['id'];

//     $today = new DateTime;

//     $thisMonthDateISO = ["first" => TimeUtils::getFirstDayOfMonth($today, true), "last" => TimeUtils::getLastDayOfMonth($today, true)];
//     $pastMonthDateISO = ["first" => TimeUtils::getFirstDayOfPastMonth($today, true), "last" => TimeUtils::getLastDayOfPastMonth($today, true)];

//     $balance = ($mp['app']->get("/users/$id/mercadopago_account/balance"))['response'];
//     $thisMonth = ($mp['app']->get("/v1/balance/history", array("range" => "date_created", "begin_date" => $thisMonthDateISO['first'], "end_date" => $thisMonthDateISO['last'])))['response']; 
//     $pastMonth = ($mp['app']->get("/v1/balance/history", array("range" => "date_created", "begin_date" => $pastMonthDateISO['first'], "end_date" => $pastMonthDateISO['last'])))['response']; 
    
//     $summary = array(
//       "balance" => $balance,
//       "thisMonth" => $thisMonth,
//       "pastMonth" => $pastMonth
//     );

// 		$response = new Response($summary);

// 		$response->setSlim($app);
// 		echo $response->getResponse();
//   });
// });

?>