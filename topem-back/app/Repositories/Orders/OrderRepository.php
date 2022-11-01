<?php

namespace App\Repositories\Orders;

use App\Models\Orders\Order;
use App\Repositories\Customers\CustomerRepository;
use App\Repositories\Orders\items\ItemRepository;
use App\Repositories\Repository;

class OrderRepository extends Repository implements OrderRepositoryInterface
{
    protected $customerRepositry;
    protected $itemRepository;
    public function __construct()
    {
        parent::__construct(new Order);
        $this->customerRepositry = new CustomerRepository();
        $this->itemRepository = new ItemRepository();
    }

    /**
     * @param array $data
     * @return Order
     */
    public function createOrder(array $data)
    {
        $data = $this->asignedCustomerOrder($data);
        $data['order_total'] = $data['order_value'] + (($data['order_value'] * $data['order_iva']) / 100);
        $data['order_number'] = uniqid();
        $order = $this->create($data);
        $this->itemRepository->addItemsOrder($data['items'],$order->id);
        return $order;
    }

    /**
     * @param $id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object
     */
    public function getOrder($id)
    {
        return $this->model->with(['items'])->where('id',$id)->first();
    }

    /**
     * @param array $data
     * @return Order[]
     */
    public function getOrders(array $data)
    {
        $query = $this->model;
        if(array_key_exists('order_number',$data)) $query = $query->where('order_number','like','%'.$data['order_number'].'%');
        if(array_key_exists('transmitter_id',$data)) $query = $query->where('transmitter_id',$data['transmitter_id']);
        if(array_key_exists('receiver_id',$data)) $query = $query->where('transmitter_id',$data['receiver_id']);

        $pages = array_key_exists('pages',$data) ? $data['pages'] : 10;
        return $query->paginate($pages);
    }

    /**
     * @param array $data
     * @param $id
     * @return Order
     */
    public function updateOrder(array $data,$id)
    {
        $data = $this->asignedCustomerOrder($data);
        $order = $this->update($data,$id);
        $this->itemRepository->addItemsOrder($data['items'],$order->id);
        return $order;
    }

    /**
     * @param array $data
     * @return array
     */
    public function asignedCustomerOrder(array $data)
    {
        $transmitter = $this->customerRepositry->findOrCreateCustomer($data['transmitter']);
        $data['transmitter_id'] = $transmitter->id;
        $receiver = $this->customerRepositry->findOrCreateCustomer($data['receiver']);
        $data['receiver_id'] = $receiver->id;
        return $data;
    }
}
