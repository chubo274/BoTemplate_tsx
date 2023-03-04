# BoTemplate_tsx
setup structure, navigation, i18n, helper
<h4 align="center">Project structure:</h4>
```bash```
📦app
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┗ 📂images
 ┣ 📂data
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂interceptor        #interceptor parse model success fail, setHeader token, refresh token.
 ┃ ┗ 📂repositories         #the place to call api and parse data to model.
 ┣ 📂models                 #class, interface model data has parse logic.
 ┣ 📂modules
 ┃ ┣ 📂components           
 ┃ ┣ 📂navigation
 ┃ ┃ ┣ 📂appStack           #stack screen need signed.
 ┃ ┃ ┣ 📂authStack          #stack screen not need signed.
 ┃ ┃ ┣ 📂configHeader       #config header of screen.
 ┃ ┗ 📂screens              #screen module.
 ┣ 📂redux
 ┃ ┣ 📂actions
 ┃ ┃ ┣ 📂common             #base common action has usage type for normal, array, section data.
 ┃ ┃ ┣ 📂sysGeneral
 ┃ ┣ 📂reducers
 ┃ ┃ ┣ 📂common             #base common reducer process normal, array, section data follow action type common.
 ┃ ┃ ┣ 📂sysGeneral         #reducer storage data not from API, but make screen re-render.
 ┃ ┣ 📂sagas
 ┃ ┣ 📂selectors
 ┃ ┗ 📂store                #redux store, redux persist
 ┣ 📂shared
 ┃ ┣ 📂helpers              #helper function, notification.
 ┃ ┣ 📂hooks             
 ┃ ┣ 📂localization         #store transilation
 ┃ ┣ 📂moduleLib
 ┃ ┗ 📂theme                #about font, globalstyle, spacing, color using context to change theme
 ┗ 📜App.tsx
```
