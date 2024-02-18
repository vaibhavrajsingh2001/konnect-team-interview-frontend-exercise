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

    <div class="service-metrics-and-avatars">
      <ServiceMetrics
        v-if="metrics"
        v-bind="metrics"
      />

      <k-avatar-group
        v-if="developers?.length"
        :avatar-list="developers"
      />
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import ServiceMetrics from '@/components/ServiceMetrics.vue'
import KAvatarGroup from '@/components/KAvatarGroup.vue'
import { ServiceStatus, type Developer, type Metrics } from '@/types'

export default defineComponent({
  name: 'ServiceCard',
  components: {
    ServiceMetrics,
    KAvatarGroup,
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
  background-color: #FFFFFF;
  border-radius: 0.2rem;
  // Shadows make the card look elevated, hence better looking :)
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  cursor: pointer;
  height: 24rem;
  padding: 2rem;
  width: 42rem;

  .service-card-header {
    align-items: center;
    display: flex;
    font-size: 1.2rem;
    font-weight: 400;
    height: 3.2rem;
    justify-content: space-between;
    line-height: 1.6rem;
    margin-bottom: 1rem;

    .version-badge {
      background-color: #F2F6FE;
      border-radius: 10rem;
      color: #5888DB;
      font-weight: 600;
      padding: 0.8rem 1.6rem;
    }
  }

  .service-name {
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
    margin-bottom: 1rem;
  }

  .service-description {
    -webkit-box-orient: vertical;
    color: #707888;
    display: -webkit-box;
    font-size: 1.3rem;
    font-weight: 400;
    -webkit-line-clamp: 1;
    line-height: 2rem;

    overflow: hidden;
  }

  .service-metrics-and-avatars {
    align-items: end;
    display: flex;
    justify-content: space-between;
  }
}
</style>
