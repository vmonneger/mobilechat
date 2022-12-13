<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Chatroom;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class ChatroomController extends AbstractController
{
    #[Route('/chatroom/{userId}', name: 'chatroom')]
    public function index(Request $request, $userId, EntityManagerInterface $entityManager): Response
    {
        $currentUserId = json_decode($request->getContent(), true);
        $repository = $entityManager->getRepository(User::class);
        $user = $repository->findOneBy(['id' => $userId]);
        $currentUser = $repository->findOneBy(['id' => $currentUserId]);

        $repositoryChat = $entityManager->getRepository(Chatroom::class);
        $chatroom = $repositoryChat->getChatroomByUsers($currentUser, $user);

        
        // $chatroom = new Chatroom();

        // $chatroom->addUserId($currentUser);
        // $chatroom->addUserId($user);

        // $entityManager->persist($chatroom);
        // $entityManager->flush();
        // dump($chatroom);
        return $this->json([
            'user1' => $chatroom,
            // 'user2' => $user
        ]);
    }
}
