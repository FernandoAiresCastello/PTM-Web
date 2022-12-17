cls
call clean.bat
@echo on
start "tsc" /wait cmd /c call tsc 
browserify "./js/PTM.js" -o "./build/PTM.js"
