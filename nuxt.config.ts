// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],

    runtimeConfig: {
        public: {
            firebaseConfig: {
                apiKey: "AIzaSyACCN2_1ZMB1GliF9x4sRHxbqj7G2IFbXQ",
                authDomain: "conner4cuts.firebaseapp.com",
                projectId: "conner4cuts",
                storageBucket: "conner4cuts.appspot.com",
                messagingSenderId: "223296145979",
                appId: "1:223296145979:web:2fca5e746a27c3a1ed2a1e",
                measurementId: "G-42808G7FQ5",
                databaseURL: "https://conner4cuts-default-rtdb.firebaseio.com/",
              }
        }
        
    },
    ssr: false,
})
