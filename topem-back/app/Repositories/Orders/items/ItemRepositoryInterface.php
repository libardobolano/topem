<?php

namespace App\Repositories\Orders\Items;

use App\Repositories\RepositoryInterface;

interface ItemRepositoryInterface extends RepositoryInterface
{
    public function addItemsOrder(array $items,$order_id);
}
