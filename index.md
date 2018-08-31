---
layout: default
---

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

{% assign sorted_repositories = site.github.public_repositories | sort: "stargazers_count" | reverse %}
{% for repository in sorted_repositories %}
  {% if repository.fork == false %}
  {% unless repository.name == "EventsGalleryPacker" or repository.name == "flagbrew.github.io" %}
  <h2><a href="{{repository.html_url}}">{{repository.name}}</a> <img src="https://img.shields.io/github/downloads/FlagBrew/{{repository.name}}/total.svg"> <img src="https://img.shields.io/github/stars/FlagBrew/{{repository.name}}.svg"></h2>
  {% if repository.description %}
  <h4>{{repository.description}}</h4>
  {% else %}
  No description
  {% endif %}

  <script>
    $.getJSON("https://api.github.com/repos/FlagBrew/{{repository.name}}/readme", function (data) {
      $("#readme{{repository.name}}Id").attr("href", data['_links']['html'])
    });

    $.getJSON("https://api.github.com/repos/FlagBrew/{{repository.name}}/releases", function (data) {
      if ($.isArray(data) && data.length) {
        for (var i in data[0]["assets"]) {
          let asset = data[0]["assets"][i];
          $("#latest{{repository.name}}").append('<li><a href="{{asset.browser_download_url}}">{{asset.name}}</a></li>');
        }
      }
    });
  </script>

  <ul>
    <li><b>Readme:</b> <a id="readme{{repository.name}}Id" href="README.md">README.md</a></li>
    <li><b>Language:</b> {{repository.language}}</li>
    <li><b>License:</b> {{repository.license.name}}</li>
    <li><b>Last updated:</b> {{repository.updated_at}}</li>
  </ul>
  <h3>Latest release</h3>
  <ul id="latest{{repository.name}}">
  </ul>
  ---
  {% endunless %}
  {% endif %}
{% endfor %}
