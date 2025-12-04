/**
 * Validation du nom de tâche
 * @param {String} nom - Nom de la tâche
 * @returns {Object} { valid: Boolean, error: String }
 */
export function validateTaskName(nom) {
    if (!nom || nom.trim() === '') {
        return { valid: false, error: 'Le nom de la tâche est obligatoire' };
    }

    if (nom.length > 255) {
        return { valid: false, error: 'Le nom ne peut pas dépasser 255 caractères' };
    }

    return { valid: true, error: null };
}

/**
 * Validation de la date d'échéance
 * @param {String} echeance - Date au format YYYY-MM-DD
 * @returns {Object} { valid: Boolean, error: String }
 */
export function validateDeadline(echeance) {
    if (!echeance) {
        return { valid: true, error: null }; // Échéance optionnelle
    }

    const date = new Date(echeance);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(date.getTime())) {
        return { valid: false, error: 'Format de date invalide' };
    }

    if (date < today) {
        return { valid: false, error: "L'échéance ne peut pas être dans le passé" };
    }

    return { valid: true, error: null };
}

/**
 * Validation des fichiers uploadés
 * @param {FileList|Array} files - Liste des fichiers
 * @param {Number} maxSize - Taille maximale en bytes (défaut: 10MB)
 * @returns {Object} { valid: Boolean, error: String }
 */
export function validateFiles(files, maxSize = 10 * 1024 * 1024) {
    if (!files || files.length === 0) {
        return { valid: true, error: null }; // Fichiers optionnels
    }

    const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain'
    ];

    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'doc', 'docx', 'xls', 'xlsx', 'txt'];

    for (let file of files) {
        // Vérifier la taille
        if (file.size > maxSize) {
            return {
                valid: false,
                error: `Le fichier "${file.name}" dépasse la taille maximale de ${maxSize / (1024 * 1024)}MB`
            };
        }

        // Vérifier le type MIME
        if (!allowedTypes.includes(file.type)) {
            // Vérifier l'extension en fallback
            const ext = file.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(ext)) {
                return {
                    valid: false,
                    error: `Le type de fichier "${file.name}" n'est pas autorisé`
                };
            }
        }
    }

    return { valid: true, error: null };
}

/**
 * Validation de la priorité
 * @param {String} priorite - Priorité de la tâche
 * @returns {Object} { valid: Boolean, error: String }
 */
export function validatePriority(priorite) {
    const validPriorities = ['haute', 'moyenne', 'basse'];

    if (!priorite || !validPriorities.includes(priorite)) {
        return { valid: false, error: 'Priorité invalide' };
    }

    return { valid: true, error: null };
}

/**
 * Validation du statut
 * @param {String} statut - Statut de la tâche
 * @returns {Object} { valid: Boolean, error: String }
 */
export function validateStatus(statut) {
    const validStatuses = ['en_cours', 'en_attente', 'termine', 'annule'];

    if (!statut || !validStatuses.includes(statut)) {
        return { valid: false, error: 'Statut invalide' };
    }

    return { valid: true, error: null };
}

/**
 * Validation complète d'une tâche
 * @param {Object} task - Objet tâche à valider
 * @returns {Object} { valid: Boolean, errors: Object }
 */
export function validateTask(task) {
    const errors = {};

    const nameValidation = validateTaskName(task.nom);
    if (!nameValidation.valid) {
        errors.nom = nameValidation.error;
    }

    const priorityValidation = validatePriority(task.priorite);
    if (!priorityValidation.valid) {
        errors.priorite = priorityValidation.error;
    }

    const deadlineValidation = validateDeadline(task.echeance);
    if (!deadlineValidation.valid) {
        errors.echeance = deadlineValidation.error;
    }

    if (task.statut) {
        const statusValidation = validateStatus(task.statut);
        if (!statusValidation.valid) {
            errors.statut = statusValidation.error;
        }
    }

    if (task.fichiers) {
        const filesValidation = validateFiles(task.fichiers);
        if (!filesValidation.valid) {
            errors.fichiers = filesValidation.error;
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}
