<?php
  class AreaRepository {
    private $table;

    public function __construct() {
      $this->table = QB::table(Area::$tableName);
    }

    public function list($pageable = null, $get = null) {
      // Base query
      $query = $this->table;

      if ($pageable != null) {
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (Area::getSearcheableFields() as $sf) {
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
        $pageable->setTotalElements($this->table->count());
      }

      // Run the final query
      $result = Db::run($query);

      return $pageable != null ? $pageable->getResponse($result) : $result;
    }

    public function find($id) {
      $result = Db::run($this->table->where(Area::$pk, '=', $id));

      if (count($result) > 0) {
        $area = $result[0];

        return $area;
      }
      else {
        throw new Exception("There's no record with id " . $id);
      }
    }

    public function add($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->insert($data);

      return $data['id'];
    }

    public function update($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->where(Area::$pk, $data[Area::$pk])->update($data);
    }

    public function patch($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->where(Area::$pk, $data[Area::$pk])->update($data);
    }

    public function delete($id) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->where(Area::$pk, $id)->delete();
    }
  }
?>