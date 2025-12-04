import { ref } from 'vue';
import { validateFiles } from '../utils/validators';
import { useNotifications } from './useNotifications';

export function useFileUpload() {
    const files = ref([]);
    const filePreviews = ref([]);
    const errors = ref([]);
    const { notifyError } = useNotifications();

    /**
     * Ajouter des fichiers à la sélection
     * @param {FileList|Array} newFiles - Fichiers à ajouter
     */
    const addFiles = (newFiles) => {
        const fileArray = Array.from(newFiles);

        // Validation
        const validation = validateFiles(fileArray);
        if (!validation.valid) {
            notifyError(validation.error);
            errors.value.push(validation.error);
            return;
        }

        // Ajout des fichiers valides
        files.value = [...files.value, ...fileArray];

        // Génération des prévisualisations
        fileArray.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    filePreviews.value.push({
                        name: file.name,
                        url: e.target.result,
                        type: 'image',
                        file: file
                    });
                };
                reader.readAsDataURL(file);
            } else {
                filePreviews.value.push({
                    name: file.name,
                    url: null,
                    type: 'other',
                    file: file
                });
            }
        });
    };

    /**
     * Supprimer un fichier de la sélection
     * @param {Number} index - Index du fichier à supprimer
     */
    const removeFile = (index) => {
        files.value.splice(index, 1);
        filePreviews.value.splice(index, 1);
    };

    /**
     * Réinitialiser la sélection
     */
    const clearFiles = () => {
        files.value = [];
        filePreviews.value = [];
        errors.value = [];
    };

    return {
        files,
        filePreviews,
        errors,
        addFiles,
        removeFile,
        clearFiles
    };
}
