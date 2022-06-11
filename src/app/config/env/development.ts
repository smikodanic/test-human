// $export NODE_RIND=true  (will rebuild all mongoose indexes)
let node_rind = false;
if (process.env.NODE_RIND) {
  node_rind = JSON.parse(process.env.NODE_RIND);
}

const config_env_dev = {
  url: 'http://api-dev.supermean.org',
  name: 'development',
  server: {
    virtualHost: false,
    domain: 'api-dev.supermean.org',
    port: process.env.PORT || 9988
  },
  mongodb: {
    enabled: true,
    rebuildIndexes: node_rind,
    uri: process.env.MONGODB_URI || 'mongodb://test_user:12345@5.189.161.70:27017/test-human'
  }
};

export default config_env_dev;
