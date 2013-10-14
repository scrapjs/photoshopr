<div class="item-box">
<article class="item" id="{{ item.slug }}">
	<div class="item-preview" style="background:{{ item.background }}">
		<a href="{{ item.site }}" class="item-preview-link-extender"></a>
		{% if item.images %}
			<div class="item-preview-slides">
				{% for image in item.images %}
				<img class="item-preview-slide" src="img/{{ image }}">
				{% endfor %}
			</div>
		{% endif %}

		<img class="item-preview-logo" src="img/{{ item.logo }}"/>

		<nav class="item-categories">
			{% for cat in item.categories %}
				<a href="/section/{{ cat }}" title="{{ cat }}" class="item-category"><i class="icon-{{cat}}"></i></a>
			{% endfor %}
		</nav>
	</div>
	<div class="item-caption">
		<h3 class="item-header">
			<a class="item-header-link" href="{{ item.site }}" title="{{ item.title }} — {{ item.tagline }}">
				{{ item.title }}<span class="item-price">{{ item.price }}</span>
			</a>
		</h3>
		<div class="item-tagline">{{ item.tagline }}</div>
	</div>
</article>
</div>