<?php

  class Phone extends BaseEntity {
    static public $tableName = "Telefono";

    private $data;
    
    public function __construct($data = []) {
			$this->data = Util::mergeOptions(Util::fieldArrayToStringArray(self::getBase()), $data);
		}

		public function get($field = null) {
			return $field == null ? $this->data : $this->data[$field];
		}

		public static function getBase() {
			return [
        (new Field("id", false))->setDefaultValue(Util::uuid()),
        new Field("tlf", false, true),
        new Field("tipo", false),
        new Field("dueno"),
			];
    }

		public static function getSearcheableFields() {
			$sfs = array();

			foreach (self::getBase() as $f) {
				if ($f->isSearcheable()) {
					$sfs[] = $f->getName();
				}
			}

			return $sfs;
		}
  }

?>