<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        {{ $t('general.welcome') }}
      </span>
      <div slot="body">
        <p>
          Get started with the Waellet Aepp Boilerplate
        </p>
        <p>
          For questions, contact me:
        </p>
        <p>
          <a
            class="btn btn-outline-primary"
            href="https://github.com/mradkov"
            target="_blank"
          >
            <i
              class="fa fa-github fa-fw"
              aria-hidden="true"
            />
            <span class="pl-2">
              Github
            </span>
          </a>
          <a
            class="btn btn-outline-primary"
            href="http://twitter.com/milen_radkov"
            target="_blank"
          >
            <i
              class="fa fa-twitter fa-fw"
              aria-hidden="true"
            />
            <span class="pl-2">
              Twitter
            </span>
          </a>
        </p>
        <p>
          For bugs, see:
        </p>
        <a
          class="btn btn-outline-primary"
          href="https://github.com/waellet/waellet-aepp-boilerplate/issues"
          target="_blank"
        >
          <i
            class="fa fa-github fa-fw"
            aria-hidden="true"
          />
          <span class="pl-2">
            GitHub
          </span>
        </a>
      </div>
      <div slot="footer">
        Made with love by <a href="https://hack.bg">hack.bg</a>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

import VLayout from '@/layouts/Default.vue';
import VCard from '@/components/Card.vue';

export default {
  /**
   * The name of the page.
   */
  name: 'HomeIndex',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout,
    VCard,
  },
};
</script>
