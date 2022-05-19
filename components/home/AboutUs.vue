<template>
  <div class="about-us">
    <div class="main-container grid gap-6 md:grid-cols-2 md:gap-12">
      <div class="about-us__image grid-with-gap relative grid-cols-2">
        <div
          class="absolute -top-0 left-0 -z-10 h-20 w-20 -translate-y-1/4 bg-[length:0.75rem_0.75rem] opacity-75"
          :style="{
            backgroundImage:
              'radial-gradient(var(--color-primary) 2px,transparent 0)'
          }"
        />
        <div class="flex flex-col gap-6">
          <figure class="h-full w-[calc(100%-1.5rem)] self-end">
            <img
              src="@/assets/images/about/about-us-top-left.jpeg"
              class="h-full"
            />
          </figure>
          <figure class="h-[100%-1.5rem]">
            <img
              src="@/assets/images/about/about-us-bottom-left.jpeg"
              class="h-full"
            />
          </figure>
        </div>
        <figure class="h-[calc(100%-3rem)] self-center">
          <img src="@/assets/images/about/about-us-right.jpeg" class="h-full" />
        </figure>
        <div
          class="absolute top-[calc(50%+2.5rem)] left-1/2 flex h-[9.375rem] w-[9.375rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary"
        >
          <div class="text-center text-white">
            <div class="mb-1 text-3xl font-bold">20+</div>
            <div>Year Experience</div>
          </div>
        </div>
      </div>
      <div
        class="about-us__content flex flex-col items-center justify-center text-center"
      >
        <h2 class="mb-3">關於我們</h2>
        <h4 class="mb-6">
          致力於電子零組件的銷售
          同時整合上下游並深入市場需求延伸出更多元化、客製化的經營合作模式
        </h4>
        <p>
          銷售據點涵蓋亞洲、歐洲及美洲，提供客戶「一次購足服務」，供應完整的電阻、電容、電感、變壓器、繼電器、天線、無線元件和電路保護元件等被動元件，以滿足客戶各種不同領域應用的各式需求。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  mounted() {
    this.$gsap
      .timeline({
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.about-us',
          start: 'top+=300px bottom'
        }
      })
      .from('.about-us__image', {
        opacity: 0,
        y: 30,
        duration: 0.7
      })
      .from(
        '.about-us__content',
        {
          opacity: 0,
          y: 30,
          duration: 0.7
        },
        '<+=50%'
      )
  }
}
</script>

<style scoped></style>
