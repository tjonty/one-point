<script lang="ts">
	import { flip } from 'svelte/animate';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		list: any[];
		children?: import('svelte').Snippet<[any]>;
	}

	let { list, children }: Props = $props();

	const dispatch = createEventDispatcher();

	const reorder = ({ from, to }: any) => {
		const newList = [...list];
		newList[from] = [newList[to], (newList[to] = newList[from])][0];

		dispatch('sort', newList);
	};

	let isOver = $state(false);

	function getDraggedParent(node: any) {
		if (!node.dataset?.index) {
			return getDraggedParent(node.parentNode);
		} else {
			return { ...node.dataset };
		}
	}

	function onDragStart(e: DragEvent) {
		// @ts-ignore
		const dragged = getDraggedParent(e.target);
		e.dataTransfer?.setData('source', dragged?.index.toString());
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault();
		// @ts-ignore
		const id = e.target.dataset?.id;
		const dragged = getDraggedParent(e.target);
		isOver = dragged?.id ?? false;
	}

	function onDragLeave(e: DragEvent) {
		const drgged = getDraggedParent(e.target);
		isOver === drgged.id && (isOver = false);
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		isOver = false;
		const dragged = getDraggedParent(e.target);
		reorder({
			from: e.dataTransfer?.getData('source'),
			to: dragged.index
		});
	}
</script>

{#if list?.length}
	<ul class="m-4 flex w-full list-none flex-col items-center gap-2 p-0 md:gap-4">
		{#each list as link, index (link.id)}
			<li
				class="w-full max-w-md border-2 border-dashed border-transparent p-2 transition-all"
				class:over={link.id === isOver}
				data-index={index}
				data-id={link.id}
				draggable="true"
				ondragstart={onDragStart}
				ondragover={onDragOver}
				ondragleave={onDragLeave}
				ondrop={onDrop}
				animate:flip={{ duration: 300 }}
			>
				{@render children?.({ link, index })}
			</li>
		{/each}
	</ul>
{:else}
	<p class="my-12 text-center text-lg font-bold">No links</p>
{/if}
