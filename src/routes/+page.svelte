<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Copy, Loader, QrCode } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';
	import qrcode from '$lib/assets/qrcode.png';
	import type { ButtonEventHandler } from 'bits-ui';
	import { fetchWords, type Row } from '$lib/sheet';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	import * as Dialog from '$lib/components/ui/dialog/index.js';

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

<div class="absolute z-20 flex w-screen justify-end p-3 text-white">
	<Dialog.Root>
		<Dialog.Trigger
			><Button variant="ghost" class="h-fit w-fit p-2"><QrCode class="fill-current" /></Button
			></Dialog.Trigger
		>
		<Dialog.Content class="flex w-fit flex-col items-center justify-center">
			<Dialog.Header class="w-fit text-4xl">QR Code</Dialog.Header>
			<img src={qrcode} alt="logo" width="400" class="select-text" />
		</Dialog.Content>
	</Dialog.Root>
</div>
<main class="z-10 flex w-screen flex-col items-center justify-center gap-2 bg-opacity-75">
	<img src={logo} alt="logo" width="500" class="select-text" />
	<div class="flex h-[100px] w-full min-w-64 flex-row items-center justify-center gap-2 space-x-2">
		{#await words}
			<div out:fade class="rounded-lg border border-slate-50/30 bg-white p-5 shadow-sm">
				<Loader class="spinner inline-block size-6" />
			</div>
		{:then words}
			<div in:fade class="mx-5 flex w-full flex-row justify-center gap-1">
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
			><Copy class="shrink-0 text-black" />
			<span class="sr-only">คัดลอก</span>
		</Button>
		<Button size="default" on:click={generateBuzzwords} class="h-fit text-xl"
			>อุปโลกน์ the word!</Button
		>
	</div>
	<p class="mt-5 text-center text-lg text-white">
		หรือกด <strong>Spacebar</strong> หรือ <strong>Enter</strong> เพื่อสร้างคำใหม่
	</p>
	<section>
		<p class="text-outline text-center">หรือสร้างเอง</p>
		<div class="p-2">
			{#if wordData}
				<table class="border/60 w-full rounded-lg bg-white/70 text-foreground">
					<thead>
						<tr>
							<th class="p-2">nouns</th>
							<th class="p-2">verbs</th>
							<th class="p-2">adverbs</th>
							<th class="p-2">adjective</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="text-nowrap p-3 align-top"> {@html wordData.nouns.join('<br>')} </td>
							<td class="text-nowrap p-3 align-top"> {@html wordData.verbs.join('<br>')} </td>
							<td class="text-nowrap p-3 align-top"> {@html wordData.adverbs.join('<br>')} </td>
							<td class="text-nowrap p-3 align-top"> {@html wordData.adjective.join('<br>')} </td>
						</tr>
					</tbody>
				</table>
			{:else}
				<div out:fade class="rounded-lg border border-slate-50/30 bg-white p-5 shadow-sm">
					<Loader class="spinner inline-block size-6" />
				</div>
			{/if}
		</div>
	</section>
</main>
