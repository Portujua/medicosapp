<?php
  interface IUserService {
    public function listAll($pageable);
    public function listAllPatients($pageable);
    public function listAllMedics($pageable);
    public function listNotifications($id);
    public function find($id);
    public function create($data);
    public function update($data);
    public function patch($data);
    public function delete($data);
    public function addSuscription($data);
    public function assignArea($userId, $areaId);
    public function unassignArea($userId, $areaId);
  }