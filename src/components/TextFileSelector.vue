<script setup lang="ts">
import FileUpload, { FileUploadUploaderEvent } from 'primevue/fileupload';

const fileFromEvent = (event: FileUploadUploaderEvent): File => {
    const files: File | File[] = event.files;
    if (Array.isArray(files)) {
        return files[0];
    }
    return files;
};
const emit = defineEmits<{
    (e: 'text', text: string): void
}>()
const customCSVUploader = async (event: FileUploadUploaderEvent) => {
    const file = fileFromEvent(event);
    const reader = new FileReader();
    reader.onload = () => {
        const text =  reader.result as string;
        console.log(text)
        emit('text', text)
    };
    reader.readAsText(file);

};

</script>

<template>
    <FileUpload mode="basic" :auto="true" chooseLabel="Select CSV" :customUpload="true" @uploader="customCSVUploader"
        accept=".csv" />
</template>