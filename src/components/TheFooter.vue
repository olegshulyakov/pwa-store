<template>
  <footer
    class="w-full max-w-container mx-auto border-t py-4 text-gray-700 text-xs text-right sm:flex sm:items-center sm:justify-center"
  >
    <nav class="mx-auto">
      <ul class="flex flex-wrap justify-center md:justify-end">
        <li>
          <a href="https://github.com/olegshulyakov/doesitpwa" target="_blank" class="hover:underline py-1 mr-4">
            {{ $t("component.footer.contact-me") }}
          </a>
        </li>
        <li>
          <a href="https://www.apache.org/licenses/LICENSE-2.0.txt" target="_blank" class="hover:underline py-1 mr-4">
            {{ $t("component.footer.terms") }}
          </a>
        </li>
        <li>
          <a
            href="https://github.com/olegshulyakov/doesitpwa/issues/new?assignees=&labels=add-application&template=submit_new_app.md&title=%5BNEW+APP%5D"
            target="_blank"
            class="hover:underline py-1 mr-4"
          >
            {{ $t("component.footer.new-app") }}
          </a>
        </li>
      </ul>
      <nav></nav>
    </nav>
  </footer>
</template>
