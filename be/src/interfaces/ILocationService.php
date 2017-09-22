<?php
  interface ILocationService {
    public function list($pageable);
    public function find($id);
  }