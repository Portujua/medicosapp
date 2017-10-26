<?php
  interface IUserService {
    public function listAll($pageable);
    public function listAllPatients($pageable);
    public function listAllMedics($pageable);
    public function find($id);
    public function create($data);
    public function update($data);
    public function patch($data);
    public function delete($data);
  }