/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'text-primary': '#1a1a1a',
                'text-secondary': '#666666',
                'aorta': '#ef4444', // Red-500
                'ventricle': '#000000', // Black
                'atrium': '#3b82f6', // Blue-500
            }
        },
    },
    plugins: [],
}
