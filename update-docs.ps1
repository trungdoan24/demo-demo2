[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Root = "C:\Users\ADMIN\Desktop\demo"
$Sohoa = Join-Path $Root "sohoa"
$Output = Join-Path $Root "data\documents.json"

$docs = Get-ChildItem -Path $Sohoa -Recurse -Filter *.pdf | ForEach-Object {

    $relativePath = $_.FullName.Replace($Root + "\", "").Replace("\", "/")



    $title = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)

    if ($relativePath -like "sohoa/CHINHTRI/TOADAM/*") {
        $folderName = Split-Path $_.DirectoryName -Leaf
        $fileName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        $title = "$folderName - $fileName"
    }

    [PSCustomObject]@{
        title    = $title
        date     = $_.CreationTime.ToString("yyyy-MM-dd")
        time     = $_.CreationTime.ToString("HH:mm")
        link     = $relativePath
    }
}

$docs |
Sort-Object date, time -Descending |
ConvertTo-Json -Depth 10 |
Set-Content -Path $Output -Encoding UTF8

Write-Host "Da tao xong: data/documents.json"