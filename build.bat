cls
call clean.bat
@echo on
start "tsc" /wait cmd /c call tsc 
browserify "./js/Main.js" -o "./build/ptm.js"