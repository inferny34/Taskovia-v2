<script setup>
import { ref, watch } from 'vue';
import { useTasks } from '../composables/useTasks';
import { useUIStore } from '../stores/uiStore';
import { useDebounceFn } from '@vueuse/core';

const { setFilters } = useTasks();
const uiStore = useUIStore();

const search = ref('');
const priorityOrder = ref('');
const deadlineOrder = ref('');

// Debounce la recherche pour éviter trop d'appels
const debouncedSearch = useDebounceFn((value) => {
  setFilters({ search: value });
}, 300);

watch(search, (newValue) => {
  debouncedSearch(newValue);
});

const handlePriorityChange = () => {
  if (priorityOrder.value) {
    deadlineOrder.value = ''; // Reset deadline sort
    setFilters({ priorityOrder: priorityOrder.value, deadlineOrder: null });
  } else {
    setFilters({ priorityOrder: null });
  }
};

const handleDeadlineChange = () => {
  if (deadlineOrder.value) {
    priorityOrder.value = ''; // Reset priority sort
    setFilters({ deadlineOrder: deadlineOrder.value, priorityOrder: null });
  } else {
    setFilters({ deadlineOrder: null });
  }
};
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
      
      <!-- Recherche -->
      <div class="flex-1 min-w-0">
        <label for="search" class="sr-only">Rechercher</label>
        <div class="relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="bi bi-search text-gray-400"></i>
          </div>
          <input 
            type="text" 
            id="search" 
            v-model="search"
            class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" 
            placeholder="Rechercher une tâche..." 
          />
        </div>
      </div>

      <!-- Filtres -->
      <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        
        <!-- Tri Priorité -->
        <select 
          v-model="priorityOrder" 
          @change="handlePriorityChange"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Trier par priorité</option>
          <option value="asc">Priorité: Basse à Haute</option>
          <option value="desc">Priorité: Haute à Basse</option>
        </select>

        <!-- Tri Échéance -->
        <select 
          v-model="deadlineOrder" 
          @change="handleDeadlineChange"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Trier par échéance</option>
          <option value="asc">Date: Plus proche</option>
          <option value="desc">Date: Plus lointaine</option>
        </select>

        <!-- Bouton Nouvelle Tâche -->
        <button 
          @click="uiStore.showNewTaskForm()"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
        >
          <i class="bi bi-plus-lg mr-2"></i> Nouvelle tâche
        </button>
      </div>
    </div>
  </div>
</template>
