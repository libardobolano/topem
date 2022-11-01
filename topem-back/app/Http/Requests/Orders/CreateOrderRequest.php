<?php

namespace App\Http\Requests\Orders;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'order_value'               => 'required|numeric|min:0',
            'order_iva'                 => 'required|numeric|min:0',
            'transmitter'               => 'required|array',
            'transmitter.customer_name' => 'required',
            'transmitter.customer_dni'  => 'required',
            'receiver'                  => 'required|array',
            'receiver.customer_name'    => 'required',
            'receiver.customer_dni'     => 'required',
            'items'                     => 'required|array|min:1',
            'items.*.item_amount'       => 'required|numeric|min:1',
            'items.*.item_price'        => 'required|numeric|min:0',
            'items.*.item_total'        => 'required|numeric|min:0',
            'items.*.item_description'  => 'required',

        ];
    }
}
