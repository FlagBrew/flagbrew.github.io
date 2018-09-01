function fileSize(size) {
    var i = size == 0 ? 0 : Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

function qrCodeGoogleApi(link) {
  return "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="+ link + "&choe=UTF-8.png";
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
            $("#latest" + repo).append('<li>'
            + (asset.name.endsWith(".cia") ? ' <button id="qr-' + repo + '"><i class="fas fa-qrcode fa-2x"></i></button> ' : '')
            + '<b><a href="' + asset.browser_download_url + '">' + asset.name + '</a></b>'
            + '(' + fileSize(asset.size) + ')'
            + '</li>'
            + 'Downloaded <b>' + asset.download_count + '</b> times</p>');

            // if we have a cia, we need to attach an onclick listener
            if(asset.name.endsWith(".cia")){
                $("#qr-" + repo).click(function(){
                    swal({
                        title: repo,
                        text: 'Scan the QR Code with QRaken to install!',
                        imageUrl: qrCodeGoogleApi(asset.browser_download_url),
                        imageAlt: repo + " QR Code",
                        animation: true
                      })
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


function loadProjects(){
        let projects = $("#projects")
        if(projects){
            // loop through projects
            projects.find('div').each(function(i, project){
                getData(project.id.replace("project-", ""))
            })
        }
    }

loadProjects()