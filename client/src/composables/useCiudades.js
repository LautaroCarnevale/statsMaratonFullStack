import { ref } from "vue";
import { CiudadesApi } from "../api/ciudades.api";
import { typeToast } from "../utils/typeToast";

const ciudades = ref([]);
const loading = ref(false);
const error = ref(null);

async function fetchCiudades(params) {
    loading.value = true;
    error.value = null;
    try {
        const { data } = await CiudadesApi.list(params);

        ciudades.value = data;
    } catch (e) {
        error.value = e;
    } finally {
        loading.value = false;
    }
};

async function createCiudad(payload) {
    await CiudadesApi.create(payload);
    typeToast('success', 'Ciudad creada');
    await fetchCiudades();
};

async function updateCiudad(id, payload) {
    await CiudadesApi.update(id, payload);
    typeToast('success', 'Ciudad actualizada');
    await fetchCiudades();
};

async function removeCiudad(id) {
    await CiudadesApi.remove(id);
    typeToast('success', 'Ciudad eliminada');
    await fetchCiudades();
};

export function useCiudades() {
    return { ciudades, loading, error, fetchCiudades, createCiudad, updateCiudad, removeCiudad };
}