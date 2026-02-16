@echo off
:: Navega para a pasta anterior (opcional, veja nota abaixo)
cd ..
echo desfazendo as alterações e voltando a última versão
:: O comando correto usa dois hifens antes de 'hard'
git reset --hard
echo Processo finalizado
pause
