# 🧭 Taskovia

**Taskovia** est une application web complète de **gestion de tâches** développée avec **Laravel** et **Blade**.  
Elle permet aux utilisateurs d’organiser, suivre et gérer leurs tâches du quotidien grâce à une interface fluide et intuitive.

---

## 🚀 Fonctionnalités principales

- ✅ Création, modification et suppression de tâches  
- 🕒 Gestion du statut des tâches (à faire, en cours, terminée)  
- 🔍 Tri et filtrage dynamique des listes  
- 🧩 Interface responsive intégrée avec **Bootstrap**  
- 💾 Persistance des données via **base de données MySQL**  
- 🔐 Système d’authentification (connexion / inscription)  
- 🧠 Architecture MVC propre avec contrôleurs et vues Blade  

---

## 🧰 Stack technique

| Type | Outils / Technologies |
|------|------------------------|
| **Backend** | Laravel 11 (PHP 8.x) |
| **Frontend** | Blade, Bootstrap, jQuery |
| **Base de données** | MySQL |
| **Serveur local** | XAMPP (Apache + PHP + MySQL) |
| **Versioning** | Git & GitHub |

---

## ⚙️ Installation locale


### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/inferny34/Taskovia.git
cd Taskovia
```

### 2️⃣ Installer les dépendances PHP
```bash
composer install 
```
### 3️⃣ Créer ton fichier d'environnement
```bash
cp .env.example .env

Puis configure ta base de données MySQL :
DB_DATABASE=taskovia
DB_USERNAME=root
DB_PASSWORD=
```

### 4️⃣ Générer la clé d’application
```bash
php artisan key:generate
```

### 5️⃣ Lancer les migrations
```bash
php artisan migrate
```

### 6️⃣ Démarrer le serveur local
```bash
php artisan serve
➡️ Ouvre ensuite http://localhost:8000
```

### 🧑‍💻 Auteur

- **Nicolas Roques (inferny34)**
- 📧 inferny34@gmail.com
- 📧 nicolas.roques34@hotmail.com
- 💼 Développeur web & web mobile passionné par le développement full stack et la cybersécurité.