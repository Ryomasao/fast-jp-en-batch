# 概要
FirebaeのCloudFireStoreを使っていて、バッチでデータの登録を行うためのリポジトリ。

目的にNode.jsでtypescript環境を作成することも含んでる。

## 参考にした記事
https://www.meziantou.net/which-version-of-ecmascript-should-i-use-in-the-typescript-configuration.htm

## 始める

```sh
$ node -v
v10.15.0
```

```sh
$ yarn add --dev typescript @types/node
```

```
$ yarn tsc --version
Version 3.6.3
```

```
$ yarn tsc --init
```

```json
{
  "compilerOptions": {
    // 使うJSのバージョン
    "target": "ES2019" ,
    // コンパイル後jsの形式
    "module": "commonjs",
    // sourceMapを吐く
    "sourceMap": true ,
    // コンパイル後のdir
    "outDir": "./dist",
    // 厳密な型チェック
    "strict": true ,
    // trueだとTSでCommonJSをrequireではなく、importで使えるみたい
    "esModuleInterop": true ,
    //jsonをimportする予定なので追加した
    "resolveJsonModule": true,
  },
  "include": ["src/**/*"]
}
```





