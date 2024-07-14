<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Copy, Loader } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';
	import type { ButtonEventHandler } from 'bits-ui';
	import { fetchWords, type Row } from '$lib/sheet';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let inputValue = '';
	let words: Promise<Row[]>;
	let wordData: { nouns: string[]; verbs: string[]; adverbs: string[]; adjective: string[] };

	onMount(async () => {
		words = fetchWords();
		wordData = getWordsData(await words);
		generateBuzzwords();
	});

	const copyText = async (text: string) => {
		await navigator.clipboard.writeText(text);
	};

	const copyInput = (event: ButtonEventHandler<MouseEvent>) => {
		event.preventDefault();
		copyText(inputValue);
	};

	function randInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	function getWordsData(row: Row[]) {
		return row.reduce(
			(acc: { nouns: string[]; verbs: string[]; adverbs: string[]; adjective: string[] }, cur) => {
				if (cur.nouns) acc.nouns = [...acc.nouns, cur.nouns];
				if (cur.verbs) acc.verbs = [...acc.verbs, cur.verbs];
				if (cur.adverbs) acc.adverbs = [...acc.adverbs, cur.adverbs];
				if (cur.adjective) acc.adjective = [...acc.adjective, cur.adjective];
				return acc;
			},
			{
				nouns: [],
				verbs: [],
				adverbs: [],
				adjective: []
			}
		);
	}

	function getBuzzword(wordsData: {
		nouns: string[];
		verbs: string[];
		adverbs: string[];
		adjective: string[];
	}) {
		console.log(wordsData);
		const counts = {
			nouns: wordsData.nouns.length,
			verbs: wordsData.verbs.length,
			adverbs: wordsData.adverbs.length,
			adjective: wordsData.adjective.length
		};
		return (
			wordsData.nouns[randInt(counts.nouns)] +
			wordsData.adjective[randInt(counts.adjective)] +
			wordsData.verbs[randInt(counts.verbs)] +
			wordsData.adverbs[randInt(counts.adverbs)]
		);
	}

	function generateBuzzwords() {
		inputValue = getBuzzword(wordData);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
			generateBuzzwords();
		}
	}
</script>

<svelte:window on:keydown|preventDefault={onKeydown} />

<svelte:head>
	<title>พูดดีนะ แต่ไม่พูดดีกว่า 🗣️❌</title>
	<meta name="description" content="พูดดีนะ แต่ไม่พูดดีกว่า 🗣️❌ - Stipud Honkathack 8" />
	<meta property="og:title" content="พูดดีนะ แต่ไม่พูดดีกว่า 🗣️❌" />
	<meta property="og:description" content="พูดดีนะ แต่ไม่พูดดีกว่า 🗣️❌ - Stipud Honkathack 8" />
</svelte:head>

<main
	class="absolute z-10 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-opacity-75 bg-[url('$lib/assets/bg.png')] bg-[length:200px_200px]"
>
	<img src={logo} alt="logo" width="500" class="select-text" />
	<div class="flex h-[100px] w-full min-w-64 flex-row items-center justify-center gap-2 space-x-2">
		{#await words}
			<div out:fade class="rounded-lg border border-slate-50/30 bg-white p-5 shadow-sm">
				<Loader class="spinner inline-block size-6" />
			</div>
		{:then words}
			<div in:fade class="mx-5 flex w-full flex-row gap-1 justify-center">
				<Input
					type="text"
					placeholder="ที่ว่างสำหรับคำ"
					disabled={inputValue ? false : true}
					class="h-fit w-full max-w-2xl text-center text-2xl leading-[4rem] text-black"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					aria-autocomplete="none"
					bind:value={inputValue}
				/>
			</div>
		{/await}
	</div>
	<div class="flex flex-row gap-2">
		<Button
			variant="outline"
			size="icon"
			type="submit"
			disabled={inputValue ? false : true}
			on:click={copyInput}
			><Copy />
			<span class="sr-only">คัดลอก</span>
		</Button>
		<Button size="default" on:click={generateBuzzwords} class="h-fit text-xl"
			>อุปโลกน์ the word!</Button
		>
	</div>
</main>
<div class="absolute z-0 h-screen w-screen bg-[#A7122D] bg-cover"></div>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
