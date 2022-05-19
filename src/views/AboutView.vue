<template>
  <div class="about">
    <h1>{{ $t("about.title") }}</h1>

    <h2>{{ $t("about.what_is_it.title") }}</h2>
    <p>{{ $t("about.what_is_it.description") }}</p>

    <h2>{{ $t("about.how_to_install.title") }}</h2>
    <p>{{ $t("about.how_to_install.description") }}</p>

    <h2>{{ $t("about.not_supported.title") }}</h2>
    <p>{{ $t("about.not_supported.description") }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
