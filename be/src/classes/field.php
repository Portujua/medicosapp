<?php
  class Field {
    private $name;
    private $isNull;
    private $isSearcheable;
    private $isDate;

    public function __construct($name, $isNull = true, $isSearcheable = false, $isDate = false) {
      $this->name = $name;
      $this->isNull = $isNull;
      $this->isSearcheable = $isSearcheable;
      $this->isDate = $isDate;
    }

    public function getName() {
      return $this->name;
    }

    public function isNull() {
      return $this->isNull;
    }

    public function isSearcheable() {
      return $this->isSearcheable;
    }

    public function isDate() {
      return $this->isDate;
    }
  }
?>