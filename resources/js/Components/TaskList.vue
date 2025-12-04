<script setup>
import { onMounted } from 'vue';
import { useTasks } from '../composables/useTasks';
import { useUIStore } from '../stores/uiStore';
import TaskItem from './TaskItem.vue';

const { filteredTasks, loading, error, loadTasks, deleteTask } = useTasks();
const uiStore = useUIStore();

onMounted(() => {
  loadTasks();
});

const handleEdit = (task) => {
  uiStore.openTaskEditModal(task.id);
};

const handleDelete = (task) => {
  uiStore.openConfirmDeleteModal(task.id, async () => {
    await deleteTask(task.id);
  });
};
</script>

<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
    <!-- Loading State -->
    <div v-if="loading && filteredTasks.length === 0" class="p-8 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Chargement des tâches...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 text-center text-red-600">
      <i class="bi bi-exclamation-triangle text-3xl mb-2 block"></i>
      {{ error }}
      <button 
        @click="loadTasks" 
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Réessayer
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredTasks.length === 0" class="p-12 text-center">
      <i class="bi bi-clipboard-check text-5xl text-gray-300 mb-4 block"></i>
      <h3 class="text-lg font-medium text-gray-900">Aucune tâche trouvée</h3>
      <p class="mt-1 text-gray-500">Commencez par créer une nouvelle tâche ou modifiez vos filtres.</p>
      <button 
        @click="uiStore.showNewTaskForm()" 
        class="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      >
        <i class="bi bi-plus-lg mr-2"></i> Nouvelle tâche
      </button>
    </div>

    <!-- Task List -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tâche
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priorité
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Échéance
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fichiers
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <TaskItem 
            v-for="task in filteredTasks" 
            :key="task.id" 
            :task="task"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
