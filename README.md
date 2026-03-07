::::: BUILD start :::::

This project uses **pnpm**. Install dependencies with:
```bash
pnpm install
```

:::::CMS run:::::
```bash
pnpm run ng s --port 4200
```
Or: `pnpm start` then open http://localhost:4200 (CRM: http://localhost:4200/#/crm)

:::::CRM run:::::
pnpm run ng s --port 4209

:::::API start:::::
open docker then 
run : cd /Users/akshaybalasahebshelke/Desktop/other-files/abhinavMEP/project/Abhinav_CRM/api/docker
run : docker compose up -d

::::: API stop ::::::
run : docker compose down


:: angular projects build ::
```bash
pnpm run ng build --configuration=production
``` 