<?php

//Get the definitions from http://www.wordreference.com/definition => high quality definitions.

/**
 * \brief Parse the wordlist line for line and fetch the definitions.
 * \param list The list of the words to search for.
 */
function doWordList(string $list)
{
    $words = explode("\r\n", $list);
    $definitions = "";
    foreach($words as $word)
    {
        $definitions += "<strong>$word</strong>";
        $definitions += getDefinitions("http://www.wordreference.com/definition/".$word, '/HTML/BODY/DIV[@id="container"]/DIV[4]/TABLE[@id="contenttable"]/TBODY/TR/TD[@id="centercolumn"]/DIV[@id="article"]/DIV[2]/DIV/SPAN[2]/OL');
        $definitions += "<br>";
    }
    //Return the collected definitions.
    return $definitions;
}

?>