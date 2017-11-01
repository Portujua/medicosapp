<?php

$app->group('/users', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
	Session::setLastToken($authToken);

	$app->get('/', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(UserService::getInstance()->listAll($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
  });

	/** Get all users */
	$app->get('/patients', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(UserService::getInstance()->listAllPatients($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
	});
	
	$app->get('/medics', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(UserService::getInstance()->listAllMedics($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
  });
  
  $app->get('/:id', function($id) use ($app) {
		$response = new Response(UserService::getInstance()->find($id));
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Add new user */
	$app->post('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			UserService::getInstance()->create(Util::createPayload(User::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Update user by username */
	$app->put('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			UserService::getInstance()->update(Util::putPayload(User::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Update user by username */
	$app->patch('/:id', function($id) use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			UserService::getInstance()->patch(Util::patchPayload(User::class, $id, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Delete user by params */
	$app->delete('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			UserService::getInstance()->delete($data)
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>