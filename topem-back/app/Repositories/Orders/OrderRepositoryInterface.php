<?php

namespace App\Repositories\Orders;

use App\Repositories\RepositoryInterface;

interface OrderRepositoryInterface extends RepositoryInterface
{
    public function createOrder(array $data);
    public function getOrder($id);
    public function getOrders(array $data);
    public function updateOrder(array $data,$id);
    public function asignedCustomerOrder(array $data);
}
