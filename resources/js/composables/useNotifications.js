import { useUIStore } from '../stores/uiStore';

export function useNotifications() {
    const uiStore = useUIStore();

    /**
     * Afficher une notification de succès
     * @param {String} message 
     */
    const notifySuccess = (message) => {
        uiStore.showNotification(message, 'success');
    };

    /**
     * Afficher une notification d'erreur
     * @param {String} message 
     */
    const notifyError = (message) => {
        uiStore.showNotification(message, 'error');
    };

    /**
     * Afficher une notification d'avertissement
     * @param {String} message 
     */
    const notifyWarning = (message) => {
        uiStore.showNotification(message, 'warning');
    };

    return {
        notifySuccess,
        notifyError,
        notifyWarning
    };
}
