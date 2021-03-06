<?php

$app->group('/phone-types', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
	Session::setLastToken($authToken);

	/** Get all users */
	$app->get('/', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(PhoneTypeService::getInstance()->listAll($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
  });
});

?>