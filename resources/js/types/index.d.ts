export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    email_verified_at?: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    is_popular?: boolean;
    books_count?: number;
}

export interface Author {
    id: number;
    name: string;
    slug: string;
    avatar_url?: string;
    tagline?: string;
    bio?: string;
    awards?: string;
    website?: string;
    instagram?: string;
    is_featured?: boolean;
    books_count?: number;
    books?: Book[];
}

export interface Book {
    id: number;
    title: string;
    slug: string;
    subtitle?: string;
    category_id: number;
    author_id: number;
    isbn: string;
    synopsis: string;
    description?: string;
    cover_image: string;
    price: number;
    discount_price?: number;
    stock: number;
    page_count: number;
    publication_date?: string;
    language: string;
    publisher: string;
    format: string;
    dimensions: string;
    weight: number;
    rating_avg: number;
    reviews_count: number;
    is_featured: boolean;
    is_bestseller: boolean;
    is_new_release: boolean;
    sample_content?: string;
    category?: Category;
    author?: Author;
    reviews?: Review[];
}

export interface Review {
    id: number;
    book_id: number;
    user_name: string;
    rating: number;
    comment: string;
    is_verified: boolean;
    created_at?: string;
}

export interface Manuscript {
    id: number;
    author_name: string;
    author_email: string;
    author_phone: string;
    title: string;
    category_id?: number;
    genre: string;
    target_audience: string;
    synopsis: string;
    sample_chapter: string;
    status: 'pending' | 'reviewing' | 'accepted' | 'revision' | 'rejected';
    editor_notes?: string;
    created_at: string;
    category?: Category;
}

export interface OrderItem {
    id: number;
    order_id: number;
    book_id: number;
    quantity: number;
    price: number;
    subtotal: number;
    book?: Book;
}

export interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    city: string;
    postal_code: string;
    courier: string;
    payment_method: string;
    payment_status: string;
    order_status: string;
    tracking_code?: string;
    subtotal: number;
    shipping_cost: number;
    total_amount: number;
    notes?: string;
    created_at: string;
    items?: OrderItem[];
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    cover_image?: string;
    author_name: string;
    read_time: string;
    is_published: boolean;
    created_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
};
