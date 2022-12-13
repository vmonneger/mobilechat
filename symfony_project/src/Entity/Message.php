<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Chatroom::class, inversedBy: 'messages')]
    private $chatroom_id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'messages')]
    private $user_id;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChatroomId(): ?Chatroom
    {
        return $this->chatroom_id;
    }

    public function setChatroomId(?Chatroom $chatroom_id): self
    {
        $this->chatroom_id = $chatroom_id;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }
}
