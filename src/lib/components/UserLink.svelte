<script>
	export let icon = 'linkIcon2';
	export let url = 'foo';
	export let title = 'some cool title';
</script>

<a
	href={url}
	class="stack bg-base-300 not-prose mx-auto flex w-full max-w-md items-center justify-center rounded-lg p-2 text-center no-underline"
	target="_blank"
>
	<img src={`/images/${icon}.png`} alt={icon} class="!md:w-8 !w-4 object-contain" />
	<span class="text-lg font-bold text-black">{title}</span>
</a>
