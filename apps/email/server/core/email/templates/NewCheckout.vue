<template>
  <Html lang="en">
    <Section>
      <Heading as="h1">
        Новая заявка! #{{ id }}
      </Heading>
      <Heading as="h2">
        {{ method }}
      </Heading>
    </Section>

    <Section>
      <Text>Клиент: {{ name }}, {{ phone }}</Text>
      <Text>Время: {{ timeLocal }}</Text>
    </Section>

    <Section>
      <Text v-if="warehouseAddress">
        Адрес склада-кухни: {{ warehouseAddress }}
      </Text>
      <Text v-if="address">
        Адрес:
        <span>{{ address?.street }} {{ address?.flat }}</span>
        <span v-if="address?.doorphone">, домофон {{ address?.doorphone }}</span>
        <span v-if="address?.entrance">, подъезд {{ address?.entrance }}</span>
        <span v-if="address?.floor">, этаж {{ address?.floor }}</span>
        <span v-if="address?.addressNote">. {{ address?.addressNote }}</span>
      </Text>

      <Text>Метод оплаты: {{ paymentMethodName }}</Text>
      <Text v-if="change">
        Нужна сдача с: {{ change }}
      </Text>

      <Text>Комментарий: {{ note }}</Text>
    </Section>

    <Hr />

    <Heading as="h3">
      Заказанные товары:
    </Heading>
    <Section>
      <Row v-for="line in lines" :key="line.id">
        <Text>{{ line.name }} | {{ line.variant }} - x{{ line.quantity }} - {{ line.totalPrice }}</Text>
      </Row>
    </Section>

    <Text>Итого: {{ totalPrice }}</Text>
  </Html>
</template>

<script setup lang="ts">
import type { NewCheckoutTemplate } from './../../../../types/food'
import { Heading, Hr, Html, Row, Section, Text } from '@vue-email/components'

const { deliveryMethod, time, timeType } = defineProps<NewCheckoutTemplate>()

const method = deliveryMethod === 'WAREHOUSE' ? 'Самовывоз' : 'Доставка'
const timeLocal = timeType === 'ASAP' ? 'Как можно быстрее' : new Date(time).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
</script>
