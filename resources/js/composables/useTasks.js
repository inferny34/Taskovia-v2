import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/taskStore';
import { useNotifications } from './useNotifications';
import { validateTask } from '../utils/validators';

export function useTasks() {
    const taskStore = useTaskStore();
    const { tasks, loading, error, filters } = storeToRefs(taskStore);
    const { notifySuccess, notifyError } = useNotifications();

    /**
     * Charger les tâches
     */
    const loadTasks = async () => {
        try {
            await taskStore.fetchTasks();
        } catch (err) {
            notifyError('Erreur lors du chargement des tâches');
            console.error(err);
        }
    };

    /**
     * Créer une nouvelle tâche
     * @param {Object} taskData - Données de la tâche
     * @param {Array} files - Fichiers à uploader
     * @returns {Promise<Boolean>} Succès de l'opération
     */
    const createTask = async (taskData, files = []) => {
        // Validation
        const validation = validateTask({ ...taskData, fichiers: files });
        if (!validation.valid) {
            // On pourrait retourner les erreurs ici pour l'affichage dans le formulaire
            // Mais vee-validate gérera généralement cela côté composant
            console.warn('Validation failed', validation.errors);
            return false;
        }

        const formData = new FormData();
        formData.append('nom', taskData.nom);
        formData.append('priorite', taskData.priorite);
        formData.append('statut', 'en_cours'); // Défaut
        if (taskData.echeance) {
            formData.append('echeance', taskData.echeance);
        }

        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                formData.append('fichiers[]', file);
            });
        }

        try {
            await taskStore.createTask(formData);
            notifySuccess('Tâche créée avec succès');
            return true;
        } catch (err) {
            const msg = err.message || 'Erreur lors de la création de la tâche';
            notifyError(msg);
            return false;
        }
    };

    /**
     * Mettre à jour une tâche
     * @param {Number} id - ID de la tâche
     * @param {Object} taskData - Données à mettre à jour
     * @param {Array} files - Nouveaux fichiers (optionnel)
     * @returns {Promise<Boolean>} Succès de l'opération
     */
    const updateTask = async (id, taskData, files = []) => {
        const formData = new FormData();

        if (taskData.nom) formData.append('nom', taskData.nom);
        if (taskData.priorite) formData.append('priorite', taskData.priorite);
        if (taskData.statut) formData.append('statut', taskData.statut);
        if (taskData.echeance) formData.append('echeance', taskData.echeance);

        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                formData.append('fichiers[]', file);
            });
        }

        try {
            await taskStore.updateTask(id, formData);
            notifySuccess('Tâche mise à jour avec succès');
            return true;
        } catch (err) {
            const msg = err.message || 'Erreur lors de la mise à jour';
            notifyError(msg);
            return false;
        }
    };

    /**
     * Supprimer une tâche
     * @param {Number} id - ID de la tâche
     */
    const deleteTask = async (id) => {
        try {
            await taskStore.deleteTask(id);
            notifySuccess('Tâche supprimée avec succès');
            return true;
        } catch (err) {
            notifyError('Erreur lors de la suppression');
            return false;
        }
    };

    return {
        tasks,
        loading,
        error,
        filters,
        filteredTasks: taskStore.filteredTasks, // Accès direct au getter
        loadTasks,
        createTask,
        updateTask,
        deleteTask,
        setFilters: taskStore.setFilters,
        resetFilters: taskStore.resetFilters
    };
}
