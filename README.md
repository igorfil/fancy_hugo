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
    ```# Hugo + Svelte + Tailwind (while using Rollup)

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

    rm -rf assets content data i18n static themes

    Create layouts/home.html, layouts/_default/baseof.html

    ```
{{ define "body" }}
<h1>Home Page</h1>

<div id="app"></div>
{{ end }}
    ```

    ```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Svelte App</title>
    <script defer src="assets/bundle.js"></script>
  </head>

<body>
    {{ block "body" . }}{{ end }}
</body>

</html>
    ```

hugo new theme test    
echo "theme = 'test'" >> hugo.toml
    import livereload from 'rollup-plugin-livereload'

    livereload("public/")
    ```

Hugo will look into /static folder and copy whatever is there into /public. So we want nom and rollup to output JS and css into static, so that Hugo will copy it to public.

The workflow
1. Run npm run ... to process Svelte and Tailwind
2. Run hugo to copy all that stuff into public directory