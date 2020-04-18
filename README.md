## Developer Guide

### Required Installations

- node & npm
- python 3.8.2
  - pipenv

> ### My recommendation
>
> Use VSCode and open the client and server folders as two seperate workspaces (instances) of VSCode for an easy development experience.

### Development Environment Setup:

#### Client:

1. Open terminal in the internal client folder
2. Install required packages by running `npm install`
3. Fix Material-UI's typing mistake:
   1. Open the following file: `node_modules\material-table\types\index.d.ts`
   2. Add the following line to the `Column` interface:
   ```typescript
   width?:string | number;
   ```

To start the client, run `npm start`.
To enter admin-only pages, make sure your user_id cookie is the same as ADMIN_USER_ID.

#### Server:

1. Open terminal in the internal server folder
2. Install required packages by running `pipenv install`
3. Configure environment variables:
   1. Create a file named `.env` in the server folder with the following content:
   ```env
   SQLITE_DB_PATH=./mahaprinting.db
   ALLOW_CORS=TRUE
   ADMIN_USER_ID=<INSERT DESIRED USER_ID FROM COOKIES>
   ```
   2. The ADMIN_USER_ID value should be the same as the user_id cookie in the client of a manager. You can put a temporary value and fill this one later.

To start the server, enter the project's venv by running `pipenv shell` and then run `flask run`.

Alternatively, you can use VSCode's debug capabilities:

- copy the following `launch.json` into the `.vscode` folder in your python workspace, and then just hit `F5`!

<details>
<summary>
    Click here for the VSCode ".vscode/launch.json" file content that helps you debug the server easily
</summary>

```jsonc
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Flask",
      "type": "python",
      "request": "launch",
      "module": "flask",
      "env": {
        "FLASK_APP": "app.py",
        "FLASK_ENV": "development",
        "FLASK_DEBUG": "0"
      },
      "args": ["run", "--no-debugger", "--no-reload"],
      "jinja": true
    }
  ]
}
```

</details>
