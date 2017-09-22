<?php
  interface IPatientService {
    public function list($pageable);
    public function find($id);
  }