# YouTrack App - Test Practice Assignment

This application was developed as part of the Test Practice Assignment. The app includes a **MAIN_MENU_ITEM** extension point and consists of a single page that displays:

- A list of available projects in YouTrack.
- A toggle to enable/disable a boolean flag, simulating the administration panel of our future test management system.

The flag is persisted and managed on the YouTrack Server backend through entity extensions.

---

## Technologies Used

- **TypeScript**
- **React**
- **Ring UI**

---

## Requirements

- **YouTrack Server** (a running instance)
- **Node.js** and **npm**

---

## Installation and Deployment Options

You can install the app in YouTrack using one of the two options below:

### 1) Download from the Release Page (Recommended)

1. Go to the [Release](https://github.com/lastxxix/your-repo/youtrack-project-flag) page.
2. Download the latest release in `.zip` format.
3. Access your YouTrack instance.
4. Navigate to **Administration -> Apps**.
5. Click on **Add App** in the top-right corner.
6. Upload the downloaded `.zip` file.

### 2) Clone the Repository, Build, and Upload

1. Clone the repository:

    ```bash
    git clone https://github.com/lastxxix/youtrack-project-flag.git
    cd youtrack-project-flag
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Build and upload the app by running:

    ```bash
    npm run build && npm run upload -- --host <your-youtrack-base-url> --token <your-permanent-token>
    ```

    Replace `<your-youtrack-base-url>` with the base URL of your YouTrack server, and `<your-permanent-token>` with your permanent token. You can create a permanent token from the Account Security page in your profile settings by clicking **Add Credentials**.
