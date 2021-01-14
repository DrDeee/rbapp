<template>
  <div class="flex flex-col h-max-inner justify-between">
    <Nuxt />
    <footer v-if="$auth.loggedIn">
      <nav id="bottom-nav">
        <ul>
          <li>
            <NuxtLink
              class="flex-grow w-full flex justify-center items-center"
              to="/"
            >
              <font-awesome-icon icon="home" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="w-full flex justify-center items-center"
              to="/buddies"
            >
              <font-awesome-icon icon="user-friends" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/profile">
              <font-awesome-icon icon="user" />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<style>
#bottom-nav {
  @apply h-full;
}
#bottom-nav > ul {
  @apply flex justify-around border-t-2 border-primary text-primary h-full;
}
#bottom-nav > ul > li {
  @apply flex flex-col justify-center items-center flex-grow;
}
#bottom-nav > ul > li > a {
  @apply w-full flex justify-center items-center;
}
header,
footer {
  height: 50px;
  @apply bg-white;
}
main {
  height: calc(var(--inner-height) - 100px);
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
