<script lang="ts">
  import type { PageData } from "./$types";
  import Modal from "$lib/components/modal.svelte";
  import AddPage from "./add/+page.svelte";
  import EditPage from "./[id]/+page.svelte";
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
    Users
    <p class="mt-1 text-sm font-normal text-gray-500">
      Browse a list of users
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

{#if data.users.length}
  <div class="overflow-x-auto px-5">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3"> Username </th>
            <th scope="col" class="px-6 py-3"> Email </th>
            <th scope="col" class="px-6 py-3"> Role </th>
            <th scope="col" class="px-6 py-3"> Action </th>
          </tr>
        </thead>
        <tbody>
          {#each data.users as user}
            <tr class="odd:bg-white even:bg-gray-50 border-b">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
              >
                {user.username}
              </th>
              <td class="px-6 py-4"> {user.email} </td>
              <td class="px-6 py-4 capitalize"> {user.role.name} </td>
              <td class="px-6 py-4">
                <a
                  href="/users/{user.id}"
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
                      pushState(href, { selected: result.data });
                    } else {
                      // something bad happened! try navigating
                      goto(href);
                    }
                  }}
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit</a
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{:else}
  <div
    class="flex justify-center items-center py-20 flex-col w-[350px] m-auto text-center space-y-3"
  >
    <h2 class="text-4xl font-bold text-gray-400">Users not found</h2>
    <p class="text-slate-400 text-sm">
      Please add users by pressing the blue button on the top right corner
    </p>
  </div>
{/if}

<style>
  .material-symbols-outlined {
    font-variation-settings:
      "FILL" 1,
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
  }
</style>
