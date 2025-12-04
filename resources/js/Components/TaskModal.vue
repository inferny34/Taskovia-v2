<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useTasks } from '../composables/useTasks';
import { useUIStore } from '../stores/uiStore';
import { useTaskStore } from '../stores/taskStore';
import FileUpload from './FileUpload.vue';

const { updateTask } = useTasks();
const uiStore = useUIStore();
const taskStore = useTaskStore();
const fileUploadRef = ref(null);

const visible = computed(() => uiStore.modals.taskEdit.visible);
const taskId = computed(() => uiStore.modals.taskEdit.taskId);
const task = computed(() => taskStore.taskById(taskId.value));

// Schéma de validation (similaire à TaskForm mais sans nom car non modifiable ici selon l'UI legacy)
// Note: L'UI legacy permettait de modifier statut, priorité, échéance et fichiers
const schema = yup.object({
  statut: yup.string().required().oneOf(['en_cours', 'en_attente', 'termine', 'annule']),
  priorite: yup.string().required().oneOf(['haute', 'moyenne', 'basse']),
  echeance: yup.date().nullable()
});

const { values, errors, defineField, handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema
});

const [statut, statutAttrs] = defineField('statut');
const [priorite, prioriteAttrs] = defineField('priorite');
const [echeance, echeanceAttrs] = defineField('echeance');

const files = ref([]);
const isSubmitting = ref(false);

// Charger les données quand le modal s'ouvre
watch(() => visible.value, (isVisible) => {
  if (isVisible && task.value) {
    setValues({
      statut: task.value.statut,
      priorite: task.value.priorite,
      echeance: task.value.echeance
    });
    files.value = [];
    if (fileUploadRef.value) {
      fileUploadRef.value.clearFiles();
    }
  }
});

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  
  const success = await updateTask(taskId.value, values, files.value);
  
  if (success) {
    close();
  }
  
  isSubmitting.value = false;
});

const close = () => {
  uiStore.closeTaskEditModal();
  resetForm();
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
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <!-- Overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="close"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <!-- Modal Panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Modifier la tâche : {{ task?.nom }}
              </h3>
              <button @click="close" class="text-gray-400 hover:text-gray-500">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>

            <form @submit.prevent="onSubmit" class="space-y-4">
              <!-- Statut -->
              <div>
                <label for="edit-statut" class="block text-sm font-medium text-gray-700">Statut</label>
                <select 
                  id="edit-statut" 
                  v-model="statut" 
                  v-bind="statutAttrs"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="en_cours">En cours ⚙️</option>
                  <option value="en_attente">En attente ❓</option>
                  <option value="termine">Terminé ✅</option>
                  <option value="annule">Annulé ❌</option>
                </select>
                <p v-if="errors.statut" class="mt-1 text-sm text-red-600">{{ errors.statut }}</p>
                
                <!-- Légende statuts (comme dans legacy) -->
                <div class="mt-2 text-xs text-gray-500 space-y-1 bg-gray-50 p-2 rounded">
                  <p><i class="bi bi-gear-fill text-blue-500"></i> En cours : Tâche active</p>
                  <p><i class="bi bi-question-lg text-yellow-500"></i> En attente : Bloquée ou en pause</p>
                  <p><i class="bi bi-check-circle text-green-500"></i> Terminé : Tâche accomplie</p>
                  <p><i class="bi bi-x-circle text-red-500"></i> Annulé : Tâche abandonnée</p>
                </div>
              </div>

              <!-- Priorité -->
              <div>
                <label for="edit-priorite" class="block text-sm font-medium text-gray-700">Priorité</label>
                <select 
                  id="edit-priorite" 
                  v-model="priorite" 
                  v-bind="prioriteAttrs"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="haute">Haute</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="basse">Basse</option>
                </select>
                <p v-if="errors.priorite" class="mt-1 text-sm text-red-600">{{ errors.priorite }}</p>
              </div>

              <!-- Échéance -->
              <div>
                <label for="edit-echeance" class="block text-sm font-medium text-gray-700">Échéance</label>
                <input 
                  type="date" 
                  id="edit-echeance" 
                  v-model="echeance" 
                  v-bind="echeanceAttrs"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <p v-if="errors.echeance" class="mt-1 text-sm text-red-600">{{ errors.echeance }}</p>
              </div>

              <!-- Upload Fichiers -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ajouter des fichiers</label>
                <p class="text-xs text-yellow-600 mb-2">Note: Les nouveaux fichiers remplaceront les anciens.</p>
                <FileUpload ref="fileUploadRef" v-model="files" />
              </div>
            </form>
          </div>
          
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="onSubmit"
              :disabled="isSubmitting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              <span v-if="isSubmitting" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Enregistrer
            </button>
            <button 
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="close"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
