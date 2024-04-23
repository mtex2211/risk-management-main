<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<header
  class="flex justify-between p-5 text-lg font-semibold text-left rtl:text-right text-gray-900"
>
  <div class="">
    Add user
    <p class="mt-1 text-sm font-normal text-gray-500">
      Add a new users to the system
    </p>
  </div>
</header>

<section class="container px-5 pb-5 w-[480px]">
  <form
    action=""
    method="post"
    use:enhance
    autocomplete="off"
    class="space-y-6"
  >
    <div class="space-y-3">
      <!-- {#if form?.invalid}
        <div class="bg-rose-100 text-rose-500 px-3 py-1 rounded text-sm">
          <div class="">All fields are required</div>
        </div>
      {/if}
      {#if form?.credentials}
        <div class="bg-rose-100 text-rose-500 px-3 py-1 rounded text-sm">
          <div class="">Email or Password is incorrect</div>
        </div>
      {/if} -->
      <div class="space-y-1">
        <label for="username">Usernama</label>
        <div class="relative flex items-center">
          <span class="material-symbols-outlined"> person </span>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
        </div>
      </div>
      <div class="space-y-1">
        <label for="email">Email</label>
        <div class="relative flex items-center">
          <span class="material-symbols-outlined"> mail </span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
          />
        </div>
      </div>
      <div class="space-y-1">
        <label for="role">Role</label>
        <div class="relative flex items-center">
          <select name="role" id="role">
            <option disabled>Select user role</option>
            {#each data.roles as role}
              <option selected={role.name == "admin"} value={role.name}>{role.name}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="space-y-1">
        <label for="password">Password</label>
        <div class="relative flex items-center">
          <span class="material-symbols-outlined"> lock </span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button class="bg-blue-500 text-white"> Add </button>
    </div>
  </form>
</section>

<style lang="postcss">
  label {
    @apply text-sm;
  }

  input {
    @apply bg-[#f9f9f9] pl-8 h-9 pr-3.5 rounded-md w-full;
  }
  select {
    @apply bg-[#f9f9f9] px-3.5 h-9 rounded-md w-full capitalize;
  }
  input::placeholder {
    @apply text-[#aeb0b2] text-sm;
  }
  button {
    @apply rounded-md h-8 text-sm px-6;
  }
  .material-symbols-outlined {
    @apply text-base absolute left-2.5 text-[#b4b6b8];

    font-variation-settings:
      "FILL" 1,
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
  }
</style>
