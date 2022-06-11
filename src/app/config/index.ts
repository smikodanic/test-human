import chalk from 'chalk';
import config_env_dev from './env/development';
import config_env_stage from './env/stage';
import config_env_prod from './env/production';


let config_env;
if (process.env.NODE_ENV === 'stage') {
  config_env = config_env_stage;
} else if (process.env.NODE_ENV === 'production') {
  config_env = config_env_prod;
} else {
  config_env = config_env_dev;
}

console.log(chalk.green(`process.env.NODE_ENV:: ${process.env.NODE_ENV}`));



const config = {
  api_name: 'Supermean API',
  api_key: '12345678',
  api_secret: 'xztR!555&aaxxsswq23__',
  env: config_env
};



export default config;
