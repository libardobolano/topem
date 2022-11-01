<?php

namespace App\Models\Users;

use App\Models\Orders\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'customers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'customer_name',
        'customer_dni'
    ];

    public function transmitterOrders()
    {
        return $this->hasMany(Order::class,'transmitter_id');
    }

    public function receiverOrders()
    {
        return $this->hasMany(Order::class,'receiver_id');
    }
}
