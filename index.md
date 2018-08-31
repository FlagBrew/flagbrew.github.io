---
layout: default
---
<div id="projects">
{% assign sorted_repositories = site.github.public_repositories | sort: "stargazers_count" | reverse %}
{% for repository in sorted_repositories %}
  {% if repository.fork == false %}
  {% unless repository.name == "EventsGalleryPacker" or repository.name == "flagbrew.github.io" %}
  <div id="project-{{repository.name}}">
  <h2><a href="{{repository.html_url}}">{{repository.name}}</a> <img src="https://img.shields.io/github/downloads/FlagBrew/{{repository.name}}/total.svg"> <img src="https://img.shields.io/github/stars/FlagBrew/{{repository.name}}.svg"></h2>
  {% if repository.description %}
  <h3>{{repository.description}}</h3>
  {% else %}
  No description
  {% endif %}

<<<<<<< HEAD
=======
  <script>
    $.getJSON("https://api.github.com/repos/FlagBrew/{{repository.name}}/readme", function (data) {
      $("#readme{{repository.name}}Id").attr("href", data['_links']['html'])
    });

    $.getJSON("https://api.github.com/repos/FlagBrew/{{repository.name}}/releases", function (data) {
      if ($.isArray(data) && data.length) {
        // release title
        document.getElementById("latestVersion{{repository.name}}").innerHTML = "Latest release: " + data[0].tag_name + " (" + data[0].published_at.substring(0, 10) + ")";

        for (var i in data[0]["assets"]) {
          let asset = data[0]["assets"][i];
          $("#latest{{repository.name}}").append('<li><b><a href="' + asset.browser_download_url + '">' + asset.name + '</a></b>'
          + (asset.name.endsWith(".cia") ? '<b><a href="' + qrCodeGoogleApi(asset.browser_download_url) + '"> [QR]</a></b>' : '')
          + ' (' + fileSize(asset.size) + ')'
          + '</li>'
          + 'Downloaded <b>' + asset.download_count + '</b> times</p>');
        }
        // source code
        $("#latest{{repository.name}}").append('<li><b><a href="' + data[0].zipball_url + '">Source code</a></b> for ' + data[0].tag_name + '</li>');
      } else {
        document.getElementById("latestVersion{{repository.name}}").style.display = "none";
        document.getElementById("latest{{repository.name}}").style.display = "none";
      }
    });
  </script>

>>>>>>> eab77d4027e64c3e3f39b5601daedf2cddbb66a7
  <ul>
    <li><b>Readme:</b> <a id="readme{{repository.name}}Id" href="README.md">README.md</a></li>
    <li><b>Language:</b> {{repository.language}}</li>
    <li><b>License:</b> {{repository.license.name}}</li>
    <li><b>Last updated:</b> {{repository.updated_at}}</li>
  </ul>
  <h4 id="latestVersion{{repository.name}}">Latest release</h4>
  <ul id="latest{{repository.name}}">
  </ul>
  </div>
  <hr>
  {% endunless %}
  {% endif %}
{% endfor %}
</div>

<div id="qr"></div>