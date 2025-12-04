<script setup>
import { computed } from 'vue';
import { useUIStore } from '../stores/uiStore';

const uiStore = useUIStore();

const visible = computed(() => uiStore.modals.filePreview.visible);
const fileUrl = computed(() => uiStore.modals.filePreview.fileUrl);
const fileName = computed(() => uiStore.modals.filePreview.fileName);
const fileType = computed(() => uiStore.modals.filePreview.fileType);

const isImage = computed(() => ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType.value));
const isPdf = computed(() => fileType.value === 'pdf');

const close = () => {
  uiStore.closeFilePreviewModal();
};
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="visible" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <!-- Overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="close"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <!-- Modal Panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
          
          <!-- Header -->
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b">
            <div class="flex justify-between items-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900 truncate pr-4" id="modal-title">
                {{ fileName }}
              </h3>
              <button @click="close" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                <i class="bi bi-x-lg text-xl"></i>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="bg-gray-100 p-4 flex justify-center items-center min-h-[300px] max-h-[80vh] overflow-auto">
            
            <!-- Image Preview -->
            <img v-if="isImage" :src="fileUrl" :alt="fileName" class="max-w-full max-h-[70vh] object-contain shadow-sm" />
            
            <!-- PDF Preview -->
            <iframe v-else-if="isPdf" :src="fileUrl" class="w-full h-[70vh] border-0 shadow-sm"></iframe>
            
            <!-- Fallback -->
            <div v-else class="text-center p-8">
              <i class="bi bi-file-earmark-text text-6xl text-gray-400 mb-4 block"></i>
              <p class="text-gray-600 mb-4">Aperçu non disponible pour ce type de fichier.</p>
              <a 
                :href="fileUrl" 
                download 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <i class="bi bi-download mr-2"></i> Télécharger le fichier
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t">
            <a 
              :href="fileUrl" 
              download 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              <i class="bi bi-download mr-2"></i> Télécharger
            </a>
            <button 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="close"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
