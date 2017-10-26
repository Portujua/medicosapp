<?php

$app->group('/areas', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
	Session::setLastToken($authToken);

	$app->get('/', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(AreaService::getInstance()->listAll($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
  });
  
  $app->get('/:id', function($id) use ($app) {
		$response = new Response(AreaService::getInstance()->find($id));
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Add new user */
	$app->post('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			AreaService::getInstance()->create(Util::createPayload(Area::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Update user by username */
	$app->put('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			AreaService::getInstance()->update(Util::putPayload(Area::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Update user by username */
	$app->patch('/:id', function($id) use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			AreaService::getInstance()->patch(Util::patchPayload(Area::class, $id, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Delete user by params */
	$app->delete('/:id', function($id) use ($app) {
		$response = new Response(
			AreaService::getInstance()->delete($id)
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>