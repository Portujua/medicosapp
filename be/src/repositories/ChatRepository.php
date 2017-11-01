<?php
  class ChatRepository {
    public function __construct() {
      
    }

    private function getTable() {
      return QB::table('Mensaje');
    }

    public function listMessages($area, $self, $user, $pageable = null, $unread = false, $notification = false) {
      // Base query
      $query = $this->getTable();

      if ($unread) {
        $query->where('leido', '0');
        $query->where('owner', $user);
        $query->where('user', $self);
      }
      else {
        $query->where(function($q) use ($self, $user) {
          $q->where('owner', $self);
          $q->orWhere('owner', $user);
        });

        $query->where(function($q) use ($self, $user) {
          $q->where('user', $self);
          $q->orWhere('user', $user);
        });
      }
      
      $query->where('area', $area);
      $query->orderBy('createdAt', 'ASC');

      if ($pageable != null) {
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (Message::getSearcheableFields() as $sf) {
            $query->orWhere($sf, 'like', '%'.$pageable->getKeyword().'%');
          }
        }
  
        // Add the filters if available
        foreach ($pageable->getFilters() as $filter) {
          $query->where($filter->getField(), $filter->getOperator(), $filter->getValue());
        }
        
        // Add the page
        $query->limit($pageable->getSize())->offset($pageable->getOffset());

        // Set the total elements for the pageable
        $pageable->setTotalElements($this->getTable()->count());
      }

      // Run the final query
      $result = Db::run($query);

      // Add the users
      $userRepository = new UserRepository();
      $areaRepository = new AreaRepository();

      foreach ($result as $m) {
        $m->owner = $userRepository->find($m->owner);
        $m->user = $userRepository->find($m->user);
        $m->area = $areaRepository->find($m->area);
        $m->leido = $m->leido == '0' ? false : true;

        // Mark every message that isn't mine as seen
        if ($m->owner->id != $self && !$notification) {
          $m->leido = true;
          $this->update([
            "id" => $m->id,
            "leido" => 1
          ]);
        }
      }

      return $pageable != null && !$unread ? $pageable->getResponse($result) : $result;
    }

    public function find($id) {
      $result = Db::run(
        $this->getTable()
          ->where(Message::$pk, '=', $id)
      );

      if (count($result) > 0) {
        $data = $result[0];

        $userRepository = new UserRepository();
        $areaRepository = new AreaRepository();
      
        $data->owner = $userRepository->find($data->owner);
        $data->user = $userRepository->find($data->user);
        $data->area = $areaRepository->find($data->area);
        $data->leido = $data->leido == '0' ? false : true;

        return $data;
      }
      else {
        throw new Exception("There's no record with id " . $id);
      }
    }

    public function add($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->getTable()->insert($data);

      return $data['id'];
    }

    public function update($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->getTable()->where(Message::$pk, $data[Message::$pk])->update($data);
    }
  }
?>