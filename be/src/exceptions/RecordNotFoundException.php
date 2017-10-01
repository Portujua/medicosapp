<?php
  class RecordNotFoundException extends Exception {
    protected $message;

    public function __construct($message = "Record not found", $code = 0, Exception $previous = null) {
      parent::__construct($message, $code, $previous);
    }
  }
?>