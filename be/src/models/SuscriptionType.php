<?php

  class SuscriptionType extends BaseEntity {
    static public $tableName = "Tipo_Suscripcion";
    
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
        new Field("nombre", false, true),
        new Field("costo", false, true),
        new Field("descripcion", true, true),
        new Field("num_dias", false, true),
        new Field("cant_cons", false, true),
        (new Field("estado", false))->setDefaultValue(1),
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