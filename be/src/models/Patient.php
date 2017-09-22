<?php

  class Patient extends BaseEntity {
    static public $tableName = "Paciente";

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
        new Field("email_validado"),
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