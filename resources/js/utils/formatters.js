/**
 * Échapper les caractères HTML pour prévenir les attaques XSS
 * @param {String} unsafe - Texte non sécurisé
 * @returns {String} Texte échappé
 */
export function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) {
        return '';
    }
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Formater une date au format français
 * @param {String} dateString - Date au format YYYY-MM-DD
 * @returns {String} Date au format DD/MM/YYYY
 */
export function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

/**
 * Formater la taille d'un fichier en unités lisibles
 * @param {Number} bytes - Taille en bytes
 * @returns {String} Taille formatée (ex: "2.5 MB")
 */
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Traduire le statut en français
 * @param {String} statut - Statut de la tâche
 * @returns {String} Statut traduit
 */
export function translateStatus(statut) {
    const translations = {
        'en_cours': 'En cours',
        'en_attente': 'En attente',
        'termine': 'Terminé',
        'annule': 'Annulé'
    };

    return translations[statut] || statut;
}

/**
 * Traduire la priorité en français
 * @param {String} priorite - Priorité de la tâche
 * @returns {String} Priorité traduite
 */
export function translatePriority(priorite) {
    const translations = {
        'haute': 'Haute',
        'moyenne': 'Moyenne',
        'basse': 'Basse'
    };

    return translations[priorite] || priorite;
}

/**
 * Obtenir la classe CSS de l'icône de statut (Bootstrap Icons)
 * @param {String} statut - Statut de la tâche
 * @returns {String} Classe CSS
 */
export function getStatusIconClass(statut) {
    const classes = {
        'en_attente': 'bi bi-question-lg text-warning',
        'en_cours': 'bi bi-gear-fill text-primary',
        'termine': 'bi bi-check-circle text-success',
        'annule': 'bi bi-x-circle text-danger'
    };

    return classes[statut] || 'bi bi-question-circle';
}

/**
 * Obtenir le chemin de l'image de priorité
 * @param {String} priorite - Priorité de la tâche
 * @returns {String} Chemin de l'image
 */
export function getPriorityImagePath(priorite) {
    const basePath = '/images';
    const images = {
        'haute': `${basePath}/haute.png`,
        'moyenne': `${basePath}/moyenne.png`,
        'basse': `${basePath}/basse.png`
    };

    return images[priorite] || '';
}

/**
 * Calculer le nombre de jours restants jusqu'à l'échéance
 * @param {String} echeance - Date d'échéance au format YYYY-MM-DD
 * @returns {Number} Nombre de jours restants (négatif si dépassé)
 */
export function getDaysRemaining(echeance) {
    if (!echeance) return null;

    const deadline = new Date(echeance);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

/**
 * Formater le temps restant en texte lisible
 * @param {String} echeance - Date d'échéance au format YYYY-MM-DD
 * @returns {String} Texte formaté (ex: "Dans 3 jours", "Aujourd'hui", "En retard de 2 jours")
 */
export function formatTimeRemaining(echeance) {
    const days = getDaysRemaining(echeance);

    if (days === null) return '';
    if (days < 0) return `En retard de ${Math.abs(days)} jour${Math.abs(days) > 1 ? 's' : ''}`;
    if (days === 0) return 'Aujourd\'hui';
    if (days === 1) return 'Demain';
    return `Dans ${days} jours`;
}
