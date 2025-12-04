<script setup>
import { reactive, ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useTasks } from '../composables/useTasks';
import { useUIStore } from '../stores/uiStore';
import FileUpload from './FileUpload.vue';

const { createTask } = useTasks();
const uiStore = useUIStore();
const fileUploadRef = ref(null);

// Schéma de validation
const schema = yup.object({
  nom: yup.string().required('Le nom est obligatoire').max(255, 'Max 255 caractères'),
  priorite: yup.string().required('La priorité est obligatoire').oneOf(['haute', 'moyenne', 'basse']),
  echeance: yup.date().nullable().min(new Date(), "L'échéance ne peut pas être dans le passé")
});

const { values, errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    nom: '',
    priorite: 'moyenne',
    echeance: ''
  }
});

const [nom, nomAttrs] = defineField('nom');
const [priorite, prioriteAttrs] = defineField('priorite');
const [echeance, echeanceAttrs] = defineField('echeance');

const files = ref([]);
const isSubmitting = ref(false);

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  
  const success = await createTask(values, files.value);
  
  if (success) {
    resetForm();
    files.value = [];
    if (fileUploadRef.value) {
      fileUploadRef.value.clearFiles();
    }
    uiStore.hideNewTaskForm();
  }
  
  isSubmitting.value = false;
});

const cancel = () => {
  resetForm();
  uiStore.hideNewTaskForm();
};
</script>

<template>
  <div v-if="uiStore.formVisibility.newTask" class="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6 animate-fade-in-down">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900">Nouvelle Tâche</h3>
      <button @click="cancel" class="text-gray-400 hover:text-gray-500">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- Nom -->
      <div>
        <label for="nom" class="block text-sm font-medium text-gray-700">Nom de la tâche</label>
        <input 
          type="text" 
          id="nom" 
          v-model="nom" 
          v-bind="nomAttrs"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.nom }"
          placeholder="Ex: Réviser le rapport mensuel"
        />
        <p v-if="errors.nom" class="mt-1 text-sm text-red-600">{{ errors.nom }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Priorité -->
        <div>
          <label for="priorite" class="block text-sm font-medium text-gray-700">Priorité</label>
          <select 
            id="priorite" 
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
          <label for="echeance" class="block text-sm font-medium text-gray-700">Échéance</label>
          <input 
            type="date" 
            id="echeance" 
            v-model="echeance" 
            v-bind="echeanceAttrs"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.echeance }"
          />
          <p v-if="errors.echeance" class="mt-1 text-sm text-red-600">{{ errors.echeance }}</p>
        </div>
      </div>

      <!-- Upload Fichiers -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Fichiers joints</label>
        <FileUpload ref="fileUploadRef" v-model="files" />
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-3 pt-4 border-t">
        <button 
          type="button" 
          @click="cancel"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
          {{ isSubmitting ? 'Création...' : 'Créer la tâche' }}
        </button>
      </div>
    </form>
  </div>
</template>
