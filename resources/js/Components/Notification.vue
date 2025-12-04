<script setup>
import { computed } from 'vue';
import { useUIStore } from '../stores/uiStore';

const uiStore = useUIStore();

const visible = computed(() => uiStore.notification.visible);
const message = computed(() => uiStore.notification.message);
const type = computed(() => uiStore.notification.type);

const bgClass = computed(() => {
  switch (type.value) {
    case 'success': return 'bg-green-500';
    case 'error': return 'bg-red-500';
    case 'warning': return 'bg-yellow-500';
    default: return 'bg-blue-500';
  }
});

const iconClass = computed(() => {
  switch (type.value) {
    case 'success': return 'bi-check-circle-fill';
    case 'error': return 'bi-exclamation-triangle-fill';
    case 'warning': return 'bi-exclamation-circle-fill';
    default: return 'bi-info-circle-fill';
  }
});
</script>

<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="visible" 
      class="fixed top-4 right-4 z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      :class="bgClass"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <i class="bi text-white text-xl" :class="iconClass"></i>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-white">
              {{ message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button 
              @click="uiStore.hideNotification()"
              class="bg-transparent rounded-md inline-flex text-white hover:text-gray-200 focus:outline-none"
            >
              <span class="sr-only">Fermer</span>
              <i class="bi bi-x text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
