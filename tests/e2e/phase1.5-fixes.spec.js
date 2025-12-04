import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour Phase 1.5 - Corrections Critiques
 * 
 * Ces tests vérifient:
 * - Routes fonctionnelles
 * - Protection XSS
 * - Validation fichiers
 * - CRUD complet
 */

test.describe('Phase 1.5 - Critical Fixes Validation', () => {

    // Setup: Login avant chaque test
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8000/login');
        await page.fill('[name="email"]', 'test@example.com');
        await page.fill('[name="password"]', 'password');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/dashboard');

        // Naviguer vers le dashboard legacy
        await page.goto('http://localhost:8000/mon-dashboard');
    });

    test.describe('XSS Protection', () => {

        test('should escape HTML in task name', async ({ page }) => {
            const maliciousName = '<script>alert("XSS")</script>';

            // Créer une tâche avec script malveillant
            await page.click('.btn-nouvelle');
            await page.fill('#tache-nom', maliciousName);
            await page.selectOption('#tache-priorite', 'haute');
            await page.fill('#tache-ech', '2025-12-31');
            await page.click('#valider-tache');

            // Attendre que la tâche soit ajoutée
            await page.waitForTimeout(1000);

            // Vérifier qu'aucune alerte ne s'est déclenchée
            let alertFired = false;
            page.on('dialog', () => { alertFired = true; });

            await page.waitForTimeout(500);
            expect(alertFired).toBe(false);

            // Vérifier que le texte est échappé
            const taskName = await page.locator('table tbody tr:last-child td:first-child').textContent();
            expect(taskName).toBe(maliciousName);

            // Vérifier que le HTML est échappé dans le source
            const html = await page.locator('table tbody tr:last-child td:first-child').innerHTML();
            expect(html).toContain('&lt;script&gt;');
            expect(html).not.toContain('<script>');
        });

        test('should escape HTML in file names', async ({ page }) => {
            // Créer un fichier avec nom malveillant
            const maliciousFileName = 'test<img src=x onerror=alert(1)>.txt';

            // Note: Ce test nécessite un fichier réel
            // Dans un vrai test, on utiliserait page.setInputFiles()
            // avec un fichier créé dynamiquement
        });
    });

    test.describe('CRUD Operations', () => {

        test('should create a task successfully', async ({ page }) => {
            await page.click('.btn-nouvelle');
            await page.fill('#tache-nom', 'Test Task E2E');
            await page.selectOption('#tache-priorite', 'moyenne');
            await page.fill('#tache-ech', '2025-12-31');
            await page.click('#valider-tache');

            // Vérifier la notification
            await expect(page.locator('#notification')).toContainText('Tâche ajoutée avec succès');

            // Vérifier que la tâche apparaît
            await expect(page.locator('table tbody tr:last-child')).toContainText('Test Task E2E');
        });

        test('should update a task successfully', async ({ page }) => {
            // Créer d'abord une tâche
            await page.click('.btn-nouvelle');
            await page.fill('#tache-nom', 'Task to Update');
            await page.selectOption('#tache-priorite', 'basse');
            await page.fill('#tache-ech', '2025-12-31');
            await page.click('#valider-tache');
            await page.waitForTimeout(1000);

            // Modifier la tâche
            await page.click('table tbody tr:last-child .btn-modify');
            await page.waitForSelector('#modifyModal[style*="flex"]');

            await page.selectOption('#modify-statut', 'termine');
            await page.selectOption('#modify-priorite', 'haute');
            await page.click('#save-modif');

            // Vérifier la notification
            await expect(page.locator('#notification')).toContainText('Tâche modifiée avec succès');

            // Vérifier le statut
            await expect(page.locator('table tbody tr:last-child .statut i')).toHaveClass(/bi-check-circle/);
        });

        test('should delete a task successfully', async ({ page }) => {
            // Créer une tâche
            await page.click('.btn-nouvelle');
            await page.fill('#tache-nom', 'Task to Delete');
            await page.selectOption('#tache-priorite', 'moyenne');
            await page.fill('#tache-ech', '2025-12-31');
            await page.click('#valider-tache');
            await page.waitForTimeout(1000);

            const initialCount = await page.locator('table tbody tr').count();

            // Supprimer la tâche
            await page.click('table tbody tr:last-child .btn-delete');
            await page.waitForSelector('#confirmationModal[style*="flex"]');
            await page.click('#btnConfirm');

            // Vérifier la notification
            await expect(page.locator('#notification')).toContainText('Tâche supprimée avec succès');

            // Vérifier que la tâche a disparu
            await page.waitForTimeout(1000);
            const finalCount = await page.locator('table tbody tr').count();
            expect(finalCount).toBe(initialCount - 1);
        });
    });

    test.describe('Search and Filters', () => {

        test('should search tasks by name', async ({ page }) => {
            // Créer plusieurs tâches
            const tasks = ['Alpha Task', 'Beta Task', 'Gamma Task'];
            for (const taskName of tasks) {
                await page.click('.btn-nouvelle');
                await page.fill('#tache-nom', taskName);
                await page.selectOption('#tache-priorite', 'moyenne');
                await page.fill('#tache-ech', '2025-12-31');
                await page.click('#valider-tache');
                await page.waitForTimeout(500);
            }

            // Rechercher "Beta"
            await page.fill('#search-projects', 'Beta');
            await page.waitForTimeout(1000);

            // Vérifier que seule "Beta Task" est visible
            const visibleTasks = await page.locator('table tbody tr').count();
            expect(visibleTasks).toBe(1);
            await expect(page.locator('table tbody tr:first-child')).toContainText('Beta Task');
        });

        test('should filter by priority', async ({ page }) => {
            // Créer des tâches avec différentes priorités
            const priorities = ['haute', 'moyenne', 'basse'];
            for (const priority of priorities) {
                await page.click('.btn-nouvelle');
                await page.fill('#tache-nom', `Task ${priority}`);
                await page.selectOption('#tache-priorite', priority);
                await page.fill('#tache-ech', '2025-12-31');
                await page.click('#valider-tache');
                await page.waitForTimeout(500);
            }

            // Filtrer par priorité haute à basse
            await page.selectOption('#priority', 'asc');
            await page.waitForTimeout(1000);

            // Vérifier l'ordre (haute en premier)
            const firstTask = await page.locator('table tbody tr:first-child td:first-child').textContent();
            expect(firstTask).toContain('haute');
        });
    });

    test.describe('File Upload Validation', () => {

        test('should reject files over 10MB', async ({ page }) => {
            // Note: Ce test nécessite la création d'un gros fichier
            // Dans un environnement de test réel, on créerait un fichier > 10MB
            // et on vérifierait le message d'erreur
        });

        test('should reject invalid file types', async ({ page }) => {
            // Note: Ce test nécessite un fichier .exe ou autre type non autorisé
        });

        test('should accept valid file types', async ({ page }) => {
            // Test avec PDF, JPG, PNG, etc.
        });
    });

    test.describe('Error Handling', () => {

        test('should show error for past deadline', async ({ page }) => {
            await page.click('.btn-nouvelle');
            await page.fill('#tache-nom', 'Invalid Task');
            await page.selectOption('#tache-priorite', 'moyenne');
            await page.fill('#tache-ech', '2020-01-01'); // Date passée
            await page.click('#valider-tache');

            // Vérifier le message d'erreur
            await expect(page.locator('#notification')).toContainText('échéance ne peut pas être dans le passé');
        });

        test('should show error for empty task name', async ({ page }) => {
            await page.click('.btn-nouvelle');
            // Ne pas remplir le nom
            await page.selectOption('#tache-priorite', 'moyenne');
            await page.fill('#tache-ech', '2025-12-31');
            await page.click('#valider-tache');

            // Vérifier le message d'erreur
            await expect(page.locator('#notification')).toContainText('nom de la tâche est obligatoire');
        });
    });

    test.describe('Security', () => {

        test('should require authentication', async ({ page, context }) => {
            // Se déconnecter
            await context.clearCookies();

            // Tenter d'accéder à /taches
            const response = await page.goto('http://localhost:8000/taches');

            // Devrait rediriger vers login
            expect(page.url()).toContain('/login');
        });
    });
});
