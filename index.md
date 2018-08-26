---
layout: default
---

{% assign sorted_repositories = site.github.public_repositories | sort: "stargazers_count" | reverse %}
{% for repository in sorted_repositories %}
  {% if repository.fork == false %}
  {% unless repository.name == "EventsGalleryPacker" or repository.name == "flagbrew.github.io" %}
  ## [{{ repository.name }}]({{ repository.html_url }}) ![downloads]({{ 'https://img.shields.io/github/downloads/FlagBrew/' | append: repository.name | append: '/total.svg'}}) ![stars]({{ 'https://img.shields.io/github/stars/FlagBrew/' | append: repository.name | append: '.svg'}})
  {% if repository.description %}
  {{ repository.description}}
  {% else %}
  No description
  {% endif %}
  {% endunless %}
  {% endif %}
{% endfor %}