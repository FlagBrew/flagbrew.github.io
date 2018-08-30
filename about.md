---
layout: default
title: About
permalink: /about/
---

<h2>FlagBrew is</h2>

{% for contributor in site.github.organization_members %}
  <img id="{{contributor.login}}" src = "{{contributor.avatar_url}}" width="120" height="120">
{% endfor %}