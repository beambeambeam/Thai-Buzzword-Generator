<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Copy } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';

	let text = '';

	let input_disabled = text ? true : false;

	const copyText = async (text: string) => {
		await navigator.clipboard.writeText(text);
	};

	const copyInput = (event: SubmitEvent) => {
		event.preventDefault(); // Prevent the form from submitting the traditional way\
		const inputElement = event.currentTarget.querySelector(
			'input[type="text"]'
		) as HTMLInputElement;

		if (inputElement) {
			if (!text) {
				return alert('please generate a ประโยค first');
			}

			copyText(inputElement.value).then(() => {
				alert('Copied!');
			});
		}
	};
</script>

<main
	class="absolute z-10 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-opacity-75 bg-[url('$lib/assets/bg.png')] bg-[length:200px_200px]"
>
	<img src={logo} alt="logo" width="500" />
	<div class="flex h-[100px] w-1/2 flex-row items-center justify-center gap-2">
		<form class="flex h-full w-full items-center space-x-2" on:submit={copyInput}>
			<Input
				type="text"
				placeholder="ที่ว่างสำหรับคำ"
				disabled
				value={text}
				class="h-fit text-xl text-black"
			/>
			<Button variant="outline" type="submit" class="flex flex-row gap-4" disabled={input_disabled}
				><Copy /></Button
			>
		</form>
	</div>
	<Button class="h-fit text-xl">อุปโลกน์ the word!</Button>
</main>
<div class="absolute z-0 h-screen w-screen bg-[#A7122D] bg-cover"></div>
