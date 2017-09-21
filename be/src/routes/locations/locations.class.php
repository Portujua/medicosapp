<?php

  class Location extends BaseEntity {
    static public $base = [
      "id" => null,
      "nombre" => null,
      "nombre_completo" => null,
      "tipo" => null,
      "lugar" => null,
      "createdAt" => null,
      "modifiedAt" => null
    ];

    static public $searcheableFields = [
      "nombre", "nombre_completo"
    ];

    static public $pk = "id";
    static public $tableName = "Lugar";
    static public $table;

    private static $instance = null;
    
    private function __construct() {
      //parent::__construct();
      Location::$table = QB::table(Location::$tableName);
    }
  
    public static function getInstance() {
      if (Location::$instance == null) {
        Location::$instance = new Location();
      }
  
      return Location::$instance;
    }

    static public function createPayload($vals = [], $addNew = false) {
      return Util::mergeOptions(Location::$base, $vals, $addNew);
    }

    static public function putPayload($data) {
      return Util::mergeOptions(Location::$base, $data, true);
    }

    static public function patchPayload($pkVal, $data) {
      $patch = Util::mergeOptions([], [Location::$pk => $pkVal], true);
      return Util::mergeOptions($patch, $data, true);
    }

    public function list($pageable) {
      try {
        // Base query
        $query = Location::$table;
  
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (Location::$searcheableFields as $sf) {
            $query->orWhere($sf, 'like', '%'.$pageable->getKeyword().'%');
          }
        }

        echo $query->getQuery()->getRawSql();
  
        // Add the filters if available
        foreach ($pageable->getFilters() as $filter) {
          $query->where($filter->getField(), $filter->getOperator(), $filter->getValue());
        }
        
        // Add the page
        $query->limit($pageable->getSize())->offset($pageable->getOffset());
  
        // Run the final query
        $result = Db::getInstance()->run($query);
  
        // Set the total elements for the pageable
        $pageable->setTotalElements(Location::$table->count());
  
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
          Location::$table->where(Location::$pk, '=', $id)
        );

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