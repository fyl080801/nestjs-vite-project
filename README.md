# nestjs + vite

## Description

monorepo 项目，前后端一起开发

## Installation

```bash
yarn install
```

## Running the app development

```bash
# start watch
yarn run watch

# development
yarn run start:dev
```

> 开发调试要先运行 watch，因为每个包的入口是编译之后 dist 里的文件，monorepo 项目开发需要相互引用时候依赖编译后的产物

## App build and run

```bash
# build
yarn run build

# run
yarn run start
```

## License

[MIT licensed](LICENSE).
