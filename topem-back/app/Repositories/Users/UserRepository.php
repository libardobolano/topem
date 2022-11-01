<?php

namespace App\Repositories\Users;

use App\Models\User;
use App\Repositories\Repository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository extends Repository implements UserRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(new User);
    }

    /**
     * @param $email
     * @return User
     */
    public function getByEmail($email)
    {
        if (null == $user = $this->model->where('email',$email)->first()) throw new ModelNotFoundException("User not found");
        return $user;
    }
}
