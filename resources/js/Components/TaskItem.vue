<script setup>
import { computed } from 'vue';
import { useUIStore } from '../stores/uiStore';
import { 
  formatDate, 
  formatTimeRemaining, 
  getStatusIconClass, 
  getPriorityImagePath,
  translatePriority
} from '../utils/formatters';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);
const uiStore = useUIStore();

const statusIconClass = computed(() => getStatusIconClass(props.task.statut));
const priorityImage = computed(() => getPriorityImagePath(props.task.priorite));
const priorityLabel = computed(() => translatePriority(props.task.priorite));

const timeRemaining = computed(() => formatTimeRemaining(props.task.echeance));
const isOverdue = computed(() => timeRemaining.value.includes('retard'));

const openFilePreview = (file) => {
  uiStore.openFilePreviewModal(`/storage/${file.chemin}`, file.nom);
};
</script>

<template>
  <tr class="hover:bg-gray-50 transition-colors duration-150">
    <!-- Nom de la tâche -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm font-medium text-gray-900">{{ task.nom }}</div>
    </td>

    <!-- Statut -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center" :title="task.statut">
        <i :class="[statusIconClass, 'text-xl']"></i>
      </div>
    </td>

    <!-- Priorité -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center" :title="priorityLabel">
        <img 
          v-if="priorityImage" 
          :src="priorityImage" 
          :alt="priorityLabel" 
          class="h-6 w-6 object-contain"
        />
        <span v-else class="text-sm text-gray-500">{{ priorityLabel }}</span>
      </div>
    </td>

    <!-- Échéance -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ formatDate(task.echeance) }}</div>
      <div 
        v-if="task.echeance" 
        class="text-xs" 
        :class="isOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'"
      >
        {{ timeRemaining }}
      </div>
    </td>

    <!-- Fichiers joints -->
    <td class="px-6 py-4">
      <ul v-if="task.fichiers && task.fichiers.length > 0" class="space-y-1">
        <li v-for="file in task.fichiers" :key="file.id" class="flex items-center text-sm">
          <i class="bi bi-paperclip text-gray-400 mr-1"></i>
          <a 
            href="#" 
            @click.prevent="openFilePreview(file)"
            class="text-blue-600 hover:text-blue-800 hover:underline truncate max-w-[150px]"
            :title="file.nom"
          >
            {{ file.nom }}
          </a>
        </li>
      </ul>
      <span v-else class="text-xs text-gray-400 italic">Aucun fichier</span>
    </td>

    <!-- Actions -->
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div class="flex justify-end space-x-2">
        <button 
          @click="$emit('edit', task)" 
          class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
          title="Modifier"
        >
          <i class="bi bi-pencil text-lg"></i>
        </button>
        <button 
          @click="$emit('delete', task)" 
          class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
          title="Supprimer"
        >
          <i class="bi bi-trash text-lg"></i>
        </button>
      </div>
    </td>
  </tr>
</template>
