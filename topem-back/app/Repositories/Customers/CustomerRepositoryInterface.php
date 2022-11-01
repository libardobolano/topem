<?php

namespace App\Repositories\Customers;

use App\Repositories\RepositoryInterface;

interface CustomerRepositoryInterface extends RepositoryInterface
{
    public function findOrCreateCustomer(array $data);
}
