// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: [
        '@/assets/css/styles.scss',
        'primeicons/primeicons.css'
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: ["@nuxtjs/tailwindcss"]
})