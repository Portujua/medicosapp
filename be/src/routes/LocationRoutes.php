<?php

$app->group('/locations', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
	Session::setLastToken($authToken);

	/** Get all users */
	$app->get('/', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(LocationService::getInstance()->list($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
  });
  
  $app->get('/:id', function($id) use ($app) {
		$response = new Response(LocationService::getInstance()->get($id));
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>