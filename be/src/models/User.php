<?php

  class User extends BaseEntity {
    static public $tableName = "Usuario";

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
        new Field("segundo_nombre", true, true),
        new Field("apellido", false, true),
        new Field("segundo_apellido", true, true),
        new Field("tipo_cedula", false),
        new Field("cedula", false, true),
        new Field("email", false, true),
        new Field("usuario", false, true),
        new Field("contrasena", false),
        new Field("fecha_nacimiento", false, true),
        new Field("sexo", false, true),
        new Field("estado_civil", false, true),
        new Field("estado", false),
        new Field("lugar", false),
        new Field("direccion", false, true),
        new Field("cambiar_contrasena"),
        (new Field("email_validado"))->setDefaultValue('false'),
        (new Field("createdAt"))->setDefaultValue(QB::raw('now()')),
        (new Field("modifiedAt"))->setDefaultValue(QB::raw('now()')),
        (new Field("es_medico"))->setDefaultValue(0),
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