<?php
  class PhoneRepository {
    private $table;

    public function __construct() {
      $this->table = QB::table(Phone::$tableName);
    }

    public function list($pageable = null, $ownerId) {
      // Base query
      $query = $this->table->where('dueno', $ownerId);

      if ($pageable != null) {
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (Phone::getSearcheableFields() as $sf) {
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

      // Add the phone type and the owner
      $phoneTypeRepository = new PhoneTypeRepository();
      
      foreach ($result as $phone) {
        $phone->tipo = $phoneTypeRepository->find($phone->tipo);
      }

      return $pageable != null ? $pageable->getResponse($result) : $result;
    }

    public function find($id) {
      $result = Db::run(
        $this->table
          ->where(Phone::$pk, '=', $id)
        );

      if (count($result) > 0) {
        $phone = $result[0];

        $phoneTypeRepository = new PhoneTypeRepository();
        $patientRepository = new PatientRepository();

        $phone->tipo = $phoneTypeRepository->find($phone->tipo);
        $phone->dueno = $patientRepository->find($phone->dueno);

        return $phone;
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

      $this->table->where(Phone::$pk, $data[Phone::$pk])->update($data);
    }

    public function patch($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->where(Phone::$pk, $data[Phone::$pk])->update($data);
    }

    public function delete($id) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->where(Phone::$pk, $id)->delete();
    }
  }
?>