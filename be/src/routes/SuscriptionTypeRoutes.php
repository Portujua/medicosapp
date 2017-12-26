<?php

$app->group('/suscription-types', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
	Session::setLastToken($authToken);

	/** Get all users */
	$app->get('/', function() use ($app) {
		$pageable = new Pageable($app->request->params());
		$active = isset($app->request->params()['active']);

		$response = new Response(SuscriptionTypeService::getInstance()->listAll($pageable, $active));
		$response->setSlim($app);
		echo $response->getResponse();
	});

	$app->get('/:id', function($id) use ($app) {
		$response = new Response(SuscriptionTypeService::getInstance()->find($id));
		$response->setSlim($app);
		echo $response->getResponse();
	});
	
	$app->post('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			SuscriptionTypeService::getInstance()->create(Util::createPayload(SuscriptionType::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	$app->patch('/:id', function($id) use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			SuscriptionTypeService::getInstance()->patch(Util::patchPayload(SuscriptionType::class, $id, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>