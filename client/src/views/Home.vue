<script setup>
// iconos
import GravityUiPersons from "../components/icons/GravityUiPersons.vue";
import TdesignLocation from "../components/icons/TdesignLocation.vue";
import TdesingTime from "../components/icons/TdesignTime.vue";
import NimbusStats from "../components/icons/NimbusStats.vue";
import Cup from "../components/icons/Cup.vue";
import Medal from "../components/icons/Medal.vue";
// vue
import { computed, onMounted, ref } from "vue";
// composables
import { useCiudades } from "../composables/useCiudades";
import { useAtletas } from "../composables/useAtletas";

const { ciudades, fetchCiudades } = useCiudades();
const { atletas, fetchAtletas } = useAtletas();

onMounted(() => fetchAtletas());
onMounted(() => fetchCiudades());

// informacion de las estadisticas
const statsInfo = computed(() => [
    {
        title: "Total Atletas",
        icon: GravityUiPersons,
        value: atletas.value.length || "-",
        description: "Participantes registrados",
    },
    {
        title: "Ciudades",
        icon: TdesignLocation,
        value: ciudades.value.length || "-",
        description: "Ciudades registradas",
    },
    {
        title: "Mejor Tiempo",
        icon: TdesingTime,
        value: atletas.value.find(a => a.posicion === 1)?.tiempo || "-",
        description: "Récord actual",
    },
    {
        title: "Tiempo Promedio",
        icon: NimbusStats,
        value: atletas.value.reduce((acc, a) => acc + a.tiempo, 0) / atletas.value.length || "-",
        description: "Promedio de la competencia",
    },
]);

// genera el podio con sus estilos e informacion
const podioStats = computed(() => {

    if (!atletas.value.length) return [];

    // busca al primero, segundo y tercero
    const primero = atletas.value.find(a => a.posicion === 1);
    const segundo = atletas.value.find(a => a.posicion === 2);
    const tercero = atletas.value.find(a => a.posicion === 3);

    const base = [
        { title: "SUBCAMPEÓN", icon: "🥈", color: "bg-gray-50", colorText: "text-gray-400", border: "border-gray-200", atleta: segundo },
        { title: "CAMPEÓN", icon: "🥇", color: "bg-yellow-50", colorText: "text-yellow-500", border: "border-yellow-200", scale: "scale-110 max-lg:scale-100", atleta: primero },
        { title: "TERCER LUGAR", icon: "🥉", color: "bg-amber-50", colorText: "text-amber-600", border: "border-amber-200", atleta: tercero },
    ];

    return base
        .filter(b => b.atleta)
        .map(b => ({
            title: b.title,
            icon: b.icon,
            color: b.color,
            border: b.border,
            scale: b.scale,
            colorText: b.colorText,
            name: b.atleta.nombre,
            time: b.atleta.tiempo,
            city: b.atleta.ciudad?.nombre ?? b.atleta.ciudad,
            dni: b.atleta.dni,
        }));
});


</script>

<template>
    <section class="mb-12 w-full flex justify-center flex-col items-center py-12 text-center gap-4">
        <h1 class="text-5xl text-red-600 flex gap-3 intems-center font-black tracking-tight">
            <Cup class="w-12 h-12" /> MARATÓN STATS
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Sistema de gestión y seguimiento de estadísticas para competencias de
            maratón
        </p>
    </section>

    <section class="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
        <article v-for="stat in statsInfo" class="flex flex-col justify-between gap-7 p-6 border rounded-xl">
            <div class="flex justify-between">
                <span class="font-medium text-sm">{{ stat.title }}</span>
                <div class="flex items-center">
                    <component :is="stat.icon" />
                </div>
            </div>
            <div class="flex flex-col">
                <span class="text-2xl font-bold">{{ stat.value }}</span>
                <p class="text-xs text-gray-500">{{ stat.description }}</p>
            </div>
        </article>
    </section>

    <section class="flex flex-col justify-center gap-8 border rounded-xl p-6 shadow-sm mb-12">
        <div>
            <h2 class="flex gap-2 items-center text-2xl font-semibold mb-1">
                <Medal class="text-red-600" /> PODIO DE GANADORES
            </h2>
            <p class="text-sm">Los mejores tiempos de la competencia</p>
        </div>

        <section class="grid grid-cols-3 gap-6 justify-items-center mx-auto w-full max-lg:grid-cols-1">
            <article v-for="stat in podioStats" :key="stat.dni" :class="[
                'p-6 border-2 rounded-lg text-center w-full h-full',
                stat.color,
                stat.border,
                stat.scale,
            ]">
                <div class="flex flex-col">
                    <span class="text-4xl font-bold">{{ stat.icon }}</span>
                    <div class=" flex justify-center">
                        <span :class="['font-bold text-sm', stat.colorText]">{{ stat.title }}</span>
                    </div>
                    <p class="text-xl font-bold">{{ stat.name }}</p>
                    <p :class="['text-xl font-bold my-3', stat.colorText]">{{ stat.time }}</p>
                    <p class="text-sm flex gap-1 justify-center items-center">
                        <TdesignLocation /> {{ stat.city }}
                    </p>
                    <p class="text-sm">DNI: {{ stat.dni }}</p>
                </div>
            </article>
        </section>
    </section>

    <section class="flex justify-center gap-8 pb-12 max-lg:flex-col">
        <section class="flex flex-col justify-center border rounded-xl p-6 w-1/2 max-lg:w-full">
            <div class="flex gap-3 items-center">
                <GravityUiPersons class="w-6 h-6 text-red-600" />
                <p class="text-xl font-semibold">Gestion de Atletas</p>
            </div>
            <p class="mb-8 text-sm">Administra los participantes de la maratón</p>
            <div class="w-full">
                <router-link to="/atletas">
                    <button class="bg-red-600 w-full text-white py-2 px-4 rounded-md cursor-pointer">
                        Ver Atletas
                    </button>
                </router-link>
            </div>
        </section>

        <section class="flex flex-col justify-center border rounded-xl p-6 w-1/2 max-lg:w-full">
            <div class="flex gap-3 items-center">
                <GravityUiPersons class="w-6 h-6 text-red-600" />
                <p class="text-xl font-semibold">Gestión de Ciudades</p>
            </div>
            <p class="mb-8 text-sm">Administra las ciudades participantes</p>
            <div class="w-full">
                <router-link to="/ciudades">
                    <button class="bg-red-600 w-full text-white py-2 px-4 rounded-md cursor-pointer">
                        Ver Ciudades
                    </button>
                </router-link>
            </div>
        </section>
    </section>
</template>
