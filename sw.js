---
---
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open('blog').then(function(cache) {
    return cache.addAll([
      {% for page in site.pages %}
      '{{ page.url | remove: '.html' }}',
      {% endfor %}
      {% for post in site.posts %}
      '{{ post.url | remove: '.html' }}',
      {% endfor %}
      {% for file in site.static_files %}
      '{{ site.baseurl }}{{ file.path }}',
      {% endfor %}      
    ]);
  }));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then(function(response) { 
    return response;
  }));
});
