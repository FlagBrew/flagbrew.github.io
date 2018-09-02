--- 
layout: default 
---
<div id="projects" class="row">
    <!-- start of projects -->
    {% assign sorted_repositories = site.github.public_repositories | sort: "stargazers_count" | reverse %} {% for repository
    in sorted_repositories %} {% if repository.fork == false %} {% unless repository.name == "EventsGalleryPacker" or repository.name
    == "flagbrew.github.io" or repository.name == "CacheBox" %}
    <div class="col-md-4 d-flex align-items-stretch">
        <!-- Start of column -->
        <div class="card" id="project-{{repository.name}}" style="margin-bottom: 1rem;">
            <!-- Start of card -->
            <div class="card-body">
                <!-- Start of card body -->
                <h5 class="card-title"><a href="/project?p={{repository.name}}">{{repository.name}}</a><br>
                    <img src="https://img.shields.io/github/downloads/FlagBrew/{{repository.name}}/total.svg">
                    <img src="https://img.shields.io/github/stars/FlagBrew/{{repository.name}}.svg">
                </h5>
                {% if repository.description %}
                <p class="card-text">{{repository.description}}</p>
                {% else %}
                <p class="card-text">No description</p> {% endif %}
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <b>Readme:</b>
                        <a id="readme{{repository.name}}Id" href="README.md">README.md</a>
                    </li>
                    <li class="list-group-item">
                        <b>Language:</b> {{repository.language}}</li>
                    <li class="list-group-item">
                        <b>License:</b> {{repository.license.name}}</li>
                    <li class="list-group-item">
                        <b>Last updated:</b> {{repository.updated_at}}</li>
                    <li class="list-group-item">
                        <b style="cursor: pointer;" data-toggle="collapse" data-target="#versionShow-{{repository.name}}" aria-expanded="false" aria-controls="versionShow-{{repository.name}}">Latest
                            Version <i class="fas fa-chevron-down"></i></b>
                    </li>
                </ul>
                <div class="collapse" id="versionShow-{{repository.name}}">
                    <ul class="list-group list-group-flush" id="latestVersion{{repository.name}}">
                    </ul>
                </div>
            </div> <!-- End of card body -->
            <div class="card-footer">
                <small class="text-muted">Updated at 
                    {{repository.updated_at | date: "%Y-%m-%d %H:%M"}}</small>
            </div>
        </div> <!-- End of Column -->
    </div> <!-- End of card -->
    {% endunless %} {% endif %} {% endfor %}
</div> <!-- End of row -->
