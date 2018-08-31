function fileSize(size) {
    var i = size == 0 ? 0 : Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

function qrCodeGoogleApi(link) {
  return "<img src='https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="+ link + "&choe=UTF-8.png'>";
}


function getData(repo){

    $.getJSON("https://api.github.com/repos/FlagBrew/" + repo +"/readme", function (data) {
        $("#readme"+ repo +"Id").attr("href", data['_links']['html'])
      });

    $.getJSON("https://api.github.com/repos/FlagBrew/"+ repo +"/releases", function (data) {
        if ($.isArray(data) && data.length) {
          // release title
          document.getElementById("latestVersion" + repo).innerHTML = "Latest release: " + data[0].tag_name + " (" + data[0].published_at.substring(0, 10) + ")";
  
          for (var i in data[0]["assets"]) {
            let asset = data[0]["assets"][i];
            $("#latest" + repo).append('<li><b><a href="' + asset.browser_download_url + '">' + asset.name + '</a></b>'
            + (asset.name.endsWith(".cia") ? ' <button id="qr-' + repo + '">Click for QR</button>' : '')
            + '(' + fileSize(asset.size) + ')'
            + '</li>'
            + 'Downloaded <b>' + asset.download_count + '</b> times</p>');

            // if we have a cia, we need to attach an onclick listener
            if(asset.name.endsWith(".cia")){
                $("#qr-" + repo).click(function(){
                    // close existing modal
                    $("#qr").dialog("close")
                    $("#qr").empty()
                    $("#qr").append("<p>Scan this QR Code with QRaken<br/>" +
                    "This will install " + repo + "</p>" + qrCodeGoogleApi(asset.browser_download_url)).dialog("open")
                })
            }
          }
          // source code
          $("#latest" + repo).append('<li><b><a href="' + data[0].zipball_url + '">Source code</a></b> for ' + data[0].tag_name + '</li>');
        } else {
          document.getElementById("latestVersion" + repo).style.display = "none";
          document.getElementById("latest" + repo).style.display = "none";
        }
      });
}

function setDialog(){
    $( "#qr" ).dialog({
        autoOpen: false,
        title: "QR Code",
        show: {
          effect: "blind",
          duration: 500
        },
        hide: {
          effect: "explode",
          duration: 500
        }
      });
}


function loadProjects(){
        let projects = $("#projects")
        if(projects){
            // loop through projects
            projects.find('div').each(function(i, project){
                getData(project.id.replace("project-", ""))
            })
            setDialog()
        }
    }

loadProjects()