<script setup>
import Plus from "../components/icons/Plus.vue";
import Cup from "../components/icons/Cup.vue";
import Edit from "../components/icons/Edit.vue";
import Trash from "../components/icons/Trash.vue";
import AtletaForm from "../components/AtletaForm.vue";
import { onMounted, ref } from "vue";

import { useAtletas } from "../composables/useAtletas";

const { atletas, fetchAtletas, removeAtleta } = useAtletas();

onMounted(() => fetchAtletas());

const isOpenAtletaForm = ref(false);
const isOpenAtletaFormEdit = ref(false);

const medallas = { 1: "🥇", 2: "🥈", 3: "🥉" };


function toggleAtletaForm() {
	isOpenAtletaForm.value = !isOpenAtletaForm.value;
}
function toggleAtletaEditForm() {
	isOpenAtletaFormEdit.value = !isOpenAtletaFormEdit.value;
}

</script>

<template>
	<section class="flex justify-between my-12">
		<div>
			<h1 class="text-4xl font-black text-red-600">GESTIÓN DE ATLETAS</h1>
			<p>Administra los participantes de la maratón</p>
		</div>
		<div>
			<button @click="isOpenAtletaForm = !isOpenAtletaForm"
				class="bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer flex items-center gap-3">
				<Plus /> Nuevo Atleta
			</button>
		</div>
	</section>

	<section class="pb-12">
		<div class="border rounded-xl p-6 shadow-sm">
			<h2 class="text-2xl font-bold flex gap-2 items-center">
				<Cup class="text-red-600" /> Ranking de Atletas
			</h2>
			<p class="mb-4">
				Total de atletas:
				<span class="font-bold bg-blue-950 rounded-full px-2.5 text-white text-sm py-0.5">{{ atletas.length
				}}</span>
			</p>
			<table class="w-full">
				<thead class="border-b text-left h-10">
					<tr>
						<th>Pos.</th>
						<th>Atleta</th>
						<th>Dni</th>
						<th>Tiempo</th>
						<th>Ciudad</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr :class="['border-b h-12', atleta.posicion <= 3 ? 'bg-yellow-50' : '']"
						v-for="atleta in atletas.sort((a, b) => a.posicion - b.posicion)" :key="atleta.id">
						<td class="pl-2">{{ atleta.posicion }} {{ medallas[atleta.posicion] || "" }} </td>
						<td>{{ atleta.nombre }}</td>
						<td>{{ atleta.dni }}</td>
						<td>{{ atleta.tiempo }}</td>
						<td>{{ atleta.ciudad }}</td>
						<td>
							<button @click="atletaSeleccionado = atleta; toggleAtletaEditForm()"
								class="mr-3 cursor-pointer border p-1 rounded-sm bg-amber-50">
								<Edit class="w-5 h-5" />
							</button>
							<button class="cursor-pointer border p-1 rounded-sm bg-amber-50"
								@click="removeAtleta(atleta.id)">
								<Trash class="w-5 h-5" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
	<section v-if="isOpenAtletaForm || isOpenAtletaFormEdit"
		@click="isOpenAtletaForm = false; isOpenAtletaFormEdit = false"
		class=" z-51 absolute top-0 right-0 w-full h-full bg-black opacity-50"></section>

	<AtletaForm mode="edit" :initialValue="atletaSeleccionado" v-if="isOpenAtletaFormEdit"
		@close="toggleAtletaEditForm" />

	<AtletaForm mode="create" v-if="isOpenAtletaForm" @close="toggleAtletaForm" />
</template>
