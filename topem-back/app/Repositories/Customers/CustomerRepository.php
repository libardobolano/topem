<?php

namespace App\Repositories\Customers;

use App\Models\Users\Customer;
use App\Repositories\Repository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CustomerRepository extends Repository implements CustomerRepositoryInterface
{

    public function __construct()
    {
        parent::__construct(new Customer);
    }

    /**
     * @param array $data
     * @return Customer
     */
    public function findOrCreateCustomer(array $data)
    {
        $customer = $this->model->where('customer_dni',$data['customer_dni'])->first();
        if(null == $customer) return $this->create($data);
        return $customer;
    }
}
