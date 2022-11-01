<?php

namespace App\Providers;

use App\Repositories\Auth\AuthRepository;
use App\Repositories\Auth\AuthRepositoryInterface;
use App\Repositories\Customers\CustomerRepository;
use App\Repositories\Customers\CustomerRepositoryInterface;
use App\Repositories\Orders\items\ItemRepository;
use App\Repositories\Orders\items\ItemRepositoryInterface;
use App\Repositories\Orders\OrderRepository;
use App\Repositories\Orders\OrderRepositoryInterface;
use App\Repositories\Users\UserRepository;
use App\Repositories\Users\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RopositoryServiceProvider extends ServiceProvider
{
    protected $repositories = [
        UserRepositoryInterface::class      => UserRepository::class,
        OrderRepositoryInterface::class     => OrderRepository::class,
        ItemRepositoryInterface::class      => ItemRepository::class,
        CustomerRepositoryInterface::class  => CustomerRepository::class,
        AuthRepositoryInterface::class      => AuthRepository::class
    ];

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        foreach ($this->repositories as $interface => $repository) {
            $this->app->bind($interface, $repository);
        }
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
