<?php

  class Patient extends BaseEntity {
    static public $base = [
      "id" => null,
      "nombre" => null,
      "segundo_nombre" => null,
      "apellido" => null,
      "segundo_apellido" => null,
      "tipo_cedula" => null,
      "cedula" => null,
      "email" => null,
      "usuario" => null,
      "contrasena" => null,
      "fecha_nacimiento" => null,
      "sexo" => null,
      "estado_civil" => null,
      "estado" => null,
      "lugar" => null,
      "direccion" => null,
      "cambiar_contrasena" => null,
      "email_validado" => null,
      "createdAt" => null,
      "modifiedAt" => null
    ];

    static public $searcheableFields = [
      "nombre", "segundo_nombre", "apellido", "segundo_apellido", "cedula", "email", "usuario", "fecha_nacimiento", "sexo", "estado_civil", "direccion"
    ];

    static public $pk = "id";
    static public $tableName = "Paciente";
    static public $table;

    private static $instance = null;
    
    private function __construct() {
      //parent::__construct();
      Patient::$table = QB::table(Patient::$tableName);
    }
  
    public static function getInstance() {
      if (Patient::$instance == null) {
        Patient::$instance = new Patient();
      }
  
      return Patient::$instance;
    }

    static public function createPayload($vals = [], $addNew = false) {
      return Util::mergeOptions(Patient::$base, $vals, $addNew);
    }

    static public function putPayload($data) {
      return Util::mergeOptions(Patient::$base, $data, true);
    }

    static public function patchPayload($pkVal, $data) {
      $patch = Util::mergeOptions([], [Patient::$pk => $pkVal], true);
      return Util::mergeOptions($patch, $data, true);
    }

    public function list($pageable) {
      try {
        // Base query
        $query = Patient::$table->select(array(
          Patient::$tableName . ".id",
          Patient::$tableName . ".nombre",
          Patient::$tableName . ".segundo_nombre",
          Patient::$tableName . ".apellido",
          Patient::$tableName . ".segundo_apellido",
          Patient::$tableName . ".tipo_cedula",
          Patient::$tableName . ".cedula",
          Patient::$tableName . ".email",
          Patient::$tableName . ".usuario",
          Patient::$tableName . ".fecha_nacimiento",
          Patient::$tableName . ".sexo",
          Patient::$tableName . ".estado_civil",
          Patient::$tableName . ".estado",
          Patient::$tableName . ".direccion",
          Patient::$tableName . ".lugar",
          QB::raw("concat(Paciente.nombre, ' ', Paciente.apellido) as nombre_completo")
        ));
  
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (Patient::$searcheableFields as $sf) {
            $query->orWhere($sf, 'like', '%'.$pageable->getKeyword().'%');
          }
        }
  
        // Add the filters if available
        foreach ($pageable->getFilters() as $filter) {
          $query->where($filter->getField(), $filter->getOperator(), $filter->getValue());
        }
        
        // Add the page
        $query->limit($pageable->getSize())->offset($pageable->getOffset());
  
        // Run the final query
        $result = Db::getInstance()->run($query);
  
        // Set the total elements for the pageable
        $pageable->setTotalElements(Patient::$table->count());

        // Add the location
        foreach ($result as $r) {
          $r->lugar = Location::getInstance()->get($r->lugar);
        }
  
        return $pageable->getResponse($result);
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function get($id) {
      try {
        // Base query
        $result = Db::getInstance()->run(
          Patient::$table->where(Patient::$pk, '=', $id)
        );

        // Add the location
        foreach ($result as $r) {
          $r->lugar = Location::getInstance()->get($r->lugar);
        }

        if (count($result) > 0) {
          return $result[0];
        }
        else {
          return Response::getBaseInternalError("There's no record with id " . $id);
        }
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }
  }

?>