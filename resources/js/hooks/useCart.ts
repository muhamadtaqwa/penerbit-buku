import { useState, useEffect } from 'react';
import { Book } from '@/types';

export interface CartItem {
    book: Book;
    quantity: number;
}

const CART_STORAGE_KEY = 'aksara_cart_items_v1';

export function getStoredCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const item = window.localStorage.getItem(CART_STORAGE_KEY);
        return item ? JSON.parse(item) : [];
    } catch (e) {
        console.error('Failed to parse cart', e);
        return [];
    }
}

export function saveStoredCart(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event('aksara-cart-updated'));
    } catch (e) {
        console.error('Failed to save cart', e);
    }
}

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(getStoredCart());

        const handleStorage = () => {
            setCart(getStoredCart());
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('aksara-cart-updated', handleStorage);

        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('aksara-cart-updated', handleStorage);
        };
    }, []);

    const addToCart = (book: Book, quantity: number = 1) => {
        const current = getStoredCart();
        const existingIndex = current.findIndex(i => i.book.id === book.id);
        let updated: CartItem[];

        if (existingIndex > -1) {
            updated = [...current];
            updated[existingIndex].quantity += quantity;
        } else {
            updated = [...current, { book, quantity }];
        }

        saveStoredCart(updated);
        setCart(updated);
    };

    const updateQuantity = (bookId: number, quantity: number) => {
        const current = getStoredCart();
        if (quantity <= 0) {
            removeFromCart(bookId);
            return;
        }

        const updated = current.map(item => 
            item.book.id === bookId ? { ...item, quantity } : item
        );
        saveStoredCart(updated);
        setCart(updated);
    };

    const removeFromCart = (bookId: number) => {
        const current = getStoredCart();
        const updated = current.filter(item => item.book.id !== bookId);
        saveStoredCart(updated);
        setCart(updated);
    };

    const clearCart = () => {
        saveStoredCart([]);
        setCart([]);
    };

    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => {
        const price = item.book.discount_price ?? item.book.price;
        return acc + price * item.quantity;
    }, 0);

    return {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        subtotal,
    };
}
