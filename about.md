---
layout: default
title: About
permalink: /about/
---

<div id="cardsAbout" class="card-columns">
  {% for contributor in site.github.organization_members %}
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="{{contributor.avatar_url}}" alt="{{contributor.login}}">
      <div class="card-body">
        <h5 class="card-title">{{contributor.login}}</h5>
        <p id="bio{{contributor.login}}" class="card-text"></p>
        <a id="github{{contributor.login}}" href="#" class="btn btn-primary">Github</a>
      </div>
    </div>
  {% endfor %}
</div>