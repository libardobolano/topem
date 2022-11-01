<?php

namespace App\Http\Controllers\Api\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Orders\CreateOrderRequest;
use App\Repositories\Orders\OrderRepositoryInterface;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class OrderController extends Controller
{
    use ResponseTrait;
    protected $orderRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository
    )
    {
        $this->orderRepository = $orderRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $orders = $this->orderRepository->getOrders($request->all());
            return $this->successResponse('successful operation',$orders,200);
        }catch (Exception $e)
        {
            return $this->errorResponse($e->getMessage());
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Orders\CreateOrderRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateOrderRequest $request)
    {
        DB::beginTransaction();
        try {
            $order = $this->orderRepository->createOrder($request->all());
            DB::commit();
            return $this->successResponse('successful operation',$order,200);
        }catch (Exception $e)
        {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $order = $this->orderRepository->getOrder($id);
            return $this->successResponse('successful operation',$order,200);
        }catch (Exception $e)
        {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $order = $this->orderRepository->updateOrder($request->all(),$id);
            DB::commit();
            return $this->successResponse('successful operation',$order,200);
        }catch (Exception $e)
        {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $order = $this->orderRepository->delete($id);
            DB::commit();
            return $this->successResponse('successful operation',$order,200);
        }catch (Exception $e)
        {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }
}
