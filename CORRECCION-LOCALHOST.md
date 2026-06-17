# LegalTIC v7.9.11 - Corrección localhost

Correcciones aplicadas:

1. Se agregó `StatusBadge`, que faltaba y provocaba pantalla blanca al entrar al panel administrador.
2. En `npm run dev` se evita llamar a `/.netlify/functions/oauth-profile-sync`, porque Vite puro no ejecuta Netlify Functions.
3. La app usa respaldo local de la sesión Google para reconocer `legaltic.abogados@gmail.com` como administrador maestro en localhost.
4. El flujo final es Google Auth para clientes, abogados y administradores.

Para probar localmente:

1. Copia tu archivo `.env.local` real dentro de esta carpeta.
2. Ejecuta:

```cmd
npm install
npm run dev
```

3. Abre:

```txt
http://localhost:5173
```

4. Si queda una sesión vieja, abre F12 > Console y ejecuta:

```js
localStorage.clear();
sessionStorage.clear();
location.href = 'http://localhost:5173/';
```
