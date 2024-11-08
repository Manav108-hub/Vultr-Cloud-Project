<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatBotController extends Controller
{
    public function streamMessage(Request $request)
    {
        try {
            // Validate the incoming request
            $request->validate([
                'message' => 'required|string|max:1000',
            ]);

            // Initialize Guzzle client and prepare the API call
            $client = new Client();
            $url = config('services.vultr.api_url');
            $headers = [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . config('services.vultr.token'),
            ];

            $body = [
                'model' => 'llama2-13b-chat-Q5_K_M',
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                    ['role' => 'user', 'content' => $request->input('message')],
                ],
                'max_tokens' => 512,
                'stream' => false,
            ];

            // Make the API request
            $response = $client->request('POST', $url, [
                'headers' => $headers,
                'json' => $body,
            ]);

            // Decode and handle the response
            $responseBody = json_decode($response->getBody()->getContents(), true);

            // Log response for troubleshooting
            Log::info('API Response:', [
                'status' => $response->getStatusCode(),
                'response_body' => $responseBody,
            ]);

            // Return response or error message
            return response()->json([
                'chunk' => $responseBody['choices'][0]['message']['content'] ?? 'No response generated',
            ]);

        } catch (GuzzleException $e) {
            Log::error('Guzzle Exception in ChatBot:', [
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'response_body' => $e->getResponse() ? (string) $e->getResponse()->getBody() : 'No response body',
                'user_message' => $request->input('message'),
            ]);

            return response()->json([
                'error' => 'Failed to communicate with AI service',
                'details' => $e->getMessage(),
            ], 500);

        } catch (\Exception $e) {
            Log::error('General Exception in ChatBot:', [
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'user_message' => $request->input('message'),
            ]);

            return response()->json([
                'error' => 'An unexpected error occurred',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
