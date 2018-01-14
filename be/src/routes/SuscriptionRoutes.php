<?php

$app->group('/suscriptions', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
	Session::setLastToken($authToken);

	/** Get all users */
	$app->get('/', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(SuscriptionService::getInstance()->listAll($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
	});

	$app->post('/:id/register-payment', function($id) use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			SuscriptionService::getInstance()->registerPayment($id, $data)
		);
		$response->setSlim($app);
		echo $response->getResponse();
  });
	
	$app->post('/:id/approve', function($id) use ($app) {
		$response = new Response(
			SuscriptionService::getInstance()->approve($id)
		);
		$response->setSlim($app);
		echo $response->getResponse();
  });
  
  $app->post('/:id/decline', function($id) use ($app) {
		$response = new Response(
			SuscriptionService::getInstance()->decline($id)
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>