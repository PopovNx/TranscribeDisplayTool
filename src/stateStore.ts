import { defineStore } from "pinia"
import { Ref, onMounted, ref } from "vue"
import { Row, RowExtended } from "./types";
import csvtojson from 'csvtojson';
import { useUrlSearchParams } from "@vueuse/core";

export const useStateStore = defineStore('state', () => {
    const audioUrl = ref<string | null>(null);
    const currentTime = ref<number>(0);
    const transcribeRecords = ref<RowExtended[]>([]);
    const tagRecords = ref<RowExtended[]>([]);
    const params = useUrlSearchParams('history');
    const loading = ref<boolean>(false);
    function extendRow(row: Row): RowExtended {
        const start = row.start.split(":");
        const end = row.end.split(":");
        const startSeconds = parseInt(start[0]) * 3600 + parseInt(start[1]) * 60 + parseFloat(start[2]);
        const endSeconds = parseInt(end[0]) * 3600 + parseInt(end[1]) * 60 + parseFloat(end[2]);
        return {
            ...row,
            startSeconds,
            endSeconds,
        }
    }
    function parseCsv(csv: string, result: Ref<RowExtended[]>) {
        csvtojson({
            output: "json",
            headers: ["speaker", "start", "end", "text"],
        }).fromString(csv)
            .then((csvRow: Row[]) => {
                result.value = csvRow.map(extendRow);
            });
    }

    function parseTranscribeCsv(csv: string) {
        parseCsv(csv, transcribeRecords);
    }

    function parseTagCsv(csv: string) {
        parseCsv(csv, tagRecords);
    }

    onMounted(async () => {
        loading.value = true;
        if (params.audioUrl && typeof params.audioUrl === 'string') {
            const blob = await fetch(params.audioUrl).then((response) => response.blob());
            const url = URL.createObjectURL(blob);
            audioUrl.value = url;
        }
        if (params.transcribeRecordsUrl && typeof params.transcribeRecordsUrl === 'string') {
            const csvValue = await fetch(params.transcribeRecordsUrl).then((response) => response.text());
            parseTranscribeCsv(csvValue);
        }

        if (params.tagRecordsUrl && typeof params.tagRecordsUrl === 'string') {
            const csvValue = await fetch(params.tagRecordsUrl).then((response) => response.text());
            parseTagCsv(csvValue);
        }    
        loading.value = false;
    })

    return { audioUrl, currentTime, transcribeRecords, tagRecords, parseTranscribeCsv, parseTagCsv, loading }
})