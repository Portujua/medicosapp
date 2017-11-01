<?php

  class Message extends BaseEntity {
    static public $tableName = "Mensaje";

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
        new Field("html", false, true),
        new Field("hora", false),
        new Field("owner", false),
        new Field("user", false),
        new Field("area", false),
        (new Field("leido", false))->setDefaultValue(0),
        (new Field("createdAt"))->setDefaultValue(QB::raw('now()')),
        (new Field("modifiedAt"))->setDefaultValue(QB::raw('now()'))
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