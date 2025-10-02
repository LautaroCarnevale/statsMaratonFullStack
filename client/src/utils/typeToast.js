import { toast } from "vue3-toastify";


export function typeToast(type, message) {
    toast(message, {
        "type": type,
        "theme": "dark",
        "hideProgressBar": true,
        "dangerouslyHTMLString": true
    });
}