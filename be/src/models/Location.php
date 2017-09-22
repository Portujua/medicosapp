<?php

  class Location extends BaseEntity {
    static public $tableName = "Lugar";
    
    private $data;
    
    public function __construct($data = []) {
			$this->data = Util::mergeOptions(self::$base, $data);
		}

		public function get($field = null) {
			return $field == null ? $this->data : $this->data[$field];
    }
    
    public static function getBase() {
			return [
        new Field("id", false),
        new Field("nombre", false),
        new Field("nombre_completo", false, true),
        new Field("tipo", false),
        new Field("lugar"),
        new Field("createdAt"),
        new Field("modifiedAt"),
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