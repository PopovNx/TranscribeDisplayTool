<script setup lang="ts">
import TokenArea from './TokenArea.vue';
import { useStateStore } from '../stateStore';
import TextFileSelector from './TextFileSelector.vue';

const stateStore = useStateStore();


</script>
<template>
    <div class="transcribe-display">
        <h2>Tags</h2>
        <TokenArea :records="stateStore.tagRecords"/>
        <TextFileSelector v-if="stateStore.tagRecords.length === 0" @text="stateStore.parseTagCsv($event)" />
    </div>
</template>

<style scoped>
.transcribe-display {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h2 {
    margin: 0;
    padding: 0;
}

</style>