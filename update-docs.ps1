$Root = "C:\Users\ADMIN\Desktop\demo"
$Sohoa = Join-Path $Root "sohoa"
$Output = Join-Path $Root "data\documents.json"

# Link Public Development URL của Cloudflare R2
$R2BaseUrl = "https://pub-c2e8442283284d7fb780151a79a75b29.r2.dev"

$docs = Get-ChildItem -Path $Sohoa -Recurse -Filter *.pdf | ForEach-Object {

    # Đường dẫn tương đối trong máy: sohoa/...
    $relativePath = $_.FullName.Replace($Root + "\", "").Replace("\", "/")

    # Link PDF trên Cloudflare R2
    $webLink = $R2BaseUrl + "/" + [System.Uri]::EscapeUriString($relativePath)

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
        title    = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        category = $category
        date     = $_.CreationTime.ToString("yyyy-MM-dd")
        time     = $_.CreationTime.ToString("HH:mm")
        link     = $webLink
    }
}

$docs |
Sort-Object date, time -Descending |
ConvertTo-Json -Depth 10 |
Out-File $Output -Encoding utf8

Write-Host "Da tao xong: data/documents.json"