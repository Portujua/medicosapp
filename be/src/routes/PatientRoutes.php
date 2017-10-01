<?php

$app->group('/patients', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
	Session::setLastToken($authToken);

	/** Get all users */
	$app->get('/', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(PatientService::getInstance()->list($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
  });
  
  $app->get('/:id', function($id) use ($app) {
		$response = new Response(PatientService::getInstance()->find($id));
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Add new user */
	$app->post('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			PatientService::getInstance()->create(Util::createPayload(Patient::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Update user by username */
	$app->put('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			PatientService::getInstance()->update(Util::putPayload(Patient::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Update user by username */
	$app->patch('/:id', function($id) use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			PatientService::getInstance()->patch(Util::patchPayload(Patient::class, $id, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Delete user by params */
	$app->delete('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			PatientService::getInstance()->delete($data)
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>