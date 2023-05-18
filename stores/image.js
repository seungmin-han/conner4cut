import { defineStore } from "pinia";


export const useImageStore = defineStore('imageStore', {
    state: () => ({
        images: [],
        selectedIndex: new Set(),
    }),
    getters: {
        
    },
    actions: {
        addImage(image) {
            this.images.push(image);
        },
        select(idx) {
            this.selectedIndex.add(idx);
        },
        isSelected(idx) {
            return this.selectedIndex.has(idx);
        },
        deselect(idx) {
            this.selectedIndex.delete(idx);
        }
    }
})