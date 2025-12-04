<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import TaskList from '@/Components/TaskList.vue';
import TaskFilters from '@/Components/TaskFilters.vue';
import TaskForm from '@/Components/TaskForm.vue';
import TaskModal from '@/Components/TaskModal.vue';
import Notification from '@/Components/Notification.vue';
import ConfirmDialog from '@/Components/ConfirmDialog.vue';
import FilePreview from '@/Components/FilePreview.vue';
import { useUIStore } from '@/stores/uiStore';

const uiStore = useUIStore();
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Mon Tableau de Bord
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                
                <!-- Composants UI Globaux -->
                <Notification />
                <ConfirmDialog />
                <FilePreview />
                <TaskModal />

                <!-- Contenu Principal -->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        
                        <!-- En-tête et Filtres -->
                        <div class="mb-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Mes Tâches</h3>
                            <TaskFilters />
                        </div>

                        <!-- Formulaire de création (visible via uiStore) -->
                        <TaskForm />

                        <!-- Liste des tâches -->
                        <TaskList />
                        
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
