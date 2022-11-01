<?php

namespace App\Repositories\Orders\items;

use App\Models\Orders\Item;
use App\Repositories\Repository;

class ItemRepository extends Repository implements ItemRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(new Item);
    }

    /**
     * @param array $items
     * @param $order_id
     * @return void
     *
     */
    public function addItemsOrder(array $items,$order_id)
    {
        foreach ($items as $item)
        {
            $item['order_id'] = $order_id;
            array_key_exists('id',$item) ? $this->update($item,$item['id']) : $this->create($item);
        }
    }
}
