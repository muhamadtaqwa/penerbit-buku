import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{tsx,ts,jsx,js}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                serif: ['"Playfair Display"', 'Georgia', ...defaultTheme.fontFamily.serif],
                brand: ['"Playfair Display"', 'Georgia', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                aksara: {
                    50: '#f0f7fd',
                    100: '#e0effb',
                    200: '#c5e2f7',
                    300: '#99cdf2',
                    400: '#64b0ea',
                    500: '#3894df',
                    600: '#2378cd',
                    700: '#1b60a7',
                    800: '#194f87',
                    900: '#194370',
                    950: '#0f2942',
                },
                ocean: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                navy: {
                    800: '#1e3a5f',
                    900: '#0f2942',
                    950: '#081c30',
                }
            },
        },
    },

    plugins: [forms],
};
