<template>
  <div>
    <section class="min-h-[80vh] relative -z-10">
      <video
        src="https://www.sinbon.com/img/video/video.mp4"
        class="h-full w-full object-cover absolute inset-0"
        playsinline
        autoplay
        loop
        muted
      />
      <div class="bg-[#1e222866] absolute inset-0" />
      <div class="main-container absolute inset-0 text-white z-10 flex flex-col justify-center">
        <h1 class="mb-4 text-white">
          專業與創新
        </h1>
        <h1 class="text-white">
          我們是您最好的選擇
        </h1>
      </div>
    </section>
    <section class="main-container my-20">
      <h2 class="mb-6 text-center">
        產品分類
      </h2>
      <p class="text-center text-center">
        提供客戶「一次購足服務」，供應完整的電阻、電容、電感、變壓器、繼電器、天線、無線元件和電路保護元件等被動元件，以滿足各種不同領域應用的各式需求
      </p>
      <div class="flex justify-between mt-12">
        <div class="product-card">
          <div class="product-card__image">
            <img
              src="@/assets/images/product-1.png"
              class="w-full h-full object-cover"
              alt=""
            >
          </div>
        </div>
        <div class="product-card">
          <img
            src="@/assets/images/product-2.png"
            class="w-full h-full object-cover"
            alt=""
          >
        </div>
        <div class="product-card">
          <img
            src="@/assets/images/product-3.png"
            class="w-full h-full object-cover"
            alt=""
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.product-card {
  @apply border border-gray-100 rounded-md shadow-md w-[32%] bg-white;
}
.company-log {
  @apply relative;
  &:before {
    content: ' ';
    @apply block w-full pt-[100%];
  }
  & > img {
    @apply absolute inset-0;
  }
}

.logo-list {
  animation: scrolling 10s linear infinite;
}

@keyframes scrolling {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
