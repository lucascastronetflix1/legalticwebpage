# Corrección v7.9.32

Corrige la pantalla blanca causada por el error:

`Uncaught ReferenceError: getEffectiveUserRole is not defined`

La función de rol efectivo ahora está declarada antes de usarse en LegalTICApp y AdminPanel.

No requiere pegar nuevamente SQL en Supabase si las tablas ya fueron creadas.

Para probar en Windows:

```cmd
cd "C:\Users\Hp\Downloads\legaltic-webapp-v7.9.32-pantalla-blanca-role-fix\work_v7932"
npm.cmd install
npm.cmd run dev
```
