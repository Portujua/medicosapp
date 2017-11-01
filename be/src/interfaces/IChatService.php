<?php
  interface IChatService {
    public function listAll($pageable);
    public function listMessages($area, $self, $user, $pageable, $unread, $notification);
    public function createMessage($data);
  }