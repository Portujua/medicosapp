<?php 

$app->group('/chats', function() use ($app){
	$app->get('/available', function() use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(UserService::getInstance()->listAll($pageable));
		$response->setSlim($app);
		echo $response->getResponse();
	});
	
	$app->get('/:area/:self/:user', function($area, $self, $user) use ($app) {
		$params = $app->request->params();
		$pageable = new Pageable($params);

		$response = new Response(ChatService::getInstance()->listMessages($area, $self, $user, $pageable,
			isset($params['unread']) ? filter_var($params['unread'], FILTER_VALIDATE_BOOLEAN) : false,
			isset($params['notification']) ? filter_var($params['notification'], FILTER_VALIDATE_BOOLEAN) : false));
		$response->setSlim($app);
		echo $response->getResponse();
	});
	
	$app->post('/', function() use ($app) {
		$data = json_decode($app->request->getBody(), true);

		$response = new Response(
			ChatService::getInstance()->createMessage(Util::createPayload(Message::class, $data))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>