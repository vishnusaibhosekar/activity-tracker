# Activity Tracker App

This is a cross-platform activity tracking app with a built-in Pomodoro timer. Use it on both desktop and mobile to stay productive!

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/https://github.com/vishnusaibhosekar/activity-tracker/activity-tracker.git
cd activity-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm start
```

Visit `http://localhost:3000` to view the app.

---

## Contributing

### 1. Create a New Branch

```bash
git checkout -b feature-your-feature-name
```

### 2. Make Changes and Commit

```bash
git add .
git commit -m "Add: Description of your feature"
```

### 3. Push Your Branch

```bash
git push origin feature-your-feature-name
```

### 4. Open a Pull Request (PR)

- Go to the **GitHub repository** page.
- Open a **Pull Request** from your branch to `main`.
- Wait for approval and merge!

---

## Branching Guidelines

- **main**: Production-ready code.
- **feature-xxx**: Feature development.
- **fix-xxx**: Bug fixes.

---

## Collaborator Workflow

1. **Pull Latest Changes**:

   ```bash
   git pull origin main
   ```

2. **Sync Branch with Main**:

   ```bash
   git checkout your-branch-name
   git merge main
   ```

3. Resolve any conflicts and push changes.

---

## Future Features (Ideas to Explore)

- Daily/weekly activity reports.
- Dark mode.
- Sync with Google Calendar.

## How to Collaborate

1. **Accept the Invitation:**

   - Open the invite link sent to your GitHub account and accept it.

2. **Clone the Repository:**

   ```bash
   git clone https://github.com/https://github.com/vishnusaibhosekar/activity-tracker/activity-tracker.git
   cd activity-tracker
   ```

3. **Create Your Feature Branch:**

   ```bash
   git checkout -b feature-new-activity-page
   ```

4. **Make Changes and Commit:**

   ```bash
   git add .
   git commit -m "Add: New Activity Page"
   ```

5. **Push Your Changes:**

   ```bash
   git push origin feature-new-activity-page
   ```

6. **Open a Pull Request:**
   - Go to the repository on GitHub.
   - Open a **Pull Request** from your feature branch to the `main` branch.
   - Collaborate on reviews and merge the changes.

## Branch Naming Conventions

- **feature-xxx**: For new features (e.g., `feature-pomodoro-timer`).
- **fix-xxx**: For bug fixes (e.g., `fix-bug-in-timer`).
- **hotfix-xxx**: For urgent changes (e.g., `hotfix-timer-crash`).

---

## Workflow for Contributing

**Create a Branch:**
`bash
git checkout -b feature-branch-name
`

Commit and Push Changes:

```bash
    git add .
    git commit -m "Add: Description of the feature"
    git push origin feature-branch-name
```

## Open a Pull Request:

Go to the repository on GitHub.
Open a Pull Request from your feature branch to main.
Collaborate on code review and merge the changes.

Keep Branches in Sync:
Before working on your branch, pull the latest changes from main:

```bash
    git checkout main
    git pull origin main
    git checkout your-branch-name
    git merge main
```

## Pull Request and Merge Workflow

1. **Create a Feature Branch:**

```bash
git checkout -b feature-your-feature-name
```

2. **Push the Branch to GitHub:**

```bash
git push origin feature-your-feature-name
```

3. **Open a Pull Request (PR):**
   Go to the Pull Requests tab in the repository.
   Click New Pull Request and choose your feature branch.

4. **Collaborate on the PR:**
   Assign reviewers or leave comments as needed.
   Reviewers approve or request changes.

5. **Merge the PR:**
   Click Merge Pull Request and Confirm Merge.
   Delete the branch (optional).

6. **Pull the Latest Changes Locally:**

```bash
git checkout main
git pull origin main
```

## Deployment

The app is deployed using **Vercel**. Visit the following link to access the app:

[Live App](https://activity-tracker.vercel.app) (Replace with your deployment URL)

### How to Deploy Updates

1. Make sure your latest changes are committed and pushed to GitHub:

   ```bash
   git add .
   git commit -m "Update: Description of changes"
   git push origin main

   ```

2. Vercel will automatically detect changes and deploy the latest version.
