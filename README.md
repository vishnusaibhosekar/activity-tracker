# **Activity Tracker App**

This is a cross-platform activity tracking app with a built-in Pomodoro timer. Use it on both desktop and mobile to stay productive!

## **Features**

- Track daily activities with start and end times.
- Pomodoro timer integration for focused work sessions.
- Dark mode and light mode switching.
- Cross-platform support: Desktop and Mobile.
- Real-time updates with Supabase.

## **Technologies Used**

- React.js – Frontend Framework.
- Supabase – Backend (Database & Realtime).
- Vercel – Deployment.
- CSS Modules – Modular and maintainable styles.

## **Project Setup**

### 1. Clone the Repository

```bash
git clone https://github.com/vishnusaibhosekar/activity-tracker.git
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

Visit http://localhost:3000 to view the app.

## **Deployment**

The app is deployed using Vercel. Access the live version here:

[Live App](Replace with your actual deployment URL)

## **How to Deploy Updates**

Make sure your latest changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Update: Description of changes"
git push origin main
```

Vercel will automatically detect changes and deploy the latest version.

## **Contributing Guidelines**

We welcome contributions from the community!

### Branching Strategy

- `main`: Production-ready code.
- `feature-xxx`: For new feature development (e.g., `feature-pomodoro-timer`).
- `fix-xxx`: For bug fixes (e.g., `fix-bug-in-timer`).
- `hotfix-xxx`: For urgent fixes (e.g., `hotfix-timer-crash`).

### Collaborator Workflow

#### Pull Latest Changes

```bash
git pull origin main
```

#### Create a New Branch

```bash
git checkout -b feature-your-feature-name
```

#### Make Changes and Commit

```bash
git add .
git commit -m "Add: Description of your feature"
```

#### Push Your Branch

```bash
git push origin feature-your-feature-name
```

#### Open a Pull Request

Go to the GitHub repository page. Open a Pull Request from your branch to `main`. Collaborate on code review and merge the changes.

#### Merge and Sync with Main

```bash
git checkout main
git pull origin main
```

## **Testing the App**

### Running Tests

```bash
npm test
```

Ensure that all tests pass before pushing code changes.

### Manual Testing Checklist

- Add a new activity and ensure it displays correctly.
- Start and finish activities to test Pomodoro timer functionality.
- Switch between dark mode and light mode.
- Test responsiveness on both desktop and mobile.

## **Known Issues and Future Improvements**

### Known Issues

- Sometimes the Pomodoro timer may not reset automatically.
- Dark mode toggle might need more contrast adjustments.

### Future Features (Ideas to Explore)

- Daily/Weekly/Monthly activity reports.
- Integration with Google Calendar.
- Notifications for upcoming tasks or Pomodoro breaks.

## **How to Collaborate**

### Accept the Invitation

Open the invite link sent to your GitHub account and accept it.

### Clone the Repository

```bash
git clone https://github.com/vishnusaibhosekar/activity-tracker.git
cd activity-tracker
```

### Create Your Feature Branch

```bash
git checkout -b feature-your-feature-name
```

### Make Changes and Commit

```bash
git add .
git commit -m "Add: New Feature"
```

### Push Changes and Open PR

Push your branch and open a Pull Request (PR) from your branch to `main`.

## **Code Structure**

```less
src/
│
├── components/
│   ├── Header.js        // Header Component
│   ├── ActivityTable.js // Table to display activities
│
├── services/
│   └── supabaseClient.js // Supabase setup and config
│
├── styles/              // CSS styles folder
│   ├── global.css       // Global styles
│   ├── buttons.css      // Button styles
│   ├── input.css        // Input field styles
│   ├── table.css        // Table styling
│   ├── light-theme.css  // Light theme styles
│   └── dark-theme.css   // Dark theme styles
│
├── App.js               // Main app component
└── index.js             // Entry point for React
```

## **Troubleshooting**

### Problem: Pomodoro timer not starting.

Solution: Check the console for errors. Ensure Supabase is correctly configured.

### Problem: Dark mode styles not applying.

Solution: Make sure the dark-theme.css file is correctly imported.

### Problem: Real-time updates not working.

Solution: Ensure the Supabase channel is correctly subscribed.
