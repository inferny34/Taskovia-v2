<script setup>
import { ref, computed } from 'vue';
import { useDropZone } from '@vueuse/core';
import { useFileUpload } from '../composables/useFileUpload';
import { formatFileSize } from '../utils/formatters';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  accept: {
    type: String,
    default: '*'
  }
});

const emit = defineEmits(['update:modelValue']);

const dropZoneRef = ref(null);
const fileInput = ref(null);

// Utilisation du composable partagé ou local si nécessaire
// Ici on utilise une logique locale simplifiée pour l'UI, 
// mais connectée au parent via v-model
const { files, filePreviews, errors, addFiles, removeFile, clearFiles } = useFileUpload();

const onDrop = (files) => {
  if (files) {
    addFiles(files);
    emit('update:modelValue', files.value);
  }
};

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const selectedFiles = event.target.files;
  if (selectedFiles) {
    addFiles(selectedFiles);
    emit('update:modelValue', files.value);
  }
  // Reset input pour permettre de resélectionner le même fichier
  event.target.value = '';
};

const handleRemove = (index) => {
  removeFile(index);
  emit('update:modelValue', files.value);
};

// Exposer la méthode clear pour le parent
defineExpose({ clearFiles });
</script>

<template>
  <div class="w-full">
    <!-- Zone de Drop -->
    <div 
      ref="dropZoneRef"
      @click="triggerFileInput"
      class="relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ease-in-out cursor-pointer text-center"
      :class="[
        isOverDropZone ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50',
        errors.length > 0 ? 'border-red-300 bg-red-50' : ''
      ]"
    >
      <input 
        ref="fileInput"
        type="file" 
        class="hidden" 
        :multiple="multiple" 
        :accept="accept"
        @change="handleFileChange"
      />
      
      <div class="space-y-2">
        <i class="bi bi-cloud-upload text-4xl text-gray-400"></i>
        <div class="text-sm text-gray-600">
          <span class="font-medium text-blue-600 hover:text-blue-500">Cliquez pour uploader</span>
          ou glissez-déposez vos fichiers
        </div>
        <p class="text-xs text-gray-500">
          PDF, Images, Word, Excel (max. 10MB)
        </p>
      </div>
    </div>

    <!-- Messages d'erreur -->
    <div v-if="errors.length > 0" class="mt-2">
      <p v-for="(error, index) in errors" :key="index" class="text-sm text-red-600 flex items-center">
        <i class="bi bi-exclamation-circle mr-1"></i> {{ error }}
      </p>
    </div>

    <!-- Liste des fichiers sélectionnés -->
    <div v-if="filePreviews.length > 0" class="mt-4 space-y-2">
      <h4 class="text-sm font-medium text-gray-700">Fichiers sélectionnés ({{ filePreviews.length }})</h4>
      <ul class="divide-y divide-gray-200 border rounded-md overflow-hidden">
        <li v-for="(file, index) in filePreviews" :key="index" class="flex items-center justify-between p-3 bg-white hover:bg-gray-50">
          <div class="flex items-center overflow-hidden">
            <!-- Preview Image -->
            <div class="flex-shrink-0 h-10 w-10 rounded border bg-gray-100 flex items-center justify-center overflow-hidden">
              <img v-if="file.type === 'image'" :src="file.url" class="h-full w-full object-cover" />
              <i v-else class="bi bi-file-earmark-text text-gray-500 text-xl"></i>
            </div>
            
            <!-- Info Fichier -->
            <div class="ml-3 truncate">
              <p class="text-sm font-medium text-gray-900 truncate" :title="file.name">{{ file.name }}</p>
              <p class="text-xs text-gray-500">{{ formatFileSize(file.file.size) }}</p>
            </div>
          </div>
          
          <!-- Bouton Supprimer -->
          <button 
            @click.stop="handleRemove(index)" 
            class="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
            title="Supprimer"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
