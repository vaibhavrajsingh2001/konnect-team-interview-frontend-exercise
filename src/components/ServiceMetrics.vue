<template>
  <div class="service-metrics">
    <div
      v-for="item in metricList"
      :key="item.label"
      class="service-metric-item"
    >
      <span
        class="ellipse"
        :class="item.ellipseColor"
      />
      {{ item.value }} <span class="service-metric-item-label">{{ item.label }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { humanizeNumber } from '@/util'
import { defineComponent } from 'vue'

enum EllipseColor {
  PASS = 'service-metric-pass',
  WARN = 'service-metric-warn',
  FAIL = 'service-metric-fail',
  NEUTRAL = 'service-metric-neutral'
}

interface MetricItem {
  label: string
  value: string
  ellipseColor: EllipseColor
}

export default defineComponent({
  name: 'ServiceMetrics',
  props: {
    latency: {
      type: Number,
      required: true,
    },
    uptime: {
      type: Number,
      required: true,
    },
    requests: {
      type: Number,
      required: true,
    },
    errors: {
      type: Number,
      required: true,
    },
  },
  computed: {
    metricList(): Array<MetricItem> {
      return [
        {
          label: 'latency',
          value: `${this.latency}ms`,
          ellipseColor: this.latency > 1 ? EllipseColor.FAIL : this.latency > 0.5 ? EllipseColor.WARN : EllipseColor.PASS,
        },
        {
          label: 'uptime',
          value: `${this.decimalToPercentage(this.uptime)}%`,
          ellipseColor: this.uptime < 0.7 ? EllipseColor.FAIL : this.uptime < 0.9 ? EllipseColor.WARN : EllipseColor.PASS,
        },
        {
          label: 'errors',
          value: `${this.decimalToPercentage(this.errors)}%`,
          ellipseColor: this.errors > 0.3 ? EllipseColor.FAIL : this.errors > 0.1 ? EllipseColor.WARN : EllipseColor.PASS,
        },
        {
          label: 'requests',
          value: this.humanizeNumber(this.requests),
          // Requests count can't be evaluated with a simple pass/warn/fail
          ellipseColor: EllipseColor.NEUTRAL,
        },
      ]
    },
  },
  methods: {
    humanizeNumber,
    decimalToPercentage(candidate: number) {
      return (candidate * 100).toFixed(2)
    },
  },
})
</script>

<style lang="scss">
.service-metrics {
  color: #3C4557;
  font-size: 1.2rem;
  font-weight: 600;
}

.service-metric-item {
  align-items: center;
  display: flex;
  gap: 0.9rem;
  margin-bottom: 0.5rem;

  .ellipse {
    background-color: #4CAF50;
    border-radius: 50%;
    display: inline-block;
    height: 0.6rem;
    width: 0.6rem;
  }

  // Colors for ellipses
  .service-metric-pass {
    background-color: #42D782;
  }

  .service-metric-fail {
    background-color: #d6435b;
  }

  .service-metric-warn {
    background-color: #FABE5F;
  }

  .service-metric-neutral {
    background-color: #ADB6C8;
  }

  .service-metric-item-label {
    color: #707888;
  }
}
</style>
