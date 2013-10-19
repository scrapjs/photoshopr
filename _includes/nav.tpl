<nav class="aside-nav">
	{% if category %}<a href="/" class="aside-nav-link logo"><strong>‹</strong></a>{% endif %}
	{% for cat in site.categories %}
	<a href="/section/{{ cat[0] }}" class="aside-nav-link{% if cat[0] == category %} active{% endif %}" title="{{ cat[0] }}"><i class="icon-{{ cat[0] }}"></i></a>
	{% endfor %}
</nav>