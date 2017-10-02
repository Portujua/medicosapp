<?php
  class ChatRepository {
    public function __construct() {
      
    }

    private function getTable() {
      return QB::table(User::$tableName);
    }

    public function list($pageable = null) {
      // Base query
      $query = $this->getTable()->where('usuario', '!=', 'root');

      if ($pageable != null) {
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (User::getSearcheableFields() as $sf) {
            $query->orWhere($sf, 'like', '%'.$pageable->getKeyword().'%');
          }
        }
  
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
  }
?>