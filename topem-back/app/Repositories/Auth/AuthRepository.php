<?php

namespace App\Repositories\Auth;

use App\Repositories\Users\UserRepository;

class AuthRepository implements AuthRepositoryInterface
{

    protected $userRepository;
    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    /**
     * @param $data
     * @return String
     */
    public function logIn($data)
    {
        $user = $this->userRepository->getByEmail($data['email']);
        return $user->createToken('Laravel Password Grant Client')->accessToken;
    }
}
