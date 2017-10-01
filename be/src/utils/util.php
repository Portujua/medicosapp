<?php
	/**
	* It contains all util methods.
	*
	* @package Base
	* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
	* @since 21/09/2017
	* @license MIT
	*/

	/**
	* Util class
	* 
  * @method Array jsonToArray(String $json)
  * @method Array jsonPdoToArray(PDOResponse $jsonPdo)
  * @method Array mergeOptions(Array $base, Array $vals, Boolean $addIfUndefined)
	*/
  class Util {
    public static function jsonToArray($json) {
      return json_decode($json, true);
    }

    public static function jsonPdoToArray($jsonPdo) {
      return Util::jsonToArray(json_encode($jsonPdo));
    }

    /**
		* Merges an array with values into a base array.
		*
		* Copies $vals into $base overriding base values.
		* 
		* @param Array $base - Base array
		* @param Array $vals - Values array
		* @param Boolean $addIfUndefined - It determines if new keyvalues contained in $vals should be added into base
		*
		* @return Array - Returns the modified data array
		*/
		public static function mergeOptions($base = [], $vals = [], $addIfUndefined = false) {
			if (!is_array($base)) {
				$base = self::jsonPdoToArray($base);
			}

			foreach ($base as $keyb => $valb) {
				foreach ($vals as $keyv => $valv) {
					if ($keyb == $keyv) {
						$base[$keyb] = $valv;
					}
				}
			}

			if ($addIfUndefined) {
				foreach ($vals as $keyv => $valv) {
					$exists = false;

					foreach ($base as $keyb => $valb) {
						if ($keyb == $keyv) {
							$exists = true;
							$base[$keyb] = $valv;
						}
					}

					if (!$exists) {
						$base[$keyv] = $valv;
					}
				}
			}

			return $base;
		}

		public static function fieldArrayToStringArray($arr) {
			if (count($arr) == 0) {
				return $arr;
			}

			if (!($arr[0] instanceof Field)) {
				return $arr;
			}

			$newArray = [];

			foreach ($arr as $f) {
				$newArray[$f->getName()] = $f->getDefaultValue();
			}

			return $newArray;
		}

		public static function simplify($data) {
			if (!is_array($data)) {
				return $data;
			}

			foreach ($data as $k => $v) {
				if (is_array($v)) {
					$data[$k] = $v['id'];
				}
			}

			return $data;
		}

		/**
		* Merges passed data into base data structure. If $addNew is true it will add new fields if not present.
		*
		* @param Array $vals - Values to be replaced in the base structure
		* @param Boolean $addNew - Indicates if it should add new key values when not present
		* @return Array - Returns an array with $vals values copied into the base structure
		*/
		static public function createPayload($class, $vals = [], $addNew = false) {
			$payload = Util::mergeOptions(self::fieldArrayToStringArray($class::getBase()), self::simplify($vals), $addNew);

			return $payload;
		}

		/**
		* Generates the put payload array including the PK and all fields inside $data.
		*
		* @category Classes
		* @param Variable $pkVal - The PK value
		* @param Array $data - The PUT method data
		* @return Array - Returns an array with $vals values copied into the base structure
		*/
		static public function putPayload($class, $data) {
			return Util::mergeOptions(self::fieldArrayToStringArray($class::getBase()), self::simplify($data), true);
		}

		/**
		* Generates the patch payload array including the PK and all fields inside $data.
		*
		* @category Classes
		* @param Variable $pkVal - The PK value
		* @param Array $data - The PATCH method data
		* @return Array - Returns an array with $vals values copied into the base structure
		*/
		static public function patchPayload($class, $pkVal, $data) {
			$patch = Util::mergeOptions([], [$class::$pk => $pkVal], true);
			return Util::mergeOptions($patch, self::simplify($data), true);
		}

		public static function uuid() {
			return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
			// 32 bits for "time_low"
			mt_rand(0, 0xffff), mt_rand(0, 0xffff),
			// 16 bits for "time_mid"
			mt_rand(0, 0xffff),
			// 16 bits for "time_hi_and_version",
			// four most significant bits holds version number 4
			mt_rand(0, 0x0fff) | 0x4000,
			// 16 bits, 8 bits for "clk_seq_hi_res",
			// 8 bits for "clk_seq_low",
			// two most significant bits holds zero and one for variant DCE1.1
			mt_rand(0, 0x3fff) | 0x8000,
			// 48 bits for "node"
			mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
			);
		}
  }
?>