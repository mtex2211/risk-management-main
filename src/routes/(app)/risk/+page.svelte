<script lang="ts">
  import type { PageData } from "./$types";
  import Modal from "$lib/components/modal.svelte";
  import AddPage from "./add/+page.svelte";
  import EditPage from "../users/[id]/+page.svelte";
  import { goto, preloadData, pushState } from "$app/navigation";
  import { page } from "$app/stores";

  export let data: PageData;
</script>

{#if $page.state.create}
  <Modal on:close={() => history.back()}>
    <button
      on:click={() => history.back()}
      class="h-8 w-8 hover:bg-gray-100 flex items-center justify-center rounded-full absolute right-3 top-3"
    >
      <span class="material-symbols-outlined !text-lg"> close </span></button
    >
    <AddPage data={$page.state.create} />
  </Modal>
{/if}

{#if $page.state.selected}
  <Modal on:close={() => history.back()}>
    <button
      on:click={() => history.back()}
      class="h-8 w-8 hover:bg-gray-100 flex items-center justify-center rounded-full absolute right-3 top-3"
    >
      <span class="material-symbols-outlined !text-lg"> close </span></button
    >
    <EditPage data={$page.state.selected} />
  </Modal>
{/if}

<header
  class="flex justify-between p-5 text-lg font-semibold text-left rtl:text-right text-gray-900"
>
  <div class="">
    Risk management
    <p class="mt-1 text-sm font-normal text-gray-500">
      Browse a list of risks
    </p>
  </div>

  <div class="">
    <a
      class="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-md"
      href="/users/add"
      on:click={async (e) => {
        // bail if opening a new tab, or we're on too small a screen
        if (e.metaKey || innerWidth < 640) return;

        // prevent navigation
        e.preventDefault();

        const { href } = e.currentTarget;

        // run `load` functions (or rather, get the result of the `load` functions
        // that are already running because of `data-sveltekit-preload-data`)
        const result = await preloadData(href);

        if (result.type === "loaded" && result.status === 200) {
          pushState(href, { create: result.data });
        } else {
          // something bad happened! try navigating
          goto(href);
        }
      }}
    >
      Create
    </a>
  </div>
</header>

<div class="overflow-x-auto px-5">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3"> Title </th>
          <th scope="col" class="px-6 py-3"> Description </th>
          <th scope="col" class="px-6 py-3"> Severity </th>
          <th scope="col" class="px-6 py-3"> Likelihood </th>
          <th scope="col" class="px-6 py-3"> Status </th>
          <th scope="col" class="px-6 py-3"> Assigned </th>
          <th scope="col" class="px-6 py-3"> Action </th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd:bg-white even:bg-gray-50 border-b">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            
          </th>
          <td class="px-6 py-4">  </td>
          <td class="px-6 py-4">  </td>
          <td class="px-6 py-4">  </td>
          <td class="px-6 py-4">  </td>
          <td class="px-6 py-4">  </td>
          <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  .material-symbols-outlined {
    font-variation-settings:
      "FILL" 1,
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
  }
</style>
