import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

const YAML_CONFIG_FILENAME = '../config/default.yaml';

export default () => {
  return yaml.load(
    fs.readFileSync(path.resolve(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
