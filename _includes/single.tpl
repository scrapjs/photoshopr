<article class="single centered" id="{{ item.slug }}">
	<div class="single-preview" style="background:{{ item.background }}">
		<a href="{{ item.url }}" rel="{{ item.site }}" class="link-extender"></a>
		<img class="single-preview-logo" src="/img/{{ item.logo }}"/>
	</div>

	<!--<nav class="item-categories">
		{% for cat in item.categories %}
			<a href="/section/{{ cat }}" title="{{ cat }}" class="item-category"><i class="icon-{{cat}}"></i></a>
		{% endfor %}
	</nav>-->


	<header>
		<h1>{{ item.title }}</h1>
		<p>{{ item.tagline }}</p>
	</header>

	{% if item.images %}
		<div class="single-images">
			{% for image in item.images %}
			<img class="single-image" src="/img/{{ image }}">
			{% endfor %}
		</div>
	{% endif %}

	<div class="single-content">
		{{ item.content }}
	</div>

	<div class="single-related">
		
	</div>

</article>