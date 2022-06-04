<template>
  <h1>{{ $t("view.instruction.title") }}</h1>

  <div class="xs:block sm:block md:block lg:hidden">
    <ol class="list-decimal list-inside">
      <li>{{ $t("view.instruction.mobile.steps.1") }}</li>
      <li>{{ $t("view.instruction.mobile.steps.2") }}</li>
      <li>{{ $t("view.instruction.mobile.steps.3") }}</li>
      <li>{{ $t("view.instruction.mobile.steps.4") }}</li>
    </ol>

    <img
      class="mx-auto py-2"
      srcset="/images/instructions-mobile.webp, /images/instructions-mobile.jpg"
      :alt="$t('view.instruction.title')"
    />
  </div>

  <div class="xs:hidden sm:hidden md:hidden lg:block">
    <ol class="list-decimal list-inside">
      <li>{{ $t("view.instruction.desktop.steps.1") }}</li>
      <li>{{ $t("view.instruction.desktop.steps.2") }}</li>
      <li>{{ $t("view.instruction.desktop.steps.3") }}</li>
    </ol>

    <img
      class="mx-auto py-4"
      srcset="/images/instructions-desktop.webp, /images/instructions-desktop.gif"
      :alt="$t('view.instruction.title')"
    />
  </div>

  <p>{{ $t("view.instruction.final") }}</p>
</template>
