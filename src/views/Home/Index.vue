<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        {{ $t('general.welcome') }}
      </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-6">
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
            <p>
              <button
                class="btn btn-outline-purple"
                @click="aeppConnect"
              >
                Connect to application
              </button>
            </p>
          </div>
          <div class="col-md-6">
            <pre v-highlightjs>
              <code class="javascript">
    Aepp
      .request
      .connect()
      .then((result) => {
        // get the result
        // and make action
        console.log(result);
      });
              </code>
            </pre>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-6">
            <h3>
              2. Request spend
            </h3>
            <p>
              <span>
                Sign a spend transaction
              </span>
            </p>
            <p>
              <button
                class="btn btn-outline-purple"
                @click="aeppRequestSign"
              >
                Sign spendTx
              </button>
            </p>
          </div>
          <div class="col-md-6">
            <pre v-highlightjs>
              <code class="javascript">
    Aepp
      .request
      .sign({
        recipientId: 'ak_2DDLbYBhHcuAzNg5Un853NRbUr8JVjZeMc6mTUpwmiVzA4ic6X',
        amount: 0.01,
      })
      .then((result) => {
        // get the result
        // and make action
        console.log(result);
      });
              </code>
            </pre>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-6">
            <h3>
              3. Contract call (static)
            </h3>
            <p>Read from the smart contract state</p>
            <p>
              <button
                class="btn btn-outline-purple"
                @click="aeppContractCallStatic"
              >
                Contract call static
              </button>
            </p>
          </div>
          <div class="col-md-6">
            <div v-if="staticCallResult">
              <pre>
                Result: {{ staticCallResult }}
              </pre>
            </div>
            <pre v-highlightjs>
              <code class="javascript">
    Aepp
      .request
      .contractCallStatic({
        source:
        `contract MyContract =
          entrypoint set (int) => ()
          entrypoint get () => int`,
        address: 'ct_ym8eXWR2YfQZcMaXA8GFid9aarfCozGkeMcRHYVCVoBdVMzio',
        method: 'get',
          params: [],
      })
      .then((result) => {
        // get the result
        // and make action
        console.log(result);
      });
              </code>
            </pre>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-6">
            <h3>
              4. Contract call (stateful)
            </h3>
            <p>Persist data on-chain.</p>
            <p>
              <button
                class="btn btn-outline-purple"
                @click="aeppContractCall"
              >
                Contract call stateful
              </button>
            </p>
          </div>
          <div class="col-md-6">
            <div v-if="statefulCallResult">
              <pre>
                Result: {{ statefulCallResult }}
              </pre>
            </div>
            <pre v-highlightjs>
              <code class="javascript">
    Aepp
      .request
      .contractCall({
        source:
        `contract MyContract =
          entrypoint set (int) => ()
          entrypoint get () => int`,
        address: 'ct_ym8eXWR2YfQZcMaXA8GFid9aarfCozGkeMcRHYVCVoBdVMzio',
        method: 'set',
        params: [1],
      })
      .then((result) => {
        // get the result
        // and make action
        console.log(result);
      });
              </code>
            </pre>
          </div>
        </div>
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
      statefulCallResult: null,
      staticCallResult: null,
      initiated: false,
      contractSource: `@compiler >= 4
contract MyContract =
  type state = int
  entrypoint init() : state = 0
  stateful entrypoint set(n: int) = put(n)
  entrypoint get() : int = state
`,
      contractAddress: 'ct_ym8eXWR2YfQZcMaXA8GFid9aarfCozGkeMcRHYVCVoBdVMzio',
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
          this.statefulCallResult = result.decodedResult;
          console.log(result);
        });
    },
  },
};
</script>
