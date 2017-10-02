<?php
  interface IAreaService {
    public function list($pageable);
    public function find($id);
    public function create($data);
    public function update($data);
    public function patch($data);
    public function delete($id);
  }