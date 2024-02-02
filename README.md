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