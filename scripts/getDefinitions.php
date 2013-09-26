<?php
include("getUrlContents.php");

/**
 * \brief Returns the definitions / synonyms of a word from dict.cc.
 * \param url The url of the dict.cc site to get the definitions from.
 * \param definitionPath The XPATH to the definitions.
 */
function getDefinitions(string $url, string $definitionPath)
{
    //Get the contents of the webpage.
    $html = getUrlContents($url);
    
    //Create a XML parser.
    $xmldoc = new DOMDocument();
    
    //Load the fetched html.
    $xmldoc->loadHTML($html);
    
    //Create the xpath handler.
    $xpathvar = new Domxpath($xmldoc);
    
    //Get the specified result.
    $result = $xpathvar->query($definitionPath);
    
    //Return the definition.
    return $result;
}

?>