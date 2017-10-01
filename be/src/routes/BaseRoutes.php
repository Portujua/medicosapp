<?php

//$app->map(['OPTIONS'], '.+', function() {});
  $app->options('/:whatever', function($whatever) use ($app) {
    // nothing
  })->conditions(array('whatever' => '.+'));

?>