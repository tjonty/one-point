<script>
	export let icon = 'linkIcon2';
	export let url = 'foo';
	export let title = 'some cool title';

	let className = '';
	export { className as class };
</script>

<a
	href={url}
	class="stack bg-base-300 not-prose mx-auto flex w-full max-w-md items-center justify-center rounded-lg p-2 px-4 text-center no-underline"
	target="_blank"
>
	<img src={`/images/${icon}.png`} alt={icon} class="!w-4 object-contain md:!w-8" />
	<span class="text-lg font-bold text-black">{title}</span>
	<div
		class={`tooltip group-hover:tooltip-open !h-8 !w-8 ${className}`}
		data-tip="Drag & Drop link to adjust order"
	>
		<svg
			fill="#000000"
			viewBox="0 0 45.511 45.511"
			id="Flat"
			xmlns="http://www.w3.org/2000/svg"
			class="!h-8 !w-8"
		>
			<g id="SVGRepo_bgCarrier" stroke-width="0" /><g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			/><g id="SVGRepo_iconCarrier"
				><path
					d="M13.511 10.667a2.844 2.844 0 1 1 -2.844 -2.844 2.848 2.848 0 0 1 2.844 2.844m9.244 -2.844a2.844 2.844 0 1 0 2.844 2.844 2.848 2.848 0 0 0 -2.844 -2.844m12.089 5.689a2.844 2.844 0 1 0 -2.844 -2.844 2.848 2.848 0 0 0 2.844 2.844M10.667 32a2.844 2.844 0 1 0 2.844 2.844 2.848 2.848 0 0 0 -2.844 -2.844m12.089 0a2.844 2.844 0 1 0 2.844 2.844 2.848 2.848 0 0 0 -2.844 -2.844m12.089 0a2.844 2.844 0 1 0 2.844 2.844 2.848 2.848 0 0 0 -2.844 -2.844M10.667 19.911a2.844 2.844 0 1 0 2.844 2.844 2.848 2.848 0 0 0 -2.844 -2.844m12.089 0a2.844 2.844 0 1 0 2.844 2.844 2.848 2.848 0 0 0 -2.844 -2.844m12.089 0a2.844 2.844 0 1 0 2.844 2.844 2.848 2.848 0 0 0 -2.844 -2.844"
				/></g
			></svg
		>
	</div>
</a>
