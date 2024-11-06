<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\GuzzleException;
use http\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatBotController extends Controller
{
    //
    public function streamMessage(Request $request)
    {
        try {
            // Validate the request
            $request->validate([
                'message' => 'required|string|max:1000',
            ]);

            // Initialize Guzzle client
            $client = new Client();
            $url = 'https://api.vultrinference.com/v1/chat/completions';

            $headers = [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer HSMYDX2XL5YJHTE5O77VFOCPJA5DF6F2GFDQ',
            ];

            $body = [
                'model' => 'llama2-13b-chat-Q5_K_M',
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                    ['role' => 'user', 'content' => $request->input('message')],
                ],
                'max_tokens' => 512,
                'stream' => false, // Changed to false for simpler handling
            ];

            // Make the API call
            $response = $client->request('POST', $url, [
                'headers' => $headers,
                'json' => $body,
            ]);

            // Get the response content
            $responseBody = json_decode($response->getBody()->getContents(), true);

            // Return the response
            return response()->json([
                'chunk' => $responseBody['choices'][0]['message']['content'] ?? 'No response generated'
            ]);

        } catch (GuzzleException $e) {
            Log::error('Guzzle Error in ChatBot:', [
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'user_message' => $request->input('message')
            ]);

            return response()->json([
                'error' => 'Failed to communicate with AI service',
                'details' => $e->getMessage()
            ], 500);

        } catch (\Exception $e) {
            Log::error('General Error in ChatBot:', [
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'user_message' => $request->input('message')
            ]);

            return response()->json([
                'error' => 'An unexpected error occurred',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
