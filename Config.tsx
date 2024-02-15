const config = {
  domain: "barsquad.knutegil.dev",
  endpoints: {
    /**
     * Websocket
     */
    websocket: {
      toString() {
        return "/socket.io";
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
      },
    },
  },
};

export default config;
