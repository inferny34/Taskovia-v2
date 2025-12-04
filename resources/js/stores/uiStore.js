import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
    state: () => ({
        notification: {
            visible: false,
            message: '',
            type: 'success' // 'success' | 'error' | 'warning'
        },
        modals: {
            taskEdit: {
                visible: false,
                taskId: null
            },
            filePreview: {
                visible: false,
                fileUrl: '',
                fileName: '',
                fileType: ''
            },
            confirmDelete: {
                visible: false,
                taskId: null,
                onConfirm: null
            }
        },
        formVisibility: {
            newTask: false
        }
    }),

    actions: {
        /**
         * Afficher une notification
         * @param {String} message - Message à afficher
         * @param {String} type - Type de notification ('success', 'error', 'warning')
         */
        showNotification(message, type = 'success') {
            this.notification = {
                visible: true,
                message,
                type
            };

            // Auto-dismiss après 3 secondes
            setTimeout(() => {
                this.hideNotification();
            }, 3000);
        },

        /**
         * Masquer la notification
         */
        hideNotification() {
            this.notification.visible = false;
        },

        /**
         * Ouvrir le modal d'édition de tâche
         * @param {Number} taskId - ID de la tâche à éditer
         */
        openTaskEditModal(taskId) {
            this.modals.taskEdit = {
                visible: true,
                taskId
            };
        },

        /**
         * Fermer le modal d'édition de tâche
         */
        closeTaskEditModal() {
            this.modals.taskEdit = {
                visible: false,
                taskId: null
            };
        },

        /**
         * Ouvrir le modal de prévisualisation de fichier
         * @param {String} fileUrl - URL du fichier
         * @param {String} fileName - Nom du fichier
         */
        openFilePreviewModal(fileUrl, fileName) {
            const fileExt = fileName.split('.').pop().toLowerCase();
            this.modals.filePreview = {
                visible: true,
                fileUrl,
                fileName,
                fileType: fileExt
            };
        },

        /**
         * Fermer le modal de prévisualisation de fichier
         */
        closeFilePreviewModal() {
            this.modals.filePreview = {
                visible: false,
                fileUrl: '',
                fileName: '',
                fileType: ''
            };
        },

        /**
         * Ouvrir le modal de confirmation de suppression
         * @param {Number} taskId - ID de la tâche à supprimer
         * @param {Function} onConfirm - Callback à exécuter lors de la confirmation
         */
        openConfirmDeleteModal(taskId, onConfirm) {
            this.modals.confirmDelete = {
                visible: true,
                taskId,
                onConfirm
            };
        },

        /**
         * Fermer le modal de confirmation de suppression
         */
        closeConfirmDeleteModal() {
            this.modals.confirmDelete = {
                visible: false,
                taskId: null,
                onConfirm: null
            };
        },

        /**
         * Basculer la visibilité du formulaire de nouvelle tâche
         */
        toggleNewTaskForm() {
            this.formVisibility.newTask = !this.formVisibility.newTask;
        },

        /**
         * Afficher le formulaire de nouvelle tâche
         */
        showNewTaskForm() {
            this.formVisibility.newTask = true;
        },

        /**
         * Masquer le formulaire de nouvelle tâche
         */
        hideNewTaskForm() {
            this.formVisibility.newTask = false;
        }
    }
});
