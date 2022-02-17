## 【Android】localhostで開発しているものをAndroid端末で確認するメモ

## 端末でデバッグするときにいちいちデプロイするのめんどくさい
が解決する。

※iosは未確認。できなさそうなイメージ。

## 設定
例えばReactの開発で環境をlocalhost:9998としていたとする。
PCで起動すでにもうされていた場合で記述。

参考：https://www.suzu6.net/posts/141-android-to-pc-localhost/
ありがとう。

1. Android端末側は「開発者オプション」が動く状態にしておく
2. その開発者向けオプションで「USBデバッグ」を有効にしておく
3. PC側のchromeで「chrome://inspect/#devices」にアクセス
4. 「Port forwarding...」を開く
5. PCでの開発環境が9998なので、
Port 9998
IP Address and post をlocalhost:9998
とする
「Enable port forwarding」にはチェックをつける

Androidからアクセスするとできるようになっている

## ちなみに
端末からchromeにアクセスするとそのアクセス情報が確認できる
アクセスしているアドレスから「inspect」をクリックすると端末とリンクするWindowが出てきて、端末のログを確認することができる。
