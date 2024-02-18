<template>
  <li class="service-card">
    <div class="service-card-header">
      <span>{{ statusParams.text }}</span>

      <div
        v-if="versionCount"
        class="version-badge"
      >
        {{ versionCount }} {{ versionCount > 1 ? 'versions' : 'version' }}
      </div>
    </div>
    <p class="service-name">
      {{ name }}
    </p>
    <p class="service-description">
      {{ description }}
    </p>

    <div>
      <ServiceMetrics
        v-if="metrics"
        v-bind="metrics"
      />
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import ServiceMetrics from './ServiceMetrics.vue'
import { ServiceStatus, type Developer, type Metrics } from '@/types'

export default defineComponent({
  name: 'ServiceCard',
  components: {
    ServiceMetrics,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    versionCount: {
      type: Number,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
    configured: {
      type: Boolean,
      required: true,
    },
    metrics: {
      type: Object as PropType<Metrics>,
      default: null,
    },
    developers: {
      type: Array as PropType<Developer[]>,
      default: () => [],
    },
  },
  computed: {
    // Computing the service status based on the published and configured props
    serviceStatus(): ServiceStatus {
      /**
       * - If the service is not published, return ServiceStatus.Unpublished
       * - If the service is published and configured, return ServiceStatus.Published
       * - If the service is published but not configured, return ServiceStatus.InProgress
       */
      return !this.published
        ? ServiceStatus.Unpublished
        : this.configured
          ? ServiceStatus.Published
          : ServiceStatus.InProgress
    },
    statusParams() {
      const statusParamMap = {
        [ServiceStatus.Unpublished]: {
          text: 'Unpublished',
          color: '#ADB6C8',
        },
        [ServiceStatus.Published]: {
          text: 'Published to portal',
          color: '#14B59A',
        },
        [ServiceStatus.InProgress]: {
          text: 'In progress',
          color: '#FABE5F',
        },
      }
      return statusParamMap[this.serviceStatus]
    },
  },
})
</script>

<style lang="scss">
.service-card {
  width: 42rem;
  height: 24rem;
  border-radius: 0.2rem;
  background-color: #FFFFFF;
  padding: 2.5rem;
  // Sprinkle a little shadow if needed :)
  // box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  .service-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.6rem;
    margin-bottom: 1rem;

    .version-badge {
      border-radius: 10rem;
      background-color: #F2F6FE;
      color: #5888DB;
      font-weight: 600;
      padding: 0.8rem 1.6rem;
    }
  }

  .service-name {
    font-weight: 600;
    font-size: 2rem;
    line-height: 2.4rem;
    margin-bottom: 1rem;
  }

  .service-description {
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 2rem;
    color: #707888;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>
