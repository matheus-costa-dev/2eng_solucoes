@echo off
:: Navega para a pasta raiz (onde o .git está)
cd ..

echo Atualizando arquivos no servidor...

:: Configura o Git para aceitar o push sem pedir senha (usando o Token)
:: Formato: https://USUARIO:TOKEN@github.com/REPOSITORIO
set REPO_URL=https://matheus-costa-dev:SEU_TOKEN_AQUI@github.com/matheus-costa-dev/2eng_solucoes.git

:: Captura a data e hora formatada no Windows
set DATA_HORA=%date% %time%

:: Configura uma identidade rápida para o Git não reclamar
git config user.name "Leandro"
git config user.email "cliente@email.com"

git add .
git commit -m "Publicacao automatica - %DATA_HORA%"

:: Faz o push forçando a URL com o Token
git push %REPO_URL% main

echo ...
echo Processo concluido com sucesso!
pause