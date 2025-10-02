<script setup>
import { onMounted, ref, watchEffect, computed } from "vue";
import { useAtletas } from "../composables/useAtletas";
import { useCiudades } from "../composables/useCiudades";
import TdesignLocation from "./icons/TdesignLocation.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { validationAtletaSchema } from "../schema/validationAtletaSchema";

const props = defineProps({
	mode: { type: String, default: "create" },
	initialValue: {
		type: Object,
		default: () => ({
			id: null,
			nombre: "",
			dni: "",
			tiempo: "",
			posicion: "",
			ciudadId: ""
		})
	}
});

const emit = defineEmits(["close", "saved"]);

const isEdit = computed(() => props.mode === "edit");

const { updateAtleta, createAtleta } = useAtletas();
const { ciudades, fetchCiudades } = useCiudades();


onMounted(fetchCiudades);

// variables
const form = ref({
	nombre: "",
	dni: "",
	tiempo: "",
	posicion: "",
	ciudadId: ""
});

const idEdit = ref(null);
const loading = ref(false);

watchEffect(() => {
	idEdit.value = props.initialValue?.id ?? null;
	form.value = {
		nombre: props.initialValue?.nombre ?? "",
		dni: String(props.initialValue?.dni ?? ""),
		tiempo: props.initialValue?.tiempo ?? "",
		posicion: String(props.initialValue?.posicion ?? ""),
		ciudadId: props.initialValue?.ciudadId ?? ""
	};
});

async function onSubmit(values, { setErrors, setFieldError }) {
	loading.value = true;
	try {
		const payload = {
			nombre: form.value.nombre.trim(),
			dni: Number(form.value.dni),
			tiempo: form.value.tiempo,
			posicion: Number(form.value.posicion),
			ciudadId: form.value.ciudadId
		};

		const saved = isEdit.value
			? await updateAtleta(idEdit.value, payload)
			: await createAtleta(payload);

		emit("saved", saved);

	} catch (err) {
		// erroes generales: ej: "usuario ya existente"
		if (err?.errors && typeof err.errors === "object") {
			setErrors(err.errors);
		} else if (Array.isArray(err?.message)) {
			setFieldError("__root__", err.message.join(" • "));
		} else if (typeof err?.message === "string") {
			setFieldError("__root__", err.message);
		} else {
			setFieldError("__root__", "Ocurrió un error al guardar. Intenta nuevamente.");
		}
	} finally {
		loading.value = false;
	}
}

</script>

<template>
	<section
		class="z-52 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg p-5 shadow-2xl w-[500px]">
		<div>
			<p class="m-0 p-0 text-xl flex items-center gap-2 font-semibold">
				<TdesignLocation class="text-red-600" />
				{{ isEdit ? "Editar Atleta" : "Nuevo Atleta" }}
			</p>
			<p class="m-0 p-0 text-sm">
				{{ isEdit ? "Actualiza los datos del atleta." : "Agrega un nuevo atleta a la competencia." }}
			</p>
		</div>
		<Form :validation-schema="validationAtletaSchema" @submit="onSubmit">
			<div class="flex flex-col my-5">
				<label class="block text-sm font-semibold mb-2">Nombre Completo</label>
				<Field class="w-full border border-gray-300 rounded py-2 px-3" name="nombre" type="text"
					placeholder="Pedro Perez" v-model="form.nombre" />
				<ErrorMessage name="nombre" class="text-red-600 text-xs mt-1" />
			</div>
			<div class="flex flex-col my-5">
				<label class="block text-sm font-semibold mb-2">DNI</label>
				<Field class="w-full border border-gray-300 rounded py-2 px-3 disabled:bg-gray-100" name="dni"
					type="number" placeholder="12345678" v-model="form.dni" />
				<ErrorMessage name="dni" class="text-red-600 text-xs mt-1" />
			</div>

			<div class="flex flex-col my-5">
				<label class="block text-sm font-semibold mb-2">Tiempo (HH:MM:SS)</label>
				<Field class="w-full border border-gray-300 rounded py-2 px-3" name="tiempo" type="text"
					placeholder="00:00:00" v-model="form.tiempo" />
				<ErrorMessage name="tiempo" class="text-red-600 text-xs mt-1" />
			</div>

			<div class="flex flex-col my-5">
				<label class="block text-sm font-semibold mb-2">Posición</label>
				<Field v-model="form.posicion" class="w-full border border-gray-300 rounded py-2 px-3" name="posicion"
					type="number" />
				<ErrorMessage name="posicion" class="text-red-600 text-xs mt-1" />
			</div>
			<div class="flex flex-col my-5">
				<label class="block text-sm font-semibold mb-2">Ciudad</label>
				<Field class="w-full border border-gray-300 rounded py-2 px-3" name="ciudadId" as="select"
					v-model="form.ciudadId">
					<option disabled value="">Seleccione una ciudad</option>
					<option v-for="ciudad in ciudades" :key="ciudad._id" :value="ciudad._id">
						{{ ciudad.nombre }}
					</option>
				</Field>
				<ErrorMessage name="ciudadId" class="text-red-600 text-xs mt-1" />
			</div>
			<ErrorMessage name="__root__" class="text-red-600 text-sm mt-1" />

			<div class="flex justify-end gap-3 mt-8 ">
				<button type="button" @click="$emit('close')"
					class="p-2 rounded-md bg-gray-600 text-white cursor-pointer">
					Cancelar
				</button>
				<button type="submit" class="p-2 rounded-md bg-red-600 text-white disabled:opacity-60 cursor-pointer"
					:disabled="loading">
					{{ isEdit ? "Guardar Cambios" : "Crear Atleta" }}
				</button>
			</div>
		</Form>
	</section>
</template>
