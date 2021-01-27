<template>
  <div class="flex flex-col h-max-inner justify-between">
    <Nuxt id="header-and-main" />
    <!-- The relative is need because otherwise Safari places the content above
    the footer, don't know why -->
    <footer v-if="$auth.loggedIn" class="relative">
      <nav id="bottom-nav">
        <ul>
          <li>
            <NuxtLink to="/">
              <font-awesome-icon icon="home" />
            </NuxtLink>
          </li>
          <li v-if="$isAdmin()">
            <NuxtLink to="/buddies">
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
#bottom-nav > ul > li > * {
  @apply w-full flex justify-center items-center h-full;
}
header,
footer {
  height: 50px;
  @apply bg-white;
}
#header-and-main {
  height: calc(var(--inner-height) - 50px);
}
main {
  height: calc(100% - 50px);
}
.nuxt-link-exact-active {
  @apply text-secondary;
}
html {
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
  width: 100%;
  position: fixed;
  overflow: hidden;
}
body {
  overscroll-behavior-y: none;
}
</style>
