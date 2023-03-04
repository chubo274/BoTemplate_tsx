<h3 align="center">SSM mobile app for parent.</h3>
<h4 align="center">Project structure:</h4>
<div>📦app</div>
<div> ┣ 📂assets</div>
<div> ┃ ┣ 📂fonts</div>
<div> ┃ ┗ 📂images</div>
<div> ┣ 📂data</div>
<div> ┃ ┣ 📂api</div>
<div> ┃ ┃ ┣ 📂interceptor        #interceptor parse model success fail, setHeader token, refresh token.</div>
<div> ┃ ┗ 📂repositories         #the place to call api and parse data to model.</div>
<div> ┣ 📂models                 #class, interface model data has parse logic.</div>
<div> ┣ 📂modules</div>
<div> ┃ ┣ 📂components           </div>
<div> ┃ ┣ 📂navigation</div>
<div> ┃ ┃ ┣ 📂appStack           #stack screen need signed.</div>
<div> ┃ ┃ ┣ 📂authStack          #stack screen not need signed.</div>
<div> ┃ ┃ ┣ 📂configHeader       #config header of screen.</div>
<div> ┃ ┗ 📂screens              #screen module.</div>
<div> ┣ 📂redux</div>
<div> ┃ ┣ 📂actions</div>
<div> ┃ ┃ ┣ 📂common             #base common action has usage type for normal, array, section data.</div>
<div> ┃ ┃ ┣ 📂sysGeneral</div>
<div> ┃ ┣ 📂reducers</div>
<div> ┃ ┃ ┣ 📂common             #base common reducer process normal, array, section data follow action type common.</div>
<div> ┃ ┃ ┣ 📂sysGeneral         #reducer storage data not from API, but make screen re-render.</div>
<div> ┃ ┣ 📂sagas</div>
<div> ┃ ┣ 📂selectors</div>
<div> ┃ ┗ 📂store                #redux store, redux persist</div>
<div> ┣ 📂shared</div>
<div> ┃ ┣ 📂helpers              #helper function, notification.</div>
<div> ┃ ┣ 📂hooks             </div>
<div> ┃ ┣ 📂localization         #store transilation</div>
<div> ┃ ┣ 📂moduleLib</div>
<div> ┃ ┗ 📂theme                #about font, globalstyle, spacing, color using context to change theme</div>
<div> ┗ 📜App.tsx</div>
