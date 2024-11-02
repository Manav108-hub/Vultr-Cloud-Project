<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class AboutController extends Controller
{
    public function index() {
        $data = [
            'title' => 'About Us',
            'description' => 'Learn more about our company',
            'team' => [
                ['name' => 'John Doe', 'position' => 'CEO'],
                ['name' => 'Jane Smith', 'position' => 'CTO'],
            ]
        ];

        return Inertia::render('About', $data);
    }
}
