git pull
cd fe
gulp build

cd ..
rmdir site /S /Q
mkdir site
xcopy fe\dist site /O /X /E /H /K
pause