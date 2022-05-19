<template>
  <footer
    class="w-full mx-auto mt-auto text-gray-700 text-xs text-right flex flex-row items-center justify-center md:justify-between py-1 md:py-4"
  >
    <nav class="mx-auto">
      <ul class="flex flex-wrap justify-center md:justify-end">
        <li>
          <RouterLink to="/">{{ $t("footer.home") }}</RouterLink>
        </li>
        <li>
          <a href="https://github.com/olegshulyakov/doesitpwa">{{ $t("footer.contact-me") }}</a>
        </li>
        <li>
          <a href="https://www.apache.org/licenses/LICENSE-2.0.txt">{{ $t("footer.terms") }}</a>
        </li>
        <li>
          <a
            href="https://github.com/olegshulyakov/doesitpwa/issues/new?assignees=&labels=add-application&template=submit_new_app.md&title=%5BNEW+APP%5D"
          >
            {{ $t("footer.new-app") }}
          </a>
        </li>
      </ul>
      <nav></nav>
    </nav>
  </footer>
</template>

<style lang="postcss">
footer {
  position: absolute;
  bottom: 0;
  z-index: 9999;
}
nav a {
  @apply hover:underline py-1 mr-4;
}
</style>
