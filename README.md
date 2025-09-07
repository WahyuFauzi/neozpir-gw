## Usage

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Running Playwright Tests in Docker

To run Playwright tests in a consistent environment, you can use the provided Dockerfile.

1.  **Build the Docker Image**:
    Navigate to the root of your project and build the Docker image. This will create an image named `neozpir-solid-dev` based on the `Dockerfile` in the `.devcontainer` directory.

    ```bash
    docker build -t neozpir-solid-dev -f .devcontainer/Dockerfile .
    ```

2.  **Run the Docker Container**:
    Start a container from the image. This command will mount your current project directory into the container, allowing you to work on your files from within the container.

    ```bash
    docker run -it --rm -v "$(pwd)":/workspaces/neozpir-solid neozpir-solid-dev bash
    ```
    *   `-it`: Runs the container in interactive mode with a pseudo-TTY.
    *   `--rm`: Automatically removes the container when it exits.
    *   `-v "$(pwd)":/workspaces/neozpir-solid`: Mounts your current host directory into the container at `/workspaces/neozpir-solid`.
    *   `neozpir-solid-dev`: The name of the Docker image to use.
    *   `bash`: Starts a bash shell inside the container.

3.  **Install Project Dependencies (inside the container)**:
    Once inside the container's bash shell, navigate to your project directory and install the Node.js dependencies.

    ```bash
    cd /workspaces/neozpir-solid
    npm install
    ```

4.  **Run Playwright Tests (inside the container)**:
    After installing dependencies, you can run your Playwright tests.

    ```bash
    npx playwright test
    ```

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)