<?php
include("scripts/getUrlContents.php");

$data = getUrlContents($_GET['url']);
echo $data;
?>