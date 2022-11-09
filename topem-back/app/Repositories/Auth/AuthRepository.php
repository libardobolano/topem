<?php

namespace App\Repositories\Auth;

use App\Repositories\Users\UserRepository;
use Illuminate\Support\Facades\Auth;

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
        if(!Auth::attempt($data)) throw new \Exception('The provided credentials do not match our records.');
        $user = $this->userRepository->getByEmail($data['email']);
        return $user->createToken('Laravel Password Grant Client')->accessToken;
    }

    public function logOut()
    {
        Auth::user()->token()->revoke();;
    }
}
