# jenkins&gitトラブルシューティング

```
ERROR: Error fetching remote repo 'origin'
hudson.plugins.git.GitException: Failed to fetch from gitの名前
	at hudson.plugins.git.GitSCM.fetchFrom(GitSCM.java:1001)
	at hudson.plugins.git.GitSCM.retrieveChanges(GitSCM.java:1242)
	at hudson.plugins.git.GitSCM.checkout(GitSCM.java:1302)
	at hudson.scm.SCM.checkout(SCM.java:505)
	at hudson.model.AbstractProject.checkout(AbstractProject.java:1204)
	at hudson.model.AbstractBuild$AbstractBuildExecution.defaultCheckout(AbstractBuild.java:636)
	at jenkins.scm.SCMCheckoutStrategy.checkout(SCMCheckoutStrategy.java:86)
	at hudson.model.AbstractBuild$AbstractBuildExecution.run(AbstractBuild.java:508)
	at hudson.model.Run.execute(Run.java:1907)
	at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
	at hudson.model.ResourceController.execute(ResourceController.java:97)
	at hudson.model.Executor.run(Executor.java:429)

  stderr: error: cannot lock ref ~~~

  error: some local refs could not be updated; try running
 'git remote prune gitの名前' to remove any old, conflicting branches
```

## gitで対処
対象ブランチに移動して、
```
git remote prune origin
```
これで対応

リモートブランチは削除されてもローカルには追跡ブランチが残ってしまうということらしい。
git remote prune originをすると残骸を削除するということ


## jenkinsで対処
gitで消したが、jenkinsでbuildする際も上記のエラーが起きたので対応が必要だが、こちらはjenkinsの機能で解消できる。

jenkinsの「設定」から「ソース管理」へ
「追加処理」というのがあるので
「Prune stale remote-tracking branches」
を設定してビルドする

## 参考URL
* https://helen.hatenablog.com/entry/2016/04/04/142406
* https://medium.com/@eiryu/jenkins%E3%81%AEgit-fetch%E3%81%A7cannot-lock-ref%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%8C%E5%87%BA%E3%81%9F%E6%99%82%E3%81%AE%E5%AF%BE%E5%BF%9C-f112ffd755a6
