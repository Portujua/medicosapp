<?php
  interface ISuscriptionTypeService {
    public function listAll($pageable);
    public function find($id);
    public function create($data);
    public function patch($data);
  }