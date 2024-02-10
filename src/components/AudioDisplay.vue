<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useStateStore } from '../stateStore';

const stateStore = useStateStore();
const audioLoading = ref(false)

onBeforeMount(() => {
    audioLoading.value = true
})
const audioElement = ref<HTMLAudioElement | null>(null)
function timeLog(label: Event) {
    const time = audioElement.value?.currentTime ?? 0
    console.log(label, time)
    stateStore.currentTime = time
}
</script>

<template>
    <section class="audio-display">
        <div v-if="audioLoading">
            <h3>Loading...</h3>
        </div>
        <div v-show="!audioLoading">
            <audio controls v-if="stateStore.audioUrl" preload="auto" :src="stateStore.audioUrl" @loadeddata="audioLoading = false" @timeupdate="timeLog" ref="audioElement">
                Your browser does not support the
                <code>audio</code> element.
            </audio>
        </div>
    </section>
</template>
<style scoped>
.audio-display {
    text-align: center;

}
audio {
    width: 100%;
}
</style>