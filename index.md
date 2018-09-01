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
