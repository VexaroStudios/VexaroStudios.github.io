<?php

$discord_webhook = "https://discord.com/api/webhooks/1442654834757996616/CxSxuYUr83J7htzR_Egieho4hgTkZdzb_jo2V1mvQBq3e5-RZNSb0Hdyucn6d2TVNChD";

$payload = file_get_contents("php://input");
$data = json_decode($payload, true);

if (!$data) {
    http_response_code(400);
    exit("Invalid payload");
}

$repo = $data["repository"]["full_name"] ?? "Unbekannt";
$pusher = $data["pusher"]["name"] ?? "Unknown";
$commit = $data["head_commit"]["message"] ?? "No message";
$url = $data["head_commit"]["url"] ?? "";
$timestamp = $data["head_commit"]["timestamp"] ?? "";
$author = $data["head_commit"]["author"]["name"] ?? "Unknown";
$added = implode("\n• ", $data["head_commit"]["added"] ?? []);
$modified = implode("\n• ", $data["head_commit"]["modified"] ?? []);
$removed = implode("\n• ", $data["head_commit"]["removed"] ?? []);

$embed = [
    "username" => "GitHub Updates",
    "avatar_url" => "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    "embeds" => [
        [
            "title" => "📌 Repository Updated: $repo",
            "url" => $url,
            "color" => hexdec("5865F2"),
            "fields" => [
                [
                    "name" => "📝 Commit Message",
                    "value" => $commit
                ],
                [
                    "name" => "👤 Author",
                    "value" => $author,
                    "inline" => true
                ],
                [
                    "name" => "⏰ Timestamp",
                    "value" => $timestamp,
                    "inline" => true
                ],
            ],
            "footer" => [
                "text" => "GitHub → Discord Webhook"
            ]
        ]
    ]
];

if ($added) {
    $embed["embeds"][0]["fields"][] = [
        "name" => "🟢 Added",
        "value" => "• " . $added
    ];
}

if ($modified) {
    $embed["embeds"][0]["fields"][] = [
        "name" => "🟡 Modified",
        "value" => "• " . $modified
    ];
}

if ($removed) {
    $embed["embeds"][0]["fields"][] = [
        "name" => "🔴 Removed",
        "value" => "• " . $removed
    ];
}

$options = [
    'http' => [
        'header'  => "Content-Type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($embed)
    ]
];

$context  = stream_context_create($options);
file_get_contents($discord_webhook, false, $context);

echo "OK";
?>
