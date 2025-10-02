<script setup>
import { onMounted, ref } from "vue";

import Plus from "../components/icons/Plus.vue";
import Edit from "../components/icons/Edit.vue";
import Trash from "../components/icons/Trash.vue";
import CiudadForm from "../components/CiudadForm.vue";
import { useCiudades } from "../composables/useCiudades";
import TdesignLocation from "../components/icons/TdesignLocation.vue";

const { ciudades, loading, error, fetchCiudades, removeCiudad } = useCiudades();

onMounted(() => fetchCiudades());

const isOpenCiudadForm = ref(false);
const isOpenCiudadFormEdit = ref(false);

function toggleCiudadForm() {
    isOpenCiudadForm.value = !isOpenCiudadForm.value;
}
function toggleCiudadFormEdit() {
    isOpenCiudadFormEdit.value = !isOpenCiudadFormEdit.value;
}

</script>

<template>
    <section class="flex justify-between py-12">
        <div>
            <h1 class="text-4xl font-black text-red-600">GESTIÓN DE CIUDADES</h1>
            <p>Administra las ciudades participantes en la maratón</p>
        </div>
        <div>
            <button @click="isOpenCiudadForm = !isOpenCiudadForm"
                class="bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer flex items-center gap-3">
                <Plus /> Nueva Ciudad
            </button>
        </div>
    </section>

    <section class="pb-12">
        <div class="border rounded-xl p-6 shadow-sm">
            <h2 class="text-2xl font-bold flex gap-2 items-center">
                <TdesignLocation class="text-red-600" /> Ciudades Registradas
            </h2>
            <p class="mb-4">
                Total de ciudades:
                <span class="font-bold bg-blue-950 rounded-full px-2.5 text-white text-sm py-0.5">
                    {{ ciudades.length }}
                </span>
            </p>
            <table class="w-full">
                <thead class="border-b text-left h-10">
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha de registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b h-12" v-for="ciudad in ciudades" :key="ciudad._id">
                        <td>{{ ciudad.nombre }}</td>
                        <td>{{ ciudad.createdAt.split("T")[0] }}</td>
                        <td>
                            <button @click=" ciudadSeleccionada = ciudad; toggleCiudadFormEdit()"
                                class="mr-3 cursor-pointer border p-1 rounded-sm bg-amber-50">
                                <Edit class="w-5 h-5" />
                            </button>
                            <button class="cursor-pointer border p-1 rounded-sm bg-amber-50"
                                @click="removeCiudad(ciudad._id)">
                                <Trash class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <section v-if="isOpenCiudadForm || isOpenCiudadFormEdit"
        @click="isOpenCiudadForm = false; isOpenCiudadFormEdit = false"
        class="z-51 absolute top-0 right-0 w-full h-full bg-black opacity-50"></section>

    <CiudadForm v-if="isOpenCiudadFormEdit" :initialValue="ciudadSeleccionada" mode="edit"
        @close="toggleCiudadFormEdit" />
    <CiudadForm v-if="isOpenCiudadForm" @close="toggleCiudadForm" />
</template>
