<script setup lang="ts">
import { useStateStore } from '../stateStore';
const stateStore = useStateStore();

import FileUpload, { FileUploadUploaderEvent } from 'primevue/fileupload';

const fileFromEvent = (event: FileUploadUploaderEvent): File => {
    const files: File | File[] = event.files;
    if (Array.isArray(files)) {
        return files[0];
    }
    return files;
};

const customBase64Uploader = async (event: FileUploadUploaderEvent) => {
    const file = fileFromEvent(event);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        stateStore.audioUrl = reader.result as string;
    };
};

</script>

<template>
    <FileUpload mode="basic" :auto="true" chooseLabel="Select Audio" :customUpload="true"
                @uploader="customBase64Uploader" accept="audio/*" />
</template>