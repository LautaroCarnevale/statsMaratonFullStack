<script setup>
import { ref, computed, watchEffect } from "vue";
import TdesignLocation from "./icons/TdesignLocation.vue";
import { useCiudades } from "../composables/useCiudades";
import { Form, Field, ErrorMessage } from "vee-validate";
import { validationCiudadSchema } from "../schema/validationCiudadSchema";
const { createCiudad, updateCiudad } = useCiudades();
const props = defineProps({
    mode: { type: String, default: "create" },
    initialValue: {
        type: Object,
        default: () => ({
            _id: null,
            ciudad: "",
        })
    }
});


const name = ref("");
const isEdit = computed(() => props.mode === "edit");

const emit = defineEmits(["close", "saved"]);
const idEdit = ref(null);
const loading = ref(false);

watchEffect(() => {
    idEdit.value = props.initialValue?._id ?? null;
    name.value = props.initialValue?.nombre ?? "";
});


async function onSubmit() {
    loading.value = true;
    try {
        const saved = isEdit.value
            ? await updateCiudad(idEdit.value, { nombre: name.value })
            : await createCiudad({ nombre: name.value });

        emit("saved", saved);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}


</script>

<template>
    <section
        class="z-52 flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg p-5 shadow-2xl w-[500px]">
        <div>
            <p class="m-0 p-0 text-xl flex items-center gap-2 font-semibold">
                <TdesignLocation class="text-red-600" />
                {{ isEdit ? "Editar Ciudad" : "Nueva Ciudad" }}
            </p>
            <p class="m-0 p-0 text-sm">
                {{ isEdit ? "Modifica los datos de la ciudad" : "Completa los datos para crear una nueva ciudad" }}
            </p>
        </div>
        <Form :validation-schema="validationCiudadSchema" @submit="onSubmit">
            <div class="flex flex-col my-5">
                <label class="block text-sm font-semibold mb-2">Nombre de la Ciudad</label>
                <Field name="ciudad" v-model="name" type="text" placeholder="Cordoba"
                    class="w-full border border-gray-300 rounded py-2 px-3" />
                <ErrorMessage name="ciudad" class="text-red-600 text-xs mt-1" />
            </div>
            <div class="flex justify-end gap-5 mt-8">
                <button type="button" @click="$emit('close')"
                    class="flex justify-end p-2 y-1 rounded-md bg-gray-600 text-white cursor-pointer">
                    Cancelar
                </button>
                <button :disabled="loading" type="submit"
                    class="flex justify-end p-2 y-1 rounded-md bg-red-600 text-white cursor-pointer">
                    {{
                        loading ? (isEdit ? "Guardando..." : "Creando...") : (isEdit ? "Guardar Cambios" : "Crear Ciudad")
                    }}
                </button>
            </div>
        </Form>
    </section>
</template>
