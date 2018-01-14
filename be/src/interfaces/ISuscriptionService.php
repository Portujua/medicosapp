<?php
  interface ISuscriptionService {
    public function listAll($pageable, $userId);
    public function find($id);
    public function create($data);
    public function update($data);
    public function patch($data);
    public function delete($data);
    public function approve($id);
    public function decline($id);
    public function registerPayment($id, $data);
  }