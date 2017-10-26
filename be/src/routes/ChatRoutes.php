<?php 

$app->group('/chats', function() use ($app){
	$app->get('/available', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(UserService::getInstance()->listAll($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
  });
});

?>