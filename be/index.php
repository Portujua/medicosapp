<?php
define("STATUS_OK", 200);
define("STATUS_CREATED", 201);
define("STATUS_BAD_REQUEST", 400);
define("STATUS_UNAUTHORIZED", 401);
define("STATUS_FORBIDDEN", 403);
define("STATUS_NOT_FOUND", 404);
define("STATUS_METHOD_NOT_ALLOWED", 405);
define("STATUS_TIMEOUT", 408);
define("STATUS_INTERNAL_SERVER_ERROR", 500);
define("STATUS_NOT_IMPLEMENTED", 501);

require 'vendor/autoload.php';

$config = array(
	'driver'    => 'mysql',
	'host'      => 'localhost',
	'database'  => 'medicos',
	'username'  => 'root',
	'password'  => '21115476',
	'charset'   => 'utf8',
);

new \Pixie\Connection('mysql', $config, 'QB');

require 'src/config/util.php';
require 'src/config/filter.php';
require 'src/config/response.php';
require 'src/config/session.php';
require 'src/config/db.php';
require 'src/routes/base.php';
require 'src/config/pageable.php';

$app = new \Slim\Slim;

// Routes
$dirs = array_filter(glob('src/routes/*'), 'is_dir');

foreach ($dirs as $folder) {
	$files = array_diff(scandir($folder), array('.', '..'));

	foreach ($files as $f)
	{
		if ($f == 'base.php') continue;

		$path = $folder . '/' . $f;

		require $path;
	}
}

$app->response()->header('Content-Type', 'application/json');

$app->run();