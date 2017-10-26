<?php
  interface ILocationService {
    public function listAll($pageable);
    public function find($id);
  }