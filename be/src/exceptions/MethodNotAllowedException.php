<?php
  class MethodNotAllowedException extends Exception {
    protected $message;

    public function __construct($message = "Method not allowed, probably need to login first.", $code = 0, Exception $previous = null) {
      parent::__construct($message, $code, $previous);
    }
  }
?>