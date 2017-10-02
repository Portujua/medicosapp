<?php
  interface ISuscriptionTypeService {
    public function list($pageable);
    public function find($id);
    public function create($data);
    public function patch($data);
  }