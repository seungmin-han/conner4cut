import { defineStore } from "pinia";


export const useImageStore = defineStore('imageStore', {
    state: () => ({
        images: [],
    }),
    getters: {
        //
    },
    actions: {
        addImage(image) {
            this.images.push(image);
            console.log(this.images);
        }
    }
})