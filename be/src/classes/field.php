<?php
  class Field {
    private $name;
    private $isNull;
    private $isSearcheable;
    private $isDate;
    private $defaultValue;

    public function __construct($name, $isNull = true, $isSearcheable = false, $isDate = false) {
      $this->name = $name;
      $this->isNull = $isNull;
      $this->isSearcheable = $isSearcheable;
      $this->isDate = $isDate;
      $this->defaultValue = null;
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

    public function getDefaultValue() {
      return $this->defaultValue;
    }

    public function setDefaultValue($val) {
      $this->defaultValue = $val;

      // for chaining
      return $this;
    }
  }
?>