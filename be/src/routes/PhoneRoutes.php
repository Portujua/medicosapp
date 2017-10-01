<?php

$app->group('', function() use ($app) {
	$authToken = $app->request->headers->get('Auth-Token');
  Session::setLastToken($authToken);

	/** Get all users */
	$app->get('/patients/:patientId/phones', function($patientId) use ($app) {
    $pageable = new Pageable($app->request->params());

		$response = new Response(PhoneService::getInstance()->list($pageable, $patientId));
		$response->setSlim($app);
		echo $response->getResponse();
  });
  
  $app->get('/phones/:id', function($id) use ($app) {
		$response = new Response(PhoneService::getInstance()->find($id));
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Add new user */
	$app->post('/patients/:patientId/phones', function($patientId) use ($app) {
    $data = json_decode($app->request->getBody(), true);
		$data["dueno"] = $patientId;

		$response = new Response(
			PhoneService::getInstance()->create(Util::createPayload(Phone::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Update user by username */
	$app->put('/phones', function() use ($app) {
    $data = json_decode($app->request->getBody(), true);

		$response = new Response(
			PhoneService::getInstance()->update(Util::putPayload(Phone::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Update user by username */
	$app->patch('/phones/:id', function($id) use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			PhoneService::getInstance()->patch(Util::patchPayload(Phone::class, $id, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});

	/** Delete user by params */
	$app->delete('/phones/:id', function($id) use ($app) {
		$response = new Response(
			PhoneService::getInstance()->delete($id)
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>