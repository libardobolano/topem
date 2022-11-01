<?php

namespace App\Models\Orders;

use App\Models\Users\Customer;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_number',
        'order_value',
        'order_iva',
        'order_total',
        'transmitter_id',
        'receiver_id'
    ];

    protected $hidden = [
        'transmitter_id',
        'receiver_id'
    ];

    protected $appends = [
        'customer_transmitter',
        'customer_receiver'
    ];

    /**
     * Get the user's first name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function customerTransmitter(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->transmitter()->first(),
        );
    }

    /**
     * Get the user's first name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function customerReceiver(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->receiver()->first(),
        );
    }

    public function transmitter()
    {
        return $this->belongsTo(Customer::class,'transmitter_id');
    }

    public function receiver()
    {
        return $this->belongsTo(Customer::class,'receiver_id');
    }

    public function items()
    {
        return $this->hasMany(Item::class,'order_id');
    }
}
