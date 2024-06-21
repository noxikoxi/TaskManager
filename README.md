# Task Manager

Welcome to the Task Manager project! This project is a work in progress, aiming to provide a comprehensive solution for managing tasks, notes, and personal information. Currently, it includes functionalities for creating notebooks and notes, as well as user profiles. Future plans include implementing TODO lists, calendar tabs, insurance and car maintenance reminders, and more.

You may check this app: 
- [https://task-manager-two-pi.vercel.app](https://task-manager-two-pi.vercel.app)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### Current Features
- **User Profiles**: Create and manage your user profile.
- **Notebooks**: Create multiple notebooks to organize your notes.
- **Notes**: Add, view, and manage notes within your notebooks.
- **TODO Lists**: Create and manage your task lists.

### Planned Features
- **Calendar Tabs**: Plan your schedule with integrated calendar views.
- **Insurance and Car Maintenance**: Set reminders for insurance renewals and car maintenance checks.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/task-manager.git
    cd task-manager
    ```

2. Install dependencies:
    ```sh
    npm install
    ```
   
3. Create and configure your Auth0  Regular Web Application and MongoDB


4. Set up the environment variables. Create a `.env.local` file in the root directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
   
    PORT=your_preferred_port
   
    AUTH0_SECRET=your_auth0_secret
    AUTH0_BASE_URL=your_app_base_url (dev http://localhost:{PORT})
    AUTH0_ISSUER_BASE_URL=your_auth0_issuer_base_url
    AUTH0_CLIENT_ID=your_auth0_client_id
    AUTH0_CLIENT_SECRET=your_auth0_client_secret
   
    NEXT_PUBLIC_API_BASE_URL=your_api_base_url (dev: http://localhost:${PORT}/api/db)
    ```

5. Start the application:
    ```sh
    npm start
    ```

## Usage

1. **User Profiles**: Register a new user or log in with your existing credentials.
2. **Notebooks**: Create a new notebook by navigating to the "Notebooks" section and clicking "Create Notebook".
3. **Notes**: Within a notebook, click "Create Note" to create a new note.

## Roadmap

- **Phase 1**: Complete current functionalities (user profiles, notebooks, notes).
- **Phase 2**: Implement TODO lists.
- **Phase 3**: Add calendar tab for scheduling.
- **Phase 4**: Integrate reminders for insurance and car maintenance.

## Contributing

Contributions ale welcome to make this project better! Please follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch:
    ```sh
    git checkout -b feature/YourFeature
    ```
3. Commit your changes:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/YourFeature
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to reach out to:
- **Email**: noxikoxi@gmail.com
- **GitHub**: [noxikoxi](https://github.com/noxikoxi)
