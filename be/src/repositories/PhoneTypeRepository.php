<?php
  class PhoneTypeRepository {
    public function __construct() {
      
    }

    private function getTable() {
      return QB::table(PhoneType::$tableName);
    }

    public function listAll($pageable = null) {
      // Base query
      $query = $this->getTable();

      if ($pageable != null) {
        // Search for keyword if available
        // if ($pageable->hasKeyword()) {
        //   foreach (User::getSearcheableFields() as $sf) {
        //     $query->orWhere($sf, 'like', '%'.$pageable->getKeyword().'%');
        //   }
        // }
  
        // Add the filters if available
        foreach ($pageable->getFilters() as $filter) {
          $query->where($filter->getField(), $filter->getOperator(), $filter->getValue());
        }
        
        // Add the page
        $query->limit($pageable->getSize())->offset($pageable->getOffset());

        // Set the total elements for the pageable
        $pageable->setTotalElements($this->getTable()->count());
      }

      // Run the final query
      $result = Db::run($query);

      return $pageable != null ? $pageable->getResponse($result) : $result;
    }

    public function find($id) {
      $result = Db::run($this->getTable()->where(PhoneType::$pk, '=', $id));

      if (count($result) > 0) {
        return $result[0];
      }
      else {
        throw new Exception("There's no record with id " . $id);
      }
    }
  }
?>