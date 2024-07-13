<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let text = 'สวัสดีครับ ท่านสมาคมคนรักในการใช้ภาษาไทย';
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-2">
	<div class="text-[50px]">Thai Buzzword Generator</div>
	<div class="text-[25px]">พูดดีน่ะ แต่ไม่พูดจะดีกว่า</div>
	<div class="flex h-fit w-1/2 flex-row items-center justify-center gap-2">
		<form class="flex h-full w-full items-center space-x-2">
			<Input type="email" placeholder="ที่ว่างสำหรับประโยค" disabled />
			<Button variant="outline" type="submit">คักลอกประโยคนี้</Button>
		</form>
	</div>
	<Button>อุปโลกน์ the word!</Button>
</main>
