import { gsap } from "gsap"

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

export { fadeIn, fadeOut }