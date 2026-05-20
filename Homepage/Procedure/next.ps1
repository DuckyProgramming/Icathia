Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class MediaKey {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);
}
"@
$VK_MEDIA_NEXT_TRACK = 0xB0
$KEYEVENTF_KEYDOWN = 0x0
$KEYEVENTF_KEYUP = 0x2
[MediaKey]::keybd_event($VK_MEDIA_NEXT_TRACK, 0, $KEYEVENTF_KEYDOWN, [UIntPtr]::Zero)
Start-Sleep -Milliseconds 100
[MediaKey]::keybd_event($VK_MEDIA_NEXT_TRACK, 0, $KEYEVENTF_KEYUP, [UIntPtr]::Zero)