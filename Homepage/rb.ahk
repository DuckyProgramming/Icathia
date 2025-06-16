; Wait for the CMD window to appear
WinWait, ahk_class ConsoleWindowClass
WinActivate

; Right-click the minimize button to send it to tray (RBTray intercepts this)
CoordMode, Mouse, Screen
WinGetPos, X, Y, Width, Height, ahk_class ConsoleWindowClass

; Move mouse to minimize button location (adjust if needed)
MouseMove, X + Width - 160, Y + 10
Click, Right