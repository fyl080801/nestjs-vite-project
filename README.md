# nestjs + vite

## Description

monorepo 项目，基于 node 前后端全栈开发模式，页面基于 vite 提供中间件和打包服务

### 数据访问

已追加数据库访问功能，配置文件 `config/default.yaml` 中的 `data_access` 节点管理数据库相关配置

数据访问层采用 `code first` 方式，根据实体类型自动同步表结构

### 低代码开发

`@nestseed/apps` 包提供低代码开发功能，每个模块定义在 config 目录下的 apps 目录里，每个模块放到一个文件夹中

配置文件 `config/default.yaml` 中 `app/apps` 里定义启用的模块

```yaml
app:
  title: 标题
  description: 描述...
  configPath: ./apps
  apps: # 启用的模块
    default: true
    sample: true
```

#### 数据库迁移

基于低代码开发功能可实现通过定义配置文件生成数据表，在每个模块目录下的 model 目录定义数据表，配置方式和 `sequelize` 一样

`config/apps/sample/model/bar.yaml` 数据表定义示例

```yaml
config:
  tableName: bar
  createdAt: false
  updatedAt: false

columns:
  id:
    type: INTEGER
    primaryKey: true
  name:
    type: STRING(50)
    allowNull: false
  remark:
    type: STRING
  num:
    type: INTEGER
```

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
