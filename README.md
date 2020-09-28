# MahaPrinting

MahaPrinting lets you manage user-uploaded prints in a print queue, and dispatch those prints to multiple printers managed by OctoPrint, all from a single UI.

## Origin Story

MahaPrinting was designed for a convention/hackathon where the participants can request 3D prints for their projects.  
That causes some headache prioritizing and tracking prints, and coordinating available printers.  
MahaPrinting attempts to solve these problems.

## Among the features:

- GCODE/STL support:

  - STL files can be downloaded, sliced and re-uploaded as GCODE by the manager
  - GCODE files can be sent directly to the printers

- A user can upload prints and view the status (in queue, printing, done...) of the prints he uploaded in a mobile-friendly web page:

  ![a picture of the print upload form](/images/user-upload-new-print.png)

  ![a picture of the user's view of his prints](/images/user-view-print.png)

- The manager can see the list of uploaded user prints, look at a preview of the STL/GCODE and decide to which printer this print should be sent:

  ![a picture of the manager page](/images/manager-page.png)

  ![a picture of the manager page](/images/manager-page-send-to-printer.png)

**Note**: To open the management page, browse to `/manage` in the address bar. This page can only be opened by the admin.

## How to build:

Requirements:

- Docker & docker-compose installed
- Active internet connection

Steps:

1. Open a terminal in the root directory of the project
2. Run `docker-compose build`

## How to run:

1. Open a terminal in the root directory of the project
2. Run `docker-compose up -d`

_**Important:**_ In order to open the `/manage` page, you need to make sure your `user_id` cookie is the same as the `ADMIN_USER_ID` environment variable inside of the configuration file `docker-compose.yml`.

<details>
<summary>
  Developer Guide
</summary>

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

To start the client, run `npm start`.
To enter admin-only pages, make sure your user_id cookie is the same as ADMIN_USER_ID.

#### Server:

1. Open terminal in the internal server folder
2. Install required packages by running `pipenv install --dev`
3. Configure environment variables:
   1. Create a file named `.env` in the server folder with the following content:
   ```env
   SQLITE_DB_PATH=./mahaprinting.db
   ALLOW_CORS=TRUE
   ADMIN_USER_ID=<INSERT DESIRED USER_ID FROM COOKIES>
   ```
   2. The `ADMIN_USER_ID` value should be the same as the `user_id` cookie in the client of a manager. You can put a temporary value and fill this one later.

To start the server, run `flask run` in a shell inside the venv. (To open a shell inside the venv, run `pipenv shell`)

> On windows, pipenv sometimes screws up adding the venv to the PATH on git bash. you can fix this by editing the "activate" script (just "activate", no file extension) in the bin folder of the venv and changing the path assigned to `VIRTUAL_ENV` to be in a format compatible with git bash.  
> To easily open the `activate` script for editing, run the following command in git bash from the server project directory:
>
> ```bash
> code "\$(pipenv --venv)/Scripts/activate"
> ```

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
</details>
