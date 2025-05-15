# Github-tambapay-CI

## 概要

Github のCIと組み合わせて Githubに Push されたときに自動的に新しいリソースを更新するツール

Goで記述しています。

## Go を使った理由

1. クロスプラットフォーム・クロスコンパイル: コンパイルさえすればどのサーバでも実行できる
2. シングルバイナリー: コンパイルさえすれば依存関係を気にしなくてもよい
3. そこそこの安全性: ある程度の安全性とシンプルな文法

## 全体像

1. `main` ブランチへ コードがマージやpushされます
2. Github Actions が ビルドコードを実行
3. Github Actions が Release へファイルをまとめて追加
4. Web Hook を通して `https://www.48v.me/~tamba-pay/cgi-bin/frontend-ci.cgi` へ新しいReleaseが提供されたことを通知
5. 呼び出された `frontend-ci.cgi` が自動的に新しいリソースをダウンロードし既存のファイル群と置き換えます
