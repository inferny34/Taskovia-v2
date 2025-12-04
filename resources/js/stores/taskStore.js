import { defineStore } from 'pinia';
import { taskApi } from '../utils/api';

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [],
        loading: false,
        error: null,
        filters: {
            search: '',
            priorityOrder: null, // 'asc' | 'desc'
            deadlineOrder: null  // 'asc' | 'desc'
        }
    }),

    getters: {
        /**
         * Récupérer les tâches filtrées et triées
         */
        filteredTasks(state) {
            let filtered = [...state.tasks];

            // Filtrer par recherche
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(task =>
                    task.nom.toLowerCase().includes(searchLower)
                );
            }

            // Trier par priorité
            if (state.filters.priorityOrder) {
                const priorityValues = { 'haute': 3, 'moyenne': 2, 'basse': 1 };
                filtered.sort((a, b) => {
                    const valA = priorityValues[a.priorite] || 0;
                    const valB = priorityValues[b.priorite] || 0;
                    return state.filters.priorityOrder === 'asc' ? valA - valB : valB - valA;
                });
            }

            // Trier par échéance
            if (state.filters.deadlineOrder) {
                filtered.sort((a, b) => {
                    const dateA = new Date(a.echeance);
                    const dateB = new Date(b.echeance);
                    return state.filters.deadlineOrder === 'asc' ? dateA - dateB : dateB - dateA;
                });
            }

            return filtered;
        },

        /**
         * Récupérer une tâche par son ID
         */
        taskById: (state) => (id) => {
            return state.tasks.find(task => task.id === id);
        },

        /**
         * Compter les tâches par statut
         */
        taskCountByStatus(state) {
            return state.tasks.reduce((acc, task) => {
                acc[task.statut] = (acc[task.statut] || 0) + 1;
                return acc;
            }, {});
        }
    },

    actions: {
        /**
         * Charger toutes les tâches
         */
        async fetchTasks() {
            this.loading = true;
            this.error = null;

            try {
                const params = {};

                if (this.filters.search) {
                    params.search = this.filters.search;
                }

                if (this.filters.priorityOrder) {
                    params.tri = 'priorite';
                    params.ordre = this.filters.priorityOrder;
                } else if (this.filters.deadlineOrder) {
                    params.tri = 'echeance';
                    params.ordre = this.filters.deadlineOrder;
                }

                this.tasks = await taskApi.fetchAll(params);
            } catch (error) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Créer une nouvelle tâche
         * @param {FormData} formData - Données de la tâche
         */
        async createTask(formData) {
            this.loading = true;
            this.error = null;

            try {
                const newTask = await taskApi.create(formData);
                this.tasks.push(newTask);
                return newTask;
            } catch (error) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Mettre à jour une tâche
         * @param {Number} id - ID de la tâche
         * @param {FormData} formData - Données mises à jour
         */
        async updateTask(id, formData) {
            this.loading = true;
            this.error = null;

            try {
                const updatedTask = await taskApi.update(id, formData);
                const index = this.tasks.findIndex(t => t.id === id);
                if (index !== -1) {
                    this.tasks[index] = updatedTask;
                }
                return updatedTask;
            } catch (error) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Supprimer une tâche
         * @param {Number} id - ID de la tâche
         */
        async deleteTask(id) {
            this.loading = true;
            this.error = null;

            try {
                await taskApi.delete(id);
                this.tasks = this.tasks.filter(t => t.id !== id);
            } catch (error) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Définir les filtres
         * @param {Object} filters - Nouveaux filtres
         */
        setFilters(filters) {
            this.filters = { ...this.filters, ...filters };
        },

        /**
         * Réinitialiser les filtres
         */
        resetFilters() {
            this.filters = {
                search: '',
                priorityOrder: null,
                deadlineOrder: null
            };
        }
    }
});
