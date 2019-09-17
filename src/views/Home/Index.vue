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
        <h3>
          1. Request connect
        </h3>
        <p>
          <span>
            Authorize application to use waellet
          </span>
        </p>
        <hr>
        <p>
          <button
            class="btn btn-outline-primary"
            @click="aeppConnect"
          >
            Connect to application
          </button>
        </p>
        <h3>
          2. Request spend
        </h3>
        <p>
          <span>
            Sign a spend transaction
          </span>
        </p>
        <hr>
        <p>
          <button
            class="btn btn-outline-primary"
            @click="aeppRequestSign"
          >
            Sign spendTx
          </button>
        </p>
        <h3>
          3. Contract call (static)
        </h3>
        <p>Read from the smart contract state</p>
        <hr>
        <p>
          <button
            class="btn btn-outline-primary"
            @click="aeppContractCallStatic"
          >
            Contract call static
          </button>
        </p>
        <h3>
          4. Contract call (stateful)
        </h3>
        <p>Persist data on-chain.</p>
        <hr>
        <p>
          <button
            class="btn btn-outline-primary"
            @click="aeppContractCall"
          >
            Contract call stateful
          </button>
        </p>
      </div>
      <div slot="footer">
        Made with love by <a href="https://github.com/mradkov">Milen Radkov</a> @ <a href="https://hack.bg">hack.bg</a>
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
  data() {
    return {
      initiated: false,
      contractSource: `contract Number =
  record state = { number: int }
  entrypoint init() : state = {number = 0}
  entrypoint get() : int = state.number
  stateful entrypoint set(new_number : int) = put(state{ number = new_number })`,
      contractAddress: 'ct_g6zMoB4qubN3SrgQXPW43K7hgYG7PHMccyW6TXgHwEXjtVSSu',
      Aepp: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.isAeppInjected();
  },
  methods: {
    isAeppInjected() {
      if (window.Aepp !== 'undefined') {
        this.Aepp = window.Aepp;
      } else {
        throw Error('Aepp object is not injected.');
      }
    },
    aeppConnect() {
      this.Aepp
        .request
        .connect()
        .then((result) => {
          console.log(result);
        });
    },
    aeppRequestSign() {
      this.Aepp
        .request
        .sign({
          recipientId: 'ak_2DDLbYBhHcuAzNg5Un853NRbUr8JVjZeMc6mTUpwmiVzA4ic6X',
          amount: 0.01,
        })
        .then((result) => {
          console.log(result);
        });
    },
    aeppContractCallStatic() {
      this.Aepp
        .request
        .contractCallStatic({
          source: this.contractSource,
          address: this.contractAddress,
          method: 'get',
          params: [],
        })
        .then((result) => {
          console.log(result);
        });
    },
    aeppContractCall() {
      this.Aepp
        .request
        .contractCall({
          source: this.contractSource,
          address: this.contractAddress,
          method: 'set',
          params: [1],
        })
        .then((result) => {
          console.log(result);
        });
    },
  },
};
</script>
