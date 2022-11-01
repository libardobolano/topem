<?php

namespace App\Traits;

trait ResponseTrait
{
    public function sendResponse($success, $message,int $code, $objResponse = null)
    {
        $response = [
            'success' => $success,
            'message' => $message,
        ];
        if($objResponse != null)$response['data'] = $objResponse;
        return response()->json($response, $code);
    }

    public function errorResponse($message, $objResponse = null,$code = 500)
    {
        return $this->sendResponse(false, $message, $code, $objResponse);
    }

    public function successResponse($message, $objResponse,int $code = 200)
    {
        return $this->sendResponse(true, $message, $code, $objResponse);
    }
}
