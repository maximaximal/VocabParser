$("#progressMessage").hide();
$("#FinishedDiv").hide();

$('#InputSourcesExpander').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $collapse = $this.closest('.collapse-group').find('.collapse');
    $collapse.collapse('toggle');
});

var itemProgress = 0;
var itemCount = 0;
var run = false;

function parseList()
{
    itemCount = 0;
    itemProgress = 0;
    output = ["", ""];
    tableCreated = false;
        run = false;
        $("#progressMessage").show();
        var lines = $("#InputWords").val().split("\n");
        $.each(lines, function(n, elem) {
            //Add 1 item
            itemCount = itemCount + 1;

            if($("#AddTranslation").is(":checked"))
                itemCount = itemCount + 1;
            
            var def = "";
            var tran = "";

            $.get("getUrl.php?url=" + $("#UrlParameter").val() + encodeURI(elem) + $("#UrlParameterAfter").val(), function(data) {
                itemProgress = itemProgress + 1;
                if($("#AddTranslation").is(":checked"))
                {
                    $.get("getUrl.php?url=" + $("#TranslationUrlParameter").val() + encodeURI(elem) + $("#TranslationUrlParameterAfter").val(), function(Tdata) {
                        itemProgress = itemProgress + 1;
                        if($("#FirstDefinitionWord").is(":checked"))
                            def = $(data).find($("#CSSSelectorParameter").val()).first().html();
                        else
                            def = $(data).find($("#CSSSelectorParameter").val()).map(function() {return this.innerHTML}).get();
;
                        if($("#FirstDefinitionWord").is(":checked"))
                            tran = $(Tdata).find($("#TranslationCSSSelectorParameter").val()).html();
                        else
                            tran = $(Tdata).find($("#TranslationCSSSelectorParameter").val()).map(function() {return this.innerHTML}).get();
                        addToList(elem, def, tran);
                        checkFinished();
                    });
                }
                else
                {
                    if($("#FirstDefinitionWord").is(":checked"))
                        def = $(data).find($("#CSSSelectorParameter").val()).first().html();
                    else
                        def = $(data).find($("#CSSSelectorParameter").val()).map(function() {return this.innerHTML}).get();
                    addToList(elem, def, "");
                    checkFinished();
                }
            });
        });
        run = true;
    }

var tableCreated = false;
var output;

function addToList(word, definition, translation)
{
    if($("#CreateTable").is(":checked"))
    {
        var element = "";
        if(!tableCreated)
        {
            //Create a table.
            element = '<table class="table table-bordered"><thead><tr><th>Word</th>\n';
            if($("#AddDefinition").is(":checked"))
                element += "<th>Definition</th>";
            if($("#AddTranslation").is(':checked'))
                element += "<th>Translation</th>";
            element += '</tr></thead><tbody>\n';
            tableCreated = true;
        }
        element += "<tr>\n";
        element += "<td>" + word + "</td>";
        if($("#AddDefinition").is(":checked"))
            element += "<td>" + definition + "</td>";
        if($("#AddTranslation").is(":checked"))
            element += "<td>" + translation + "</td>";
        element += "</tr>";  
    
        if(itemCount == itemProgress)
        {
            element += "</tbody>";
            element += "</table>";
        }
        output.push(element);
    }
    else
    {
        //Create a simple list.
        if($("#AddTranslation").is(":checked"))
            $("#FetchedDefinitions").append("<strong>" + word + "</strong> - <i>" + translation + "</i><br>\n");
        else
            $("#FetchedDefinitions").append("<strong>" + word + "</strong><br>\n");

        if($("#AddDefinition").is(":checked"))
            $("#FetchedDefinitions").append(definition + "\n");
    }
}
/**
* @brief Checks if the fetching has finished.
*/
function checkFinished()
{
    var width = itemProgress / itemCount * 100;
    $('#fetchingProgress').width(width + '%');
    if(itemCount == itemProgress)
    {
        if(run == true)
        {
            //Finished!
            $("#progressMessage").hide();
            $("#FinishedDiv").show();
            $('#fetchingProgress').width(0);
            $("#FetchedDefinitions").append(output.join(""));
            //
            //Remove all links
            $("#FetchedDefinitions a").each(function(){
                $(this).replaceWith($(this).text());
            });
        }
    }
}
function openInNewtab()
{
    var htmlTemplateHead = '<!DOCTYPE html> \n \
<html> \n \
  <head> \n \
    <title>Vocab Parser - Results</title> \n \
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> \n \
    <!-- Bootstrap --> \n \
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen"> \n \
     \n \
    <!-- Custom CSS --> \n \
    <link href="css/style.css" rel="stylesheet" media="screen"> \n \
 \n \
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries --> \n \
    <!--[if lt IE 9]> \n \
      <script src="assets/js/html5shiv.js"></script> \n \
      <script src="assets/js/respond.min.js"></script> \n \
    <![endif]--> \n \
  </head> \n \
  <body> \n';
    var htmlTemplateFoot = '    <!-- jQuery (necessary for Bootstraps JavaScript plugins) --> \n \
    <script src="http://code.jquery.com/jquery.js"></script> \n \
    <!-- Include all compiled plugins (below), or include individual files as needed --> \n \
    <script src="js/bootstrap.min.js"></script> \n \
  </body> \n \
</html>'
    var newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(htmlTemplateHead + $("#FetchedDefinitions").html() + htmlTemplateFoot);
    newWindow.document.close();
}
function clearList()
{
    $("#FetchedDefinitions").html("");
    $("#FinishedDiv").hide();
}
