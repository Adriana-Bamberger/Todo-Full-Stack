# Deployment Checklist

Follow this guide to get your app deployed. Note that depending your app's tech-stack, you might use the database configuration and environment sections or not.

- [Dokku user setup](#dokku-user-setup)
- [General app setup](#general-app-setup)
- [Database Configuration](#databases)
- [Creating your Dokku app](#creating-and-deploying-your-dokku-app)

---

# Deploying to Dokku

Dokku is an open-source self-hosted PAAS tool which we will use to deploy our projects.

## Dokku user setup

### 1. SSH key

- [ ] Generate an SSH key pair
  <details style="padding-left: 2em">
    <summary>How to generate an SSH key pair</summary>

  There's a good chance you have one of these, you can see a list of your public keys like this:

  ```sh
  ls ~/.ssh/*.pub
  ```

  If you don't see any, then you can create one. Don't forget to replace the email address with your real one.

  ```sh
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```

  Hit enter 3 times to accept all the defaults.

  Now you need to start your ssh-agent:

  ```sh
  eval "$(ssh-agent -s)"
  ```

  and add the key to your agent:

  ```sh
  ssh-add ~/.ssh/id_ed25519
  ```

  Now you'll want to go to https://github.com/settings/keys and add your public key.
  </details>

- [ ] Give your public key to a facilitator
  <details style="padding-left: 2em">
    <summary>How to copy your public key</summary>

  Run `code ~/.ssh/id_ed25519.pub` to open it and copy + paste it to your facilitator in a DM.

  Public keys are safe to share, but you should never need to send anyone your private key.

  We'll then add your key as a dokku user and you'll be able to start.

  </details>

### 2. Dokku CLI

- [ ] Installing the dokku command line client
  <details style="padding-left: 2em">
    <summary>How to install the Dokku CLI</summary>

  There's a dokku client that is part of the regular distribution so you can install it by cloning the dokku repo:

  ```sh
  git clone git@github.com:dokku/dokku.git ~/.dokku
  ```

  Add these lines to your `~/.zshrc` file:

  ```sh
  export DOKKU_HOST='devacademy.nz'
  alias dokku='bash $HOME/.dokku/contrib/dokku_client.sh'
  ```

  And then reload your `~/.zshrc` file:

  ```sh
  source ~/.zshrc
  ```

  </details>

## General app setup

Across all apps there are some things we need to make sure are done when we try and deploy it.

### 3. Removing hard-coded values

- [ ] Port uses `process.env.PORT` (not hard-coded to 3000)
  <details style="padding-left: 2em">
    <summary>More about dynamic ports</summary>
    
    Dokku will set a dynamic port when you deploy. If you are explicitly naming your port, dokku can't expose your app on their chosen port. To make this work locally and also when deployed, we listen on a dynamic port if available or else default to a local one:

  ```js
  const port = process.env.PORT || 3000
  ```

- [ ] App contains no references to localhost
  <details style="padding-left: 2em">
    <summary>More about localhost references</summary>

  Any references to 'localhost' within your app will break it, unless an alternative is provided. Best to avoid this unless absolutely necessary.
  </details>

### 4. Package.json

- [ ] Key dependencies are included in `dependencies` (vs `devDependencies` or globally)
  <details style="padding-left: 2em">
    <summary>More about production dependencies</summary>

  Ensure that all required packages are in the `dependencies` part of your `package.json`. Dokku will remove everything in `devDependencies` before it runs your app.

  If a package is working globally on your machine you may have forgotten to add it to your project explicitly with `npm install <package name>`, which means it will not be installed for the deployed version.

    </details>

- [ ] The `start` script calls `node` not `nodemon`
<details style="padding-left: 2em">
  <summary>More about setting the <code>start</code> script</summary>
  
  Dokku will use the `start` script (`npm run start`) to run your application
</details>

### 5. Adding a Dockerfile

- [ ] Application has a Dockerfile
  <details style="padding-left: 2em">
    <summary>Creating a dockerfile for your application</summary>

  Dokku can use docker to set up a virtual machine to run your application. To configure this
  create a file in the root of your repo called `Dockerfile` with these contents.

  ```Dockerfile
  FROM node:18-alpine
  WORKDIR /app

  COPY ["package.json", "package-lock.json*", "./"]
  RUN npm ci

  COPY . .

  ENV NODE_ENV=production
  RUN npm prune --omit=dev
  CMD ["npm", "run", "start"]
  ```

  </details>

## Creating and deploying your dokku app

### 6. Creating your app

- [ ] Creating your app
  <details style="padding-left: 2em">
    <summary>How to create an app</summary>

  In the git repo for your project run this command. Use your corresponding app name, eg: "alexc-pupparazzi".

  Note that the name cannot include any underscores ('\_').

  ```sh
  dokku apps:create my-name-my-app-name
  ```

  This will create an app on Dokku from your terminal, and automatically add it as a remote in your local repo

  </details>

### 7. Deploying your app

- [ ] Deploying your app
  <details style="padding-left: 2em">
    <summary>How to deploy an app</summary>

  **NOTE**: Dokku only has a `main` branch. so if you're deploying a local branch _other than_ `main`, you must specify which branch you're deploying with:

  ```sh
  git push dokku local-branch-name:main
  ```

  (Usually when we use `git push origin main`, it's actually short for `git push origin main:main`)

  </details>
