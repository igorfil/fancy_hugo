# Hugo + Svelte + Tailwind (while using Rollup)

## From the beginning

1. Init empty npm project
    ```
    npm init -y
    ```

2. Add dev dependency. It will make it go into `package.json`

    ```
    npm install -D rollup
    ```

3. Add Svelte

    ```
    npm i svelte
    ```

4. Write JS and Svelte - main.js and App.svelte

5. Add plugins - for resolving third-party packages and Svelte:
    ```
    npm i -D @rollup/plugin-node-resolve rollup-plugin-svelte
    ```

6. Create Rollup config
    ```
    touch rollup.config.js
    ```    
    It exports Rollup config object. Input - all inputs, starting point of bundling; Output - where the stuff goes; Plugins - plugins (yes, cap)

7. Add `scripts` section to `package.json` to be able to invoke rollup with `rpm run x`

    ```json
    "scripts": {
        "dev": "rollup -c -w"
    } 
    ```

8. Add HTML
    ```
    touch public/index.html
    ```    

9. Add server to serve the page
    ```
    npm i -D rollup-plugin-serve
    ```

10. Add to plugins in rollup config
    ```
        serve('public')
    ```

11. Run and check at `http://localhost:10001/`
    ```
    npm run dev
    ```    

12. Add live reload
    ```
    npm i -D rollup-plugin-livereload
    ```    

    Update rollup config
    ```
    import livereload from 'rollup-plugin-livereload'

    livereload("public/")
    ```

## Add Hugo

1. Generate basic site
    ```
    hugo new site . --force
    ```
2. Remove dirs that are not needed right now
    ```
    rm -rf assets content data i18n themes
    ```
3. Create js folder
    ```
    mkdir static/js
    ```
4. Create basic layout:    
    - Create layouts/home.html
        ```html
        {{ define "body" }}
        <h1>Home Page</h1>

        <div id="app"></div>
        {{ end }}
        ```
    - layouts/_default/baseof.html
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>My Svelte App</title>
            <script defer src="js/bundle.js"></script>
        </head>

        <body>
            {{ block "body" . }}{{ end }}
        </body>

        </html>
        ```
    
The idea is that Hugo will look into /static folder and copy whatever is there into /public. So we want nom and rollup to output JS and css into static, so that Hugo will copy it to public.

The workflow
1. Run npm run ... to process Svelte and Tailwind
2. Run hugo to copy all that stuff into public directory

## Integrate Hugo into rollup

1. Install additional rollup plugins
    ```bash
    npm i -D npm-run-all
    npm i -D @rollup/plugin-terser
    ```
2. Update scripts section in `package.json`. This will run Rollup and Hugo automatically. First step - rollup generates JS and puts into /static, then Hugo deploys it to /public
    ```json
    "scripts": {
        "build": "rollup -c; hugo",
        "autobuild": "rollup -c -w",
        "dev": "run-p autobuild hugo:dev",
        "hugo:dev": "hugo server --bind=0.0.0.0 -D"
    }
    ```
3. Update rollup config:
    ```js
    const production = !process.env.ROLLUP_WATCH;
    ...
    production && terser(),
    ...
    watch: {
		clearScreen: false,
		include: 'src/**'
	}
    ```

## Add TailwindCSS

1. Install TailwindCss
    ```
    npm i -D tailwindcss 
    ```
2. Init Tailwind
    ```bash
    npx tailwindcss init
    ```
3. Adjust `tailwind.config.js` to pick up both Svelte and Hugo
    ```js
    content: [
        "./src/**/*.svelte",
        "./layouts/**/*.html",
        "./layouts/_default/**/*.html",
    ],
    ```  
4. Create style basic file
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
5. Add Tailwind to .html and .svelte files
6. Update npm run scripts:
    ```js
      "scripts": {
        "autobuild": "rollup -c -w",
        "hugo:dev": "hugo server --bind=0.0.0.0 -D",
        "tailwind:dev": "tailwindcss -i main.css -o ./static/css/bundle.css --watch",
        "dev": "run-p autobuild tailwind:dev hugo:dev",
        
        "build": "rollup -c; tailwindcss -i main.css -o ./static/css/bundle.css --minify; hugo"
        },
    ```
Auto-reload works when running `npm run dev`, also it generates css when running `npm run build`

## How it works

When running `npm run build` there are 3 stages:

1. `rollup -c` will take Svelte components, generate `.js` and put into `./static` folder
2. `tailwindcss -i main.css -o ./static/css/bundle.css --minify` will run Tailwind, it will take config from the file, and generate CSS for all .svelte and .html files, put into `./static` folder
3. `hugo` will generate pages and put into `./public`, then it will copy everything (our new .js and .css files) from `./static` into `./public`

`npm run dev` will do the same but those processes will run and watch for changes. Whenever a change happends, it will do same stuff as above.

Maybe there is a better way, I am not a frontend dev.