import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour la migration Vue.js
 * 
 * Ces tests vérifient:
 * - Le rendu de la nouvelle interface Vue.js
 * - Le cycle de vie complet d'une tâche (CRUD)
 * - Les filtres et la recherche
 * - La validation des formulaires
 */

test.describe('Vue.js Migration - Functional Validation', () => {

    // Setup: Login avant chaque test
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8000/login');
        await page.fill('[name="email"]', 'test@example.com');
        await page.fill('[name="password"]', 'password');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/dashboard');
    });

    test.describe('Task Creation', () => {
        test('should open creation form and create a task', async ({ page }) => {
            // Ouvrir le formulaire
            await page.click('button:has-text("Nouvelle tâche")');

            // Remplir le formulaire
            await page.fill('#nom', 'Vue JS Task Test');
            await page.selectOption('#priorite', 'haute');
            await page.fill('#echeance', '2025-12-31');

            // Soumettre
            await page.click('button:has-text("Créer la tâche")');

            // Vérifier la notification
            await expect(page.locator('.bg-green-500')).toContainText('Tâche créée avec succès');

            // Vérifier que la tâche apparaît dans la liste
            await expect(page.locator('table tbody tr').first()).toContainText('Vue JS Task Test');
        });

        test('should validate required fields', async ({ page }) => {
            await page.click('button:has-text("Nouvelle tâche")');

            // Soumettre vide
            await page.click('button:has-text("Créer la tâche")');

            // Vérifier les messages d'erreur
            await expect(page.locator('text=Le nom est obligatoire')).toBeVisible();
        });
    });

    test.describe('Task Modification', () => {
        test('should update task status and priority', async ({ page }) => {
            // Créer une tâche pour le test
            await page.click('button:has-text("Nouvelle tâche")');
            await page.fill('#nom', 'Task to Update');
            await page.selectOption('#priorite', 'basse');
            await page.click('button:has-text("Créer la tâche")');
            await page.waitForTimeout(500);

            // Cliquer sur modifier (premier bouton crayon)
            await page.click('button[title="Modifier"] >> nth=0');

            // Attendre le modal
            await expect(page.locator('#modal-title')).toContainText('Modifier la tâche');

            // Modifier
            await page.selectOption('#edit-statut', 'termine');
            await page.selectOption('#edit-priorite', 'haute');

            // Sauvegarder
            await page.click('button:has-text("Enregistrer")');

            // Vérifier la notification
            await expect(page.locator('.bg-green-500')).toContainText('Tâche mise à jour avec succès');

            // Vérifier le changement dans la liste
            const firstRow = page.locator('table tbody tr').first();
            await expect(firstRow.locator('.bi-check-circle')).toBeVisible(); // Statut terminé
        });
    });

    test.describe('Task Deletion', () => {
        test('should delete a task after confirmation', async ({ page }) => {
            // Créer une tâche pour le test
            await page.click('button:has-text("Nouvelle tâche")');
            await page.fill('#nom', 'Task to Delete');
            await page.click('button:has-text("Créer la tâche")');
            await page.waitForTimeout(500);

            const initialCount = await page.locator('table tbody tr').count();

            // Cliquer sur supprimer
            await page.click('button[title="Supprimer"] >> nth=0');

            // Vérifier le modal de confirmation
            await expect(page.locator('text=Supprimer la tâche')).toBeVisible();

            // Confirmer
            await page.click('button:has-text("Supprimer")');

            // Vérifier la notification
            await expect(page.locator('.bg-green-500')).toContainText('Tâche supprimée avec succès');

            // Vérifier le compte
            await page.waitForTimeout(500);
            const finalCount = await page.locator('table tbody tr').count();
            expect(finalCount).toBe(initialCount - 1);
        });
    });

    test.describe('Search and Filters', () => {
        test('should filter tasks by name', async ({ page }) => {
            // Créer des tâches distinctes
            const uniqueName = `UniqueTask_${Date.now()}`;
            await page.click('button:has-text("Nouvelle tâche")');
            await page.fill('#nom', uniqueName);
            await page.click('button:has-text("Créer la tâche")');
            await page.waitForTimeout(500);

            // Rechercher
            await page.fill('#search', uniqueName);
            await page.waitForTimeout(500); // Debounce

            // Vérifier
            const rows = page.locator('table tbody tr');
            await expect(rows).toHaveCount(1);
            await expect(rows.first()).toContainText(uniqueName);
        });
    });
});
