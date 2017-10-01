<?php
	function loadFiles($folder) {
		$files = array_filter(glob($folder), 'is_file');
		
		foreach ($files as $f)
		{
			if (strpos($f, 'BaseEntity.php') !== false) continue;

			$path = $f;
			$GLOBALS['includes'][] = $path;
		}
	}

	function load($folders) {
		if (is_string($folders)) {
			$folders = [$folders];
		}

		foreach ($folders as $folderPath) {
			loadFiles($folderPath);

			// Load files inside folders
			$dirs = array_filter(glob($folderPath), 'is_dir');
			
			foreach ($dirs as $folder) {
				loadFiles($folder."/*");
			}
		}
	}

	$GLOBALS['includes'] = array();

	include 'vendor/autoload.php';
	include 'src/models/BaseEntity.php';

	// Utils
	load([
		"src/utils/*",
		"src/exceptions/*",
		"src/config/*",
		"src/classes/*",
		"src/models/*",
		"src/repositories/*",
		"src/interfaces/*",
		"src/services/*",
	]);

	foreach ($GLOBALS['includes'] as $inc) {
		require $inc;
	}

	$GLOBALS['includes'] = array();

	new \Pixie\Connection('mysql', Db::getConfiguration(), 'QB');
	$app = new \Slim\Slim;

	// Routes	
	load("src/routes/*");

	foreach ($GLOBALS['includes'] as $inc) {
		require $inc;
	}

	//$app->response()->header('Content-Type', $app->request->headers->get('Content-Type'));
	$app->response()->header('Content-Type', 'application/json');
	$app->response()->header('Access-Control-Allow-Origin', '*');
	$app->response()->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	$app->response()->header('Access-Control-Allow-Headers', 'Auth-Token, Content-Type');

	$app->run();