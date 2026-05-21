# Opens Vercel one-click deploy for -Cyber (project name avoids leading hyphen in URL)
$repo = "https://github.com/Nahom-Abraham-Jr/-Cyber"
$params = @{
    "repository-url" = $repo
    "project-name"   = "dehinet-cyber"
    "framework"      = "nextjs"
}
$query = ($params.GetEnumerator() | ForEach-Object { "$($_.Key)=$([uri]::EscapeDataString($_.Value))" }) -join "&"
$url = "https://vercel.com/new/clone?$query"
Write-Host "Opening Vercel deploy: $url"
Start-Process $url
