function parseList()
{
    var lines = $("#InputWords").val().split("\n");
    $.each(lines, function(n, elem) {
        $.get("getUrl.php?url=" + $("#UrlParameter").val() + encodeURI(elem), function(data) {
            $("#FetchedDefinitions").append("<strong>" + elem + "</strong><br>");
            $("#FetchedDefinitions").append($(data).find($("#CSSSelectorParameter").val()).html());
        });
    });
    
}
function openInNewtab()
{
    var htmlTemplateHead = '<!DOCTYPE html> \n \
<html> \n \
  <head> \n \
    <title>parsing Results</title> \n \
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