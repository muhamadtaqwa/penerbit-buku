<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function cart(): Response
    {
        return Inertia::render('Shop/Cart');
    }

    public function checkout(): Response
    {
        return Inertia::render('Shop/Checkout');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:150',
            'customer_email' => 'required|email|max:150',
            'customer_phone' => 'required|string|max:30',
            'shipping_address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:10',
            'courier' => 'required|string|max:50',
            'payment_method' => 'required|string|max:50',
            'notes' => 'nullable|string|max:500',
            'items' => 'required|array|min:1',
            'items.*.book_id' => 'required|exists:books,id',
            'items.*.quantity' => 'required|integer|min:1|max:50',
        ]);

        $order = DB::transaction(function () use ($validated, $request) {
            $subtotal = 0;
            $itemsData = [];

            foreach ($validated['items'] as $item) {
                $book = Book::findOrFail($item['book_id']);
                $price = $book->discount_price ?? $book->price;
                $lineTotal = $price * $item['quantity'];
                $subtotal += $lineTotal;

                $itemsData[] = [
                    'book_id' => $book->id,
                    'quantity' => $item['quantity'],
                    'price' => $price,
                    'subtotal' => $lineTotal,
                ];

                // Decrement stock gracefully
                if ($book->stock >= $item['quantity']) {
                    $book->decrement('stock', $item['quantity']);
                }
            }

            $shippingCost = 15000;
            if (str_contains(strtolower($validated['courier']), 'express') || str_contains(strtolower($validated['courier']), 'best')) {
                $shippingCost = 25000;
            }

            $totalAmount = $subtotal + $shippingCost;
            $orderNumber = 'AKSAR-' . date('Ym') . '-' . strtoupper(Str::random(5));

            $order = Order::create([
                'order_number' => $orderNumber,
                'user_id' => $request->user()?->id,
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'],
                'shipping_address' => $validated['shipping_address'],
                'city' => $validated['city'],
                'postal_code' => $validated['postal_code'],
                'courier' => $validated['courier'],
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'paid', // Simulated instant confirmation
                'order_status' => 'processing',
                'tracking_code' => 'AKS-' . rand(10000000, 99999999),
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'total_amount' => $totalAmount,
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($itemsData as $item) {
                $order->items()->create($item);
            }

            return $order;
        });

        return redirect()->route('orders.show', $order->order_number)
            ->with('success', 'Pesanan Anda berhasil dikonfirmasi!');
    }

    public function show(string $orderNumber): Response
    {
        $order = Order::with(['items.book.author'])
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        return Inertia::render('Shop/OrderSuccess', [
            'order' => $order,
        ]);
    }

    public function track(Request $request): Response
    {
        $order = null;
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $order = Order::with(['items.book.author'])
                ->where('order_number', $search)
                ->orWhere('tracking_code', $search)
                ->first();
        }

        return Inertia::render('Shop/TrackOrder', [
            'order' => $order,
            'searchTerm' => $request->input('search', ''),
        ]);
    }
}
