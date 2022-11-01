<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Repositories\Auth\AuthRepositoryInterface;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use ResponseTrait;
    protected $authRepository;
    public function __construct(
        AuthRepositoryInterface $authRepository
    )
    {
        $this->authRepository = $authRepository;
    }

    public function login(LoginRequest $request)
    {
        try{
            $token = $this->authRepository->logIn($request->all());
            return $this->successResponse('successful operation',['token'=>$token],200);
        }catch (\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
}
