# nestjs + vite

## Description

monorepo 项目，基于 node 前后端全栈开发模式，页面基于 vite ~~提供中间件和打包服务~~

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

> 开发调试要先运行 watch 编译和监听 ts 文件，因为每个包的入口是编译之后 dist 里的文件，monorepo 项目开发需要相互引用时候依赖 ts 编译后的产物
>
> 尝试 watch 和 start:dev 一起运行，但 start:dev 依赖 ts 编译后的结果，存在 ts 没编译完但服务已经起来了的现象

## App build and run

```bash
# build
yarn run build

# run
yarn run start
```

## License

[MIT licensed](LICENSE).
