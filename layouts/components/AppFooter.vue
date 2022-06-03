<template>
  <div class="footer bg-slate-800 py-8 text-sm text-white">
    <div
      class="main-container flex flex-col flex-wrap justify-between gap-8 sm:flex-row"
    >
      <div class="w-full lg:w-auto">
        <img
          src="@/assets/images/logo-white.png"
          alt="CHECKTECH"
          class="mb-6 h-16"
        />
        <p>© 2022 CHECKTECH All rights reserved.</p>
      </div>
      <div>
        <div class="footer__title">聯絡我們</div>
        <ul>
          <li class="footer-item">
            <font-awesome-icon icon="phone" />
            <a
              href="tel:+886225928285"
              target="_blank"
              rel="noopener noreferrer"
            >
              +886-2-2592-8285
            </a>
          </li>
          <li class="footer-item">
            <font-awesome-icon icon="envelope" />
            <a
              href="mailto:sales@checktech.com.tw"
              target="_blank"
              rel="noopener noreferrer"
            >
              sales@checktech.com.tw
            </a>
          </li>
          <li class="footer-item">
            <font-awesome-icon icon="envelope" />
            <a
              href="mailto:james@checktech.com.tw"
              target="_blank"
              rel="noopener noreferrer"
            >
              james@checktech.com.tw
            </a>
          </li>
          <li class="footer-item">
            <font-awesome-icon icon="location-dot" />
            <a
              href="https://g.page/Checktech?share"
              target="_blank"
              rel="noopener noreferrer"
            >
              台北市104中山區中山北路3段30號9F-2
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div class="mb-8">
          <div class="footer__title">了解更多</div>
          <ul>
            <li class="footer-item">關於大將</li>
            <li class="footer-item">產品介紹</li>
          </ul>
        </div>
        <div>
          <div class="footer__title">網站條款</div>
          <ul>
            <li class="footer-item">Cookie政策</li>
          </ul>
        </div>
      </div>
      <div>
        <div class="footer__title">語言</div>
        <ul>
          <li class="footer-item">
            <font-awesome-icon icon="globe" />
            <span>繁體中文</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped lang="scss">
.footer {
  &__title {
    @apply mb-3 text-slate-400;
  }
}

.footer-item {
  @apply mb-2 last:mb-0;
  svg {
    @apply mr-2;
  }
}
</style>
