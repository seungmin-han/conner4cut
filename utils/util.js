import { gsap } from "gsap"
import { useKakaoStore } from "~/stores/kakao";

const fadeIn = async (target = '.main' ,callback = ()=>{}) => {
    await gsap.fromTo(target,
        {
            y: -300,
            opacity: 0,
            duration: 0.5,
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
        }
    ).then(callback);
}

const fadeOut = async (target = '.main', callback = ()=>{}) => {
    await gsap.to(target, {
        y: -300,
        opacity: 0,
        duration: 0.5,
    }).then(callback);
}

const kakaoLogin = () => {
    return new Promise((resolve, reject) => {
        if (!Kakao.isInitialized()) {
            Kakao.init(useRuntimeConfig().public.kakaoConfig.jsKey);
        }
        const win = window.open('/login', 'login', '_top', 'width=300,height=500, top=100');
        const timer = setInterval(() => {
            if (win.closed) {
                clearInterval(timer);
                try {
                    Kakao.Auth.setAccessToken(sessionStorage.getItem('token'));
                    getKakaoProfile().then(res => {
                        resolve(res);
                    })
                } catch (e) {
                    console.log(e);
                    reject(e);
                }

            }
        }, 1000);
    })
}

const getKakaoProfile = () => {
    return new Promise(
        resolve => Kakao.API.request(
            {
                url: '/v2/user/me',
                data: { property_keys: ['kakao_account.profile'] },
            })
            .then(res => {
                resolve(res);

            })
    );
}

export { fadeIn, fadeOut, kakaoLogin }