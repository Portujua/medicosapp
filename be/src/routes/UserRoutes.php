<?php 
/**
* User routes 
*
* Contains all user routes
*
* @package Routes
* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
* @since 30/04/2017
* @license MIT
*/

$app->group('/users', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
	Session::setLastToken($authToken);

	/** Get all users */
	$app->get('/', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(UserService::getInstance()->list($pageable));
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