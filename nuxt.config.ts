// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],
    app: {
        head: {
            script: [
                {
                    src: "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js",
			        integrity:"sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx",
                    crossorigin: "anonymous"
                }
		
            ]
        }
    },

    runtimeConfig: {
        public: {
            firebaseConfig: {
                apiKey: "AIzaSyBFOsWORb8IrNeP7xaW1_BtoCO5VmtswM8",
                authDomain: "conner4cuts-51996.firebaseapp.com",
                projectId: "conner4cuts-51996",
                storageBucket: "conner4cuts-51996.appspot.com",
                messagingSenderId: "47233797236",
                appId: "1:47233797236:web:418abd39634345597fd521",
                measurementId: "G-GMZ14HJ5W3",
                databaseURL: "https://conner4cuts-51996-default-rtdb.firebaseio.com/",
            },
            kakaoConfig: {
                restApiKey: '50f932e78ecb3d107e2890d9311786ac',
                jsKey: '7b3fdb9ec68d1a8918eab93873233207',
            }
        }
        
    },
    ssr: false,
})
