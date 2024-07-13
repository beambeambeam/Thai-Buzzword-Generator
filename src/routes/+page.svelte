<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	// export let data: PageData;
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-2">
	<div>Thai Buzzword Generator</div>
	<div>พูดดีน่ะ แต่ไม่พูดจะดีกว่า</div>
	<div
		class="flex h-[5%] w-1/3 items-center justify-center rounded-lg border-2 border-dashed border-black"
	>
		test
	</div>
	<Button>อุปโลกน์ the word!</Button>
</main>
