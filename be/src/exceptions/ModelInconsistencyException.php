<?php
  class ModelInconsistencyException extends Exception {
    protected $message;

    public function __construct($message = "There's an inconsistency in the model, some field doesn't have the correct type.", $code = 0, Exception $previous = null) {
      parent::__construct($message, $code, $previous);
    }
  }
?>