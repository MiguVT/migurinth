<template>
  <div class="main-hero">
    <div class="flex max-w-screen-lg flex-col items-center gap-4 text-center">
      <ModrinthPlusIcon class="h-8 w-max text-contrast" />
      <h1 class="m-0 text-[4rem]">Modrinth Plus is now enabled for all users!</h1>
      <p class="m-0 mb-4 text-[18px] leading-relaxed">
        Enjoy an ad-free experience, support Modrinth's development, and get an exclusive profile badge!
      </p>
      <p class="m-0 text-[2rem] font-bold text-purple">
        Thank you for being a part of our community.
      </p>
    </div>
  </div>
  <div class="perks-hero">
    <h2>What you get with Modrinth Plus!</h2>
    <div class="mt-8 grid max-w-screen-lg gap-8 lg:grid-cols-3">
      <div class="flex flex-col gap-4 rounded-xl bg-bg-raised p-4">
        <HeartIcon class="h-8 w-8 text-purple" />
        <span class="text-lg font-bold">Support Modrinth creators</span>
        <span class="leading-5 text-secondary">
          50% of your subscription goes directly to Modrinth creators.
        </span>
      </div>
      <div class="flex flex-col gap-4 rounded-xl bg-bg-raised p-4">
        <SparklesIcon class="h-8 w-8 text-purple" />
        <span class="text-lg font-bold">Remove all ads</span>
        <span class="leading-5 text-secondary">
          Never see an advertisement again on the Modrinth app or the website.
        </span>
      </div>
      <div class="flex flex-col gap-4 rounded-xl bg-bg-raised p-4">
        <StarIcon class="h-8 w-8 text-purple" />
        <span class="text-lg font-bold">Profile badge</span>
        <span class="leading-5 text-secondary">Get an exclusive badge on your user page.</span>
      </div>
    </div>
    <span class="mt-4 text-secondary">...and much more coming soon!</span>
  </div>
</template>
<script setup>
import {
  ModrinthPlusIcon,
  HeartIcon,
  SparklesIcon,
  StarIcon,
} from "@modrinth/assets";

const title = "Modrinth Plus is now enabled for all users!";
const description =
  "Enjoy an ad-free experience, support Modrinth's development, and get an exclusive profile badge!";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>
<style lang="scss" scoped>
.main-hero {
  background: linear-gradient(360deg, rgba(199, 138, 255, 0.2) 10.92%, var(--color-bg) 100%),
    var(--color-accent-contrast);
  margin-top: -5rem;
  padding: 11.25rem 1rem 8rem;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.perks-hero {
  background-color: var(--color-accent-contrast);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4rem 1rem;
}
</style>
