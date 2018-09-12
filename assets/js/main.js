const cacheServer = "https://cachebox.fm1337.com"

// borrowed from https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings/30106551#30106551
function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

function fileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

function qrCodeGoogleApi(link) {
    return "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="+ link + "&choe=UTF-8.png";
}

function getData(repo) {
    $.getJSON(cacheServer + "/api/repos/" + repo, function(data) {
        // set the README link
        $("#readme" + repo + "Id").attr("href", data['readme']['_links']['html'])
        // Get the release data
        if ($.isArray(data['releases']) && data['releases'].length > 0) {
            // release title
            document.getElementById("latestVersion" + repo).innerHTML = "<li class='list-group-item'>Latest release: <b>" + data['releases'][0].tag_name + "</b> (" + data['releases'][0].published_at.substring(0, 10) + ")</li>";
    
            for (var i in data['releases'][0]["assets"]) {
              let asset = data['releases'][0]["assets"][i];
                $("#latestVersion" + repo).append('<li class="list-group-item">'
                    + '<b><a href="' + asset.browser_download_url + '">' + asset.name + '</a></b>'
                    + ' '
                    + (asset.name.endsWith(".cia") ? ' <button class="btn btn-success" id="qr-' + repo + '"><i class="fas fa-qrcode fa-lg"></i></button> ' : '')
                    + ' '
                    + '(' + fileSize(asset.size) + ')'
                    + ' Downloaded <b>' + asset.download_count + '</b> times</p>'
                    + '</li>');
  
              // if we have a cia, we need to attach an onclick listener
              if (asset.name.endsWith(".cia")) {
                  $("#qr-" + repo).click(function() {
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
            $("#latestVersion" + repo).append('<li class="list-group-item"><b><a href="' + data['releases'][0].zipball_url + '">Source code</a></b> for ' + data['releases'][0].tag_name + '</li>');
          } else {
            $("#latestVersion" + repo).append("<p class='card-text strong'>No Releases Available</p>");
          }
    })
}

function loadMemberData() {
    $.getJSON(cacheServer + "/api/members/", function(data) {
        for (var i in data) {
            $("#bio" + data[i]['data']['login']).text(data[i]['data']['bio']);
            $("#github" + data[i]['data']['login']).attr("href", data[i]['data']['html_url']);
        }
    });
}
if ($("#cardsAbout").length > 0) {
    loadMemberData()
}

function loadProjects() {
    // loop through projects
    $("div[id*='project-']").each(function(i, project) {
        getData(project.id.replace("project-", ""))
    })
}
if ($("#projects").length > 0) {
    loadProjects()
}

function projectInfo() {
    let params = (new URL(location)).searchParams;
    let project = params.get('p');
    // if no project is specified, redirect back to the homepage
    if (project == "") {
        window.location.replace("/");
    }
    // set the page info
    $("#page-info").append("Check out " + project + "'s README below or visit us on GitHub!")
    // set the title
    document.title = project + " | FlagBrew"
    // clear the placeholder stuff
    let content = $("#project-content")
    content.empty()
    content.append("<h1>"
    + project 
    + "</h1>"
    + '<img src="https://img.shields.io/github/downloads/FlagBrew/'+ project +'/total.svg"> '
    + '<img src="https://img.shields.io/github/stars/FlagBrew/' + project + '.svg">'
    + '<br />'
    + "<a href ='https://github.com/flagbrew/"+ project +"'><button class='btn btn-sm btn-success'>View on <i class='fab fa-github'></i> Github</button></a><hr />")
    // Next we need to get some repo data
    // TODO: Handle release data on the project page.
    // $.getJSON("https://api.github.com/repos/FlagBrew/"+ project +"/releases", function (data) {

    // });
    // Now we need to get the README data from github
    $.getJSON(cacheServer + "/api/repos/" + project, function (data) {
        let converter = new showdown.Converter({tables: true})
        content.append(converter.makeHtml(b64DecodeUnicode(data['readme'].content)))
      });
}

if ($("#project-content").length > 0) {
    projectInfo()
}