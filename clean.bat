@echo off
if exist js (
    rmdir /s /q js
)
if exist build\PTM.js (
    del build\PTM.js
)