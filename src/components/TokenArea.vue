<script setup lang="ts">
import { RowExtended } from '../types';
import { ref, watch } from 'vue';
import { useStateStore } from '../stateStore';

const stateStore = useStateStore();

defineProps<{ records: RowExtended[] }>();

function isSelected(record: RowExtended) {
  const time = stateStore.currentTime;
  return time && time >= record.startSeconds && time <= record.endSeconds;
}

const scrollTarget = ref<HTMLElement | null | HTMLElement[]>(null);
function scrollToSelected() {
  if (!scrollTarget.value)
    return;
  console.log('scrolling to selected', scrollTarget.value);
  let target = scrollTarget.value;
  if (Array.isArray(target)) {
    if (target.length === 0)
      return;
    target = target[0];

  }
  target.scrollIntoView({ behavior: 'smooth', block: 'center', });

}

watch(() => stateStore.currentTime, (currentTime) => {
  if (!currentTime)
    return;
  scrollToSelected();
})


</script>

<template>
  <div class="token-area">
    <div v-for="record in records" :key="record.speaker" class="time-record" :class="{ selected: isSelected(record) }">
      <span class="time-record__time">
        <p>{{ record.start }}</p>
        <p>{{ record.end }}</p>
      </span>
      <span class="time-record__speaker" v-if="record.speaker">[{{ record.speaker }}]</span>
      <span class="time-record__text">{{ record.text }}</span>
      <span class="scroll-to-selected" ref="scrollTarget" v-if="isSelected(record)"></span>
    </div>
  </div>
</template>

<style scoped>
.token-area {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  font-size: 14px;
  height: 100%;
  width: 100%;
  background-color: #f6f6f6;
  border: 1px solid #ccc;
}

.time-record {
  display: flex;
  flex-direction: row;
  padding: 5px;
  gap: 10px;
}

.time-record:nth-child(odd) {
  background-color: #f0f0f0;
}


.time-record__speaker {
  display: flex;
  align-items: center;
}

.time-record__time p {
  margin: 0;
}

.time-record__text {
  flex: 1;
}

.time-record.selected {
  background-color: #fdc2c2;
}
</style>