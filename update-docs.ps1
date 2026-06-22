$Root = "C:\Users\ADMIN\Desktop\demo"
$Sohoa = Join-Path $Root "sohoa"
$Output = Join-Path $Root "data\documents.json"

$docs = Get-ChildItem -Path $Sohoa -Recurse -Filter *.pdf | ForEach-Object {

    $relativePath = $_.FullName.Replace($Root + "\", "").Replace("\", "/")

    $category = "Khác"

    if ($relativePath -like "sohoa/CHINHTRI/*") {
        $category = "Chính trị"
    }
    elseif ($relativePath -like "sohoa/QUANSU/*") {
        $category = "Quân sự"
    }
    elseif ($relativePath -like "sohoa/HAUCANKYTHUAT/*") {
        $category = "Hậu cần kỹ thuật"
    }
    elseif ($relativePath -like "sohoa/CHUYENDOISO/*") {
        $category = "Chuyển đổi số"
    }

    [PSCustomObject]@{
        title = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        category = $category
        date = $_.CreationTime.ToString("yyyy-MM-dd")
        time = $_.CreationTime.ToString("HH:mm")
        link = $relativePath
    }
}

$docs |
Sort-Object date, time -Descending |
ConvertTo-Json -Depth 5 |
Out-File $Output -Encoding utf8

Write-Host "Da tao xong: data/documents.json"