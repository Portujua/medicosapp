<?php
  class BadCredentialsException extends Exception {
    protected $message;
    
    public function __construct($message = "Bad login credentials.", $code = 0, Exception $previous = null) {
      parent::__construct($message, $code, $previous);
    }
  }
?>