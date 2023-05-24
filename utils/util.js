import { gsap } from "gsap"
import { useKakaoStore } from "~/stores/kakao";

const fadeIn = async (target = '.main' ,callback = ()=>{}) => {
    await gsap.from(target, {
        y: -300,
        opacity: 0,
        duration: 0.5,
    }).then(callback);
}

const fadeOut = async (target = '.main', callback = ()=>{}) => {
    await gsap.to(target, {
        y: -300,
        opacity: 0,
        duration: 0.5,
    }).then(callback);
}

const kakaoLogin = () => {
    if (!Kakao.isInitialized()) {
        Kakao.init(useRuntimeConfig().public.kakaoConfig.jsKey);
    }
    const win = window.open('/login', 'login', '_top', 'width=300,height=500');
    const timer = setInterval(() => {
        if (win.closed) {
            clearInterval(timer);
            try {
                Kakao.Auth.setAccessToken(sessionStorage.getItem('token'));
                getKakaoProfile().then(res => {
                    const kakaoStore = useKakaoStore();
                    kakaoStore.id = res.id;
                    kakaoStore.account = res.kakao_account;

                    console.log(kakaoStore.id, kakaoStore.account);
                })
            } catch (e) {
                console.log(e);
                alert('로그인에 실패했습니다.',e);
            }
            
        }
    }, 1000);
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