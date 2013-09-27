<?php
include("scripts/getUrlContents.php");

$url = $_GET['url'];
$url = str_replace(" ", "%20", $url);

$data = getUrlContents($url);
echo $data;
?>