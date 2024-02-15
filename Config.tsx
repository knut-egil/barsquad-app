const config = {
  domain: "barsquad.knutegil.dev",
  endpoints: {
    /**
     * Websocket
     */
    websocket: {
      toString() {
        return "";
      },

      squad: {
        toString() {
          return `${config.endpoints.websocket}/squad`;
        },

        code(code: string) {
          return `${config.endpoints.websocket.squad}/${code}`;
        },
      },
    },

    /**
     * /api
     */
    api: {
      toString() {
        return "/api";
      },

      /**
       * /api/squad
       */
      squad: {
        toString() {
          return `${config.endpoints.api}/squad`;
        },

        /**
         * /api/squad/join
         */
        join: {
          toString() {
            return `${config.endpoints.api.squad}/join`;
          },
        },
        /**
         * /api/squad/create
         */
        create: {
          toString() {
            return `${config.endpoints.api.squad}/create`;
          },
        },

        /**
         * /api/squad/:code
         */
        code: {
          get(code: string) {
            return `${config.endpoints.api.squad}/${code}`;
          },

          location(code: string) {
            return `${config.endpoints.api.squad.code.get(code)}/location`;
          },
        },
      },
    },
  },
};

export default config;
