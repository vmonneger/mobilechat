<?php

namespace App\Controller;

use App\Entity\User;
use App\Security\ApiBasicAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use App\Service\CookieHelper;
use App\Service\JWTHelper;
use Symfony\Component\Mercure\HubInterface;

class RegisterController extends AbstractController
{
    #[Route('/register', name: 'register')]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher, UserAuthenticatorInterface $userAuthenticator, ApiBasicAuthenticator $apiBasicAuthenticator, EntityManagerInterface $entityManager, JWTHelper $helper, HubInterface $hub, CookieHelper $cookieHelper): Response
    {
        $user = new User();
        $requestContent = json_decode($request->getContent(), true);
        
        if ($requestContent) {
            $user->setUsername($requestContent['username']);
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $requestContent['password']
                )
            );

            $entityManager->persist($user);
            $entityManager->flush();

            $userAuthenticator->authenticateUser(
                $user,
                $apiBasicAuthenticator,
                $request
            );

            return $this->json([
                'JWT' => $helper->createJWT($user)
            ], 200, [
                'set-cookie' => $cookieHelper->createMercureCookie($user)
            ]);
        }
    }
}
