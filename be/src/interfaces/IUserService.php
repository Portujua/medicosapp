<?php
  interface IUserService {
    public function list($pageable);
    public function listPatients($pageable);
    public function listMedics($pageable);
    public function find($id);
    public function create($data);
    public function update($data);
    public function patch($data);
    public function delete($data);
  }