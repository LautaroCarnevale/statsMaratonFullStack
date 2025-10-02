<script setup>
import Cup from '../components/icons/Cup.vue';
import Home from '../components/icons/Home.vue';
import GravityUiPersons from './icons/GravityUiPersons.vue';
import TdesignLocation from './icons/TdesignLocation.vue';

</script>

<template>
    <header
        class="flex justify-center items-center w-full h-16 border-b border-b-red-500 sticky top-0 bg-background/95 backdrop-blur z-50">
        <div class="flex items-center justify-between min-w-10/12 max-lg:w-full">
            <router-link to="/" class="cursor-pointer">
                <div class="flex items-center gap-3 mx-7">
                    <div class="flex items-center p-2 text-white bg-red-600 rounded-lg">
                        <Cup class="w-6 h-6" />
                    </div>
                    <p class="flex gap-4 text-2xl font-bold text-red-600 select-none max-lg:text-base">
                        MARATÓN STATS
                    </p>
                </div>
            </router-link>
            <div class="flex items-center">
                <ul class="flex gap-3">
                    <li class="flex items-center">
                        <router-link to="/"
                            class="flex items-center gap-2 px-3 py-2 text-black rounded-md text-sm font-medium hover:bg-amber-600 hover:text-white"
                            active-class="text-white bg-red-600 hover:bg-red-600">
                            <Home class="w-4.5 h-4.5" />
                            Home
                        </router-link>
                    </li>
                    <li class="flex items-center">
                        <router-link to="/ciudades"
                            class="flex items-center gap-2 px-3 py-2 text-black rounded-md text-sm font-medium hover:bg-amber-600 hover:text-white"
                            active-class="text-white bg-red-600 hover:bg-red-600">
                            <TdesignLocation class="w-4 h-4 " />
                            Ciudades
                        </router-link>
                    </li>
                    <li class="flex items-center">
                        <router-link to="/atletas"
                            class="flex items-center gap-2 px-3 py-2 text-black rounded-md text-sm font-medium hover:bg-amber-600 hover:text-white"
                            active-class="text-white bg-red-600 hover:bg-red-600">
                            <GravityUiPersons class="w-4.5 h-4.5" />
                            Atletas
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

    </header>
</template>