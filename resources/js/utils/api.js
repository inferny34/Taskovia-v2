import axios from 'axios';

// Configuration de base Axios
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Intercepteur pour ajouter le token CSRF
api.interceptors.request.use(config => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
        config.headers['X-CSRF-TOKEN'] = token;
    }
    return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);

        // Extraire le message d'erreur
        const message = error.response?.data?.error
            || error.response?.data?.message
            || error.message
            || 'Une erreur est survenue';

        return Promise.reject({ message, status: error.response?.status });
    }
);

// API des tâches
export const taskApi = {
    /**
     * Récupérer toutes les tâches avec filtres optionnels
     * @param {Object} params - Paramètres de recherche et tri
     * @returns {Promise<Array>}
     */
    async fetchAll(params = {}) {
        const response = await axios.get('/taches', { params });
        return response.data;
    },

    /**
     * Créer une nouvelle tâche
     * @param {FormData} formData - Données de la tâche avec fichiers
     * @returns {Promise<Object>}
     */
    async create(formData) {
        const response = await axios.post('/taches', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
            }
        });
        return response.data;
    },

    /**
     * Mettre à jour une tâche
     * @param {Number} id - ID de la tâche
     * @param {FormData} formData - Données mises à jour
     * @returns {Promise<Object>}
     */
    async update(id, formData) {
        formData.append('_method', 'PUT');
        const response = await axios.post(`/taches/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
            }
        });
        return response.data;
    },

    /**
     * Supprimer une tâche
     * @param {Number} id - ID de la tâche
     * @returns {Promise<void>}
     */
    async delete(id) {
        await axios.delete(`/taches/${id}`, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
            }
        });
    }
};

export default api;
