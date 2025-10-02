import { ref } from 'vue';
import { AtletasApi } from '../api/atletas.api';
import { typeToast } from '../utils/typeToast';

const atletas = ref([]);
const loading = ref(false);
const error = ref(null);

async function fetchAtletas(params) {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await AtletasApi.list(params);
    atletas.value = data;
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}

async function createAtleta(payload) {
  await AtletasApi.create(payload);
  typeToast('success', 'Atleta creado');
  await fetchAtletas();
}

async function updateAtleta(id, payload) {
  await AtletasApi.update(id, payload);
  typeToast('success', 'Atleta actualizado');
  await fetchAtletas();
}

async function removeAtleta(id) {
  await AtletasApi.remove(id);
  typeToast('success', 'Atleta eliminado');
  await fetchAtletas();
}

export function useAtletas() {
  return { atletas, loading, error, fetchAtletas, createAtleta, updateAtleta, removeAtleta };
}
