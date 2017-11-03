<?php
  class AuthRepository {
    public function __construct() {
      
    }

    private function getTable() {
      return QB::table(User::$tableName);
    }
      
    /**
    * Login
    * 
    * @param Array $data - Auth data
    * @return JSONObject - Data result or error message, both as JSON format
    */
    public function login($data) {
      $result = $this->getTable()
          ->select('id')
          ->where('usuario', '=', $data['username'])
          ->where('contrasena', '=', $data['password'])
          ->get();

      if (count($result) == 0) {
        throw new BadCredentialsException();
      }
      else {
        // Register login
        QB::table('Log_Login')
          ->insert(['id' => Util::uuid(), 'user' => $result[0]->id]);
          
        return $result[0];
      }
    }
  }
?>