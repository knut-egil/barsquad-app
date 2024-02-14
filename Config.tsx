const config = {
  domain: "barsquad.knutegil.dev",
  endpoints: {
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
