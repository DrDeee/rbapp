<template>
  <div class="flex flex-col h-screen justify-between">
    <Nuxt />
    <footer v-if="$auth.loggedIn">
      <nav class="h-full">
        <ul
          class="flex justify-around border-t-2 border-primary text-primary h-full"
        >
          <li class="flex flex-col justify-center items-center w-6/12">
            <NuxtLink class="w-full flex justify-center items-center" to="/">
              <font-awesome-icon icon="home" />
            </NuxtLink>
          </li>
          <li class="flex flex-col justify-center items-center w-6/12">
            <NuxtLink
              class="w-full flex justify-center items-center"
              to="/profile"
            >
              <font-awesome-icon icon="user" />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<style>
header,
footer {
  height: 50px;
  @apply bg-white;
}
main {
  height: calc(100vh - 100px);
}
.nuxt-link-exact-active {
  @apply text-secondary;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
</style>
