<template>
  <div class="quality-assurance main-container flex flex-col md:flex-row gap-12">
    <div class="md:w-1/2">
      <h2 class="mb-2">
        品質要求
      </h2>
      <h3>
        致力於全球化佈局策略  符合國際標準
      </h3>
      <div class="mt-6">
        <div>
          <p class="text-lg">
            本公司致力於全球化佈局策略，尤以環保是市場所趨，生產皆符合環保標準
          </p>
          <list class="mt-6 flex flex-col gap-6" type="check">
            <list-item>
              通過 ISO 9001:2015 質量體系認證
            </list-item>
            <list-item>
              全面導入無鉛製程產品，以符合歐盟RoHS之要求
            </list-item>
            <list-item>
              所有產品所含金屬皆符合無衝突規範 (DRC Conflict-Free)
            </list-item>
          </list>
        </div>
      </div>
    </div>
    <div class="md:w-1/2 flex flex-wrap relative">
      <figure class="z-10 w-[75%] rounded-md overflow-hidden">
        <img
          src="@/assets/images/quality-assurance-1.png"
          alt="Quality assurance 1"
          class="max-w-full max-h-full object-cover w-full h-full"
        >
      </figure>
      <figure class="ml-[35%] -mt-[25%] rounded-md overflow-hidden">
        <img
          src="@/assets/images/quality-assurance-2.png"
          alt="Quality assurance 2"
          class="max-w-full max-h-full object-cover w-full h-full"
        >
      </figure>
    </div>
  </div>
</template>

<script>
import List from '~/components/ui/List'
import ListItem from '~/components/ui/ListItem'
export default {
  name: 'QualityAssurance',
  components: { ListItem, List }
}
</script>

<style scoped>

</style>
