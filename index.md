---
layout: default
---

{% assign sorted_repositories = site.github.public_repositories | sort: "stargazers_count" | reverse %}
{% for repository in sorted_repositories %}
  {% if repository.fork == false %}
  {% unless repository.name == "EventsGalleryPacker" or repository.name == "flagbrew.github.io" %}
  <h2><a href="{{repository.html_url}}">{{repository.name}}</a></h2>
  <img src="https://img.shields.io/github/downloads/FlagBrew/{{repository.name}}/total.svg">
  <img src="https://img.shields.io/github/stars/FlagBrew/{{repository.name}}.svg">
  {% if repository.description %}
  <h3>{{ repository.description}}</h3>
  {% else %}
  No description
  {% endif %}
  {% endunless %}
  {% endif %}
{% endfor %}