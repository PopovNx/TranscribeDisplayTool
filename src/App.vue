<script setup lang="ts">
import AudioDisplay from './components/AudioDisplay.vue';
import TranscribeDisplay from './components/TranscribeDisplay.vue';
import TagDisplay from './components/TagDisplay.vue';
import AudioFileSelector from './components/AudioFileSelector.vue';
import { useStateStore } from './stateStore';
const stateStore = useStateStore();




</script>

<template>
    <main v-show="!stateStore.loading">
        <div v-if="!stateStore.audioUrl">
            <AudioFileSelector />
        </div>
        <div v-else class="audio-display-container">
            <AudioDisplay />
        </div>
        <div class="displays">
            <TagDisplay id="tag-display" />
            <TranscribeDisplay id="transcribe-display" />
        </div>
    </main>
    <div v-if="stateStore.loading">
        <p>Loading...</p>
    </div>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.audio-display-container {
    width: min(100%, 500px);
}

#transcribe-display {
    width: min(100%, 500px);
    height: min(100%, 400px);
}

#tag-display {
    width: min(100%, 500px);
    height: min(100%, 400px);
}
.displays {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: min(100%, 400px);
    justify-content: center;
}
</style>
